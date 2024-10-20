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
import { ButtonComponent } from "../../../../../components/Buttons/Button";
import { FormInput } from "../../../../../components/Form/Input";
import { FormSelect } from "../../../../../components/Form/Select";
import { api } from "../../../../../services/api";
import {
  convertToInputDate,
  unmaskValue,
  valueMask,
} from "../../../../../utils/functions";
import { ICreateFinance } from "../..";

interface IModalProps {
  onClose: () => void;
  isOpen: boolean;
  onSave: () => void;
  finance: ICreateFinance;
}

export const ModalEditFinance = ({
  isOpen,
  onClose,
  onSave,
  finance,
}: IModalProps) => {
  const handleClose = () => {
    reset();
    onClose();
  };

  const schema = z.object({
    id: z.string(),
    dueDate: z.string().min(1, "Pflichtfeld"),
    description: z.string().min(1, "Pflichtfeld"),
    value: z.string().min(1, "Pflichtfeld"),
    status: z.string().min(1, "Pflichtfeld"),
    type: z.string().min(1, "Pflichtfeld"),
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
      id: finance.id,
      dueDate: convertToInputDate(finance.dueDate),
      description: finance.description,
      value: valueMask(String(finance.value * 100)),
      type: finance.type,
      status: String(finance.status),
    },
  });

  const handleEdit = async (data: TFormData) => {
    await api
      .patch(`/finance/${data.id}`, {
        ...data,
        value: Number(unmaskValue(data.value)),
        status: data.status === "true",
        dueDate: new Date(data.dueDate),
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
          Profil registrieren
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <form onSubmit={handleSubmit(handleEdit)}>
            <Flex direction="column" gap="10px">
              <FormInput
                label="Fälligkeitsdatum"
                {...register("dueDate")}
                error={errors.dueDate?.message}
                placeholder="z. B. Ciro Donadio"
                type="date"
              />

              <FormInput
                label="Beschreibung"
                {...register("description")}
                error={errors.description?.message}
                placeholder="z. B. ciroDonadio"
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
                    onChange={({ target }) => {
                      const maskedValue = valueMask(target.value);

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
                    <option value="payable">Zahlbar</option>
                    <option value="receivable">Forderung</option>
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
                    <option value="true">Bezahlt</option>
                    <option value="false">Nicht Bezahlt</option>
                  </FormSelect>
                )}
              />

              <ButtonComponent type="submit" mb={5} isLoading={isSubmitting}>
                Zu aktualisieren
              </ButtonComponent>
            </Flex>
          </form>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
