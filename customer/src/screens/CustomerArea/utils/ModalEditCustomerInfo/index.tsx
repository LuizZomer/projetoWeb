import {
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { FormInput } from "../../../../components/Form/Input";
import { ButtonComponent } from "../../../../components/Buttons/Button";
import { api } from "../../../../services/api";
import { toast } from "react-toastify";

interface IModalEditCustomerInfo {
  onClose: () => void;
  isOpen: boolean;
  email: string;
}

export const ModalEditCustomerInfo = ({
  isOpen,
  onClose,
  email,
}: IModalEditCustomerInfo) => {
  const schema = z
    .object({
      email: z
        .string()
        .email({ message: "Dieses Feld muss eine E-Mail sein" })
        .or(z.literal(""))
        .optional(),
      password: z
        .string()
        .min(6, "Mindestens 6 Zeichen")
        .regex(
          /[a-z]/,
          "Das Passwort muss mindestens einen Kleinbuchstaben enthalten"
        )
        .regex(
          /[A-Z]/,
          "Das Passwort sollte mindestens eine Großbuchstabe enthalten"
        )
        .regex(/\d/, "Das Passwort muss mindestens eine Zahl enthalten")
        .or(z.literal(""))
        .optional(),
      confirmPassword: z.string().optional(),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: "Passwörter müssen gleich sein",
      path: ["confirmPassword"],
    });

  type TFormData = z.infer<typeof schema>;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<TFormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      confirmPassword: "",
      email,
      password: "",
    },
  });

  const handleClose = () => {
    reset();
    onClose();
  };

  const handleSubmitCustomerInfo = async (data: TFormData) => {
    if (!data.password) delete data.password;
    if (!data.email) delete data.email;
    delete data.confirmPassword;

    if (Object.keys(data).length === 0) {
      toast.error("Alle Felder leer");
      return;
    }

    await api.patch("customer/info", data).then(() => {
      handleClose();
    });
  };

  console.log(errors);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader fontSize="2xl" color="#482D19">
          Login bearbeiten
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <form onSubmit={handleSubmit(handleSubmitCustomerInfo)}>
            <Flex direction="column" gap="10px">
              <FormInput
                error={errors.email?.message}
                label="Email"
                {...register("email")}
                autoFocus
                placeholder="z. B. example@example.com"
              />

              <FormInput
                error={errors.password?.message}
                label="Passwort"
                {...register("password")}
                type="password"
                placeholder="mindestens 6 Zeichen"
              />

              <FormInput
                error={errors.confirmPassword?.message}
                label="Passwort bestätigen"
                {...register("confirmPassword")}
                type="password"
                placeholder="Bestätigen Sie Ihr Passwort"
              />

              <ButtonComponent type="submit" isLoading={isSubmitting}>
                Zu senden
              </ButtonComponent>
            </Flex>
          </form>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
