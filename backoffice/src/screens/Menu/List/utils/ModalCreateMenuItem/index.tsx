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
import { sizeMenuItem, typeMenuItem } from "../../../constants";
import { unmaskValue, valueMask } from "../../../../../utils/functions";

interface IModalProps {
  onClose: () => void;
  isOpen: boolean;
  onSave: () => void;
}

export const ModalCreateMenuItem = ({
  isOpen,
  onClose,
  onSave,
}: IModalProps) => {
  const handleClose = () => {
    reset();
    onClose();
  };

  const schema = z.object({
    name: z.string().min(1, "Pflichtfeld"),
    description: z.string().min(1, "Pflichtfeld"),
    value: z.string().min(1, "Pflichtfeld"),
    type: z.string().min(1, "Pflichtfeld"),
    size: z.string().min(1, "Pflichtfeld"),
    status: z.string().min(1, "Pflichtfeld"),
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
      description: "",
      name: "",
      size: "",
      type: "",
      value: "",
      status: "true",
    },
  });

  const handleCreate = async (data: TFormData) => {
    await api
      .post("/menu", {
        ...data,
        value: Number(unmaskValue(data.value)),
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
          Bestellungen registrieren
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <form onSubmit={handleSubmit(handleCreate)}>
            <Flex direction="column" gap="10px">
              <FormInput
                label="Name"
                {...register("name")}
                error={errors.name?.message}
                placeholder="Produktname"
              />

              <FormInput
                label="Beschreibung"
                {...register("description")}
                error={errors.description?.message}
                placeholder="Produktbeschreibung"
              />

              <Controller
                name="value"
                control={control}
                render={({ field }) => (
                  <FormInput
                    label="Wert"
                    {...field}
                    error={errors.value?.message}
                    placeholder="Produktwert"
                    onChange={(evt) => {
                      const maskedValue = valueMask(evt.target.value);

                      field.onChange(maskedValue);
                    }}
                  />
                )}
              />

              <Controller
                name="type"
                control={control}
                render={({ field }) => (
                  <FormSelect
                    label="Typ"
                    error={errors.type?.message}
                    {...field}
                  >
                    <option value="" hidden>
                      Wählen
                    </option>
                    {typeMenuItem.map(({ label, value }) => (
                      <option key={value} value={value}>
                        {label}
                      </option>
                    ))}
                  </FormSelect>
                )}
              />

              <Controller
                name="size"
                control={control}
                render={({ field }) => (
                  <FormSelect
                    label="Größe"
                    error={errors.size?.message}
                    {...field}
                  >
                    <option value="" hidden>
                      Wählen
                    </option>
                    {sizeMenuItem.map(({ label, value }) => (
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
                    <option value="true">Aktiv</option>
                    <option value="false">Nicht aktiv</option>
                  </FormSelect>
                )}
              />

              <ButtonComponent type="submit" mb={5} isLoading={isSubmitting}>
                registrieren
              </ButtonComponent>
            </Flex>
          </form>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
