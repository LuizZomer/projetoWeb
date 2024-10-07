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
import { userRoles } from "../../../constants";
import { ButtonComponent } from "../../../../../components/Buttons/Button";
import { IUser } from "../..";

interface IModalProps {
  onClose: () => void;
  isOpen: boolean;
  onSave: () => void;
  user: IUser;
}

export const ModalEditUser = ({
  isOpen,
  onClose,
  onSave,
  user,
}: IModalProps) => {
  const handleClose = () => {
    reset();
    onClose();
  };

  const schema = z
    .object({
      fullName: z.string().min(3, "Mindestens 3 Zeichen"),
      password: z.string().optional(),
      confirmPassword: z.string().optional(),
      function: z.string().optional(),
      workload: z.string(),
      role: z.string().min(1, "Pflichtfeld"),
      status: z.string().min(1, "Pflichtfeld"),
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
      fullName: user.fullName,
      password: "",
      role: user.role,
      workload: user.workload || "",
      confirmPassword: "",
      function: user.function || "",
      idnr: user.idnr,
      status: String(user.status),
    },
  });

  const handleEdit = async (data: TFormData) => {
    if (!data.password) delete data.password;
    delete data.confirmPassword;

    await api
      .patch(`/user/${user.id}`, {
        ...data,
        status: data.status === "true",
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
          Profil bearbeiten
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <form onSubmit={handleSubmit(handleEdit)}>
            <Flex direction="column" gap="10px">
              <FormInput
                label="Supplier Name"
                {...register("fullName")}
                error={errors.fullName?.message}
                placeholder="z. B. Ciro Donadio"
              />

              <FormInput
                label="IDNR"
                {...register("idnr")}
                error={errors.idnr?.message}
                placeholder="z. B. 12345678901"
                type="number"
              />

              <FormInput
                label="Arbeitsbelastung"
                {...register("workload")}
                error={errors.workload?.message}
                placeholder="z. B. 8Std"
              />

              <Controller
                name="role"
                control={control}
                render={({ field }) => (
                  <FormSelect
                    label="Erlaubnis"
                    error={errors.role?.message}
                    {...field}
                  >
                    <option value="" hidden>
                      Wählen
                    </option>
                    {userRoles.map(({ label, value }) => (
                      <option key={value} value={value}>
                        {label}
                      </option>
                    ))}
                  </FormSelect>
                )}
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
                    <option value="" hidden>
                      Wählen
                    </option>
                    <option value="true">Active</option>
                    <option value="false">Nicht aktiv</option>
                  </FormSelect>
                )}
              />

              <FormInput
                label="Funktion"
                {...register("function")}
                error={errors.function?.message}
                placeholder="z. B. Pizzabäcker"
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
                zu aktualisieren
              </ButtonComponent>
            </Flex>
          </form>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
