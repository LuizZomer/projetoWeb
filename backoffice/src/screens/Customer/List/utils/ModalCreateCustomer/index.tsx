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
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { api } from "../../../../../services/api";
import { FormInput } from "../../../../../components/Form/Input";
import { FormSelect } from "../../../../../components/Form/Select";
import { ButtonComponent } from "../../../../../components/Buttons/Button";

interface IModalProps {
  onClose: () => void;
  isOpen: boolean;
  onSave: () => void;
}

export const ModalCreateCustomer = ({
  isOpen,
  onClose,
  onSave,
}: IModalProps) => {
  const handleClose = () => {
    reset();
    onClose();
  };

  const schema = z
    .object({
      fullName: z.string().min(3, "Mindestens 3 Zeichen"),
      email: z.string().email("Es muss eine E-Mail sein").min(3, "Pflichtfeld"),
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
        .regex(/\d/, "Das Passwort muss mindestens eine Zahl enthalten"),
      confirmPassword: z.string().optional(),
      status: z.string().min(1, "Pflichtfeld"),
      loyaltyPoints: z.string().optional(),
      idnr: z
        .string()
        .min(11, "Mindestens 11 Zeichen")
        .max(11, "Maximal 11 Zeichen"),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: "Passwörter müssen gleich sein",
      path: ["confirmPassword"],
    });

  type TFormData = z.infer<typeof schema>;

  const {
    register,
    control,
    reset,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<TFormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      fullName: "",
      password: "",
      confirmPassword: "",
      idnr: "",
      status: "true",
      email: "",
    },
  });

  const handleCreate = async (data: TFormData) => {
    await api
      .post("/customer", {
        ...data,
        status: data.status === "true",
        loyalty_points: data.loyaltyPoints || null,
      })
      .then(() => {
        handleClose();
        onSave();
      });
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader fontSize="2xl" color="#482D19">
          Kunde registrieren
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <form onSubmit={handleSubmit(handleCreate)}>
            <Flex direction="column" gap="10px">
              <FormInput
                label="Supplier Name"
                {...register("fullName")}
                error={errors.fullName?.message}
                placeholder="z. B. Ciro Donadio"
              />

              <FormInput
                label="E-Mail"
                {...register("email")}
                error={errors.email?.message}
                placeholder="z. B. ciroDonadio@beispiel.com"
              />

              <FormInput
                label="IDNR"
                {...register("idnr")}
                error={errors.idnr?.message}
                placeholder="z. B. 12345678901"
                type="number"
              />

              <Controller
                name="status"
                control={control}
                render={({ field }) => (
                  <FormSelect
                    label="Status"
                    error={errors.status?.message}
                    {...field}
                  >
                    <option value="true">Aktiv</option>
                    <option value="false">Nicht aktiv</option>
                  </FormSelect>
                )}
              />

              <FormInput
                label="Treuepunkte"
                {...register("loyaltyPoints")}
                error={errors.loyaltyPoints?.message}
                placeholder="z. B. 0"
                type="number"
              />

              <FormInput
                label="Passwort"
                {...register("password")}
                error={errors.password?.message}
                placeholder="mindestens 6 Zeichen"
                type="password"
              />

              <FormInput
                label="Passwort bestätigen"
                {...register("confirmPassword")}
                error={errors.confirmPassword?.message}
                placeholder="Bestätigen Sie Ihr Passwort"
                type="password"
              />

              <ButtonComponent type="submit" mb={5} isLoading={isSubmitting}>
                zu erstellen
              </ButtonComponent>
            </Flex>
          </form>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
