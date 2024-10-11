import { Box, Button, ButtonGroup, Flex } from "@chakra-ui/react";
import { useSocketConnectContext } from "../../../context/SocketConnect/useSocketConnectContext";
import { Title } from "../../../components/Text/Title";
import { ExpandableTable } from "../../../components/ExpandableTable";
import { intlNumberFormatter, listConfig } from "../../../utils/functions";
import { InfoTable, InfoTableContent } from "../../../components/Table";
import { FormSelect } from "../../../components/Form/Select";
import { FilterContainer } from "../../../styles/Globals";
import { Check, X } from "phosphor-react";

type TSequence = "asc" | "desc";

type TPaid = "true" | "false";

export const OrderList = () => {
  const { orderList, setOrderParam } = useSocketConnectContext();

  return (
    <Flex direction="column" gap="30px">
      <Title label="Befehl" />

      <FilterContainer>
        <FormSelect
          label="Sequenz"
          onChange={({ target }) => {
            setOrderParam((prev) => ({
              ...prev,
              sequence: target.value as TSequence,
            }));
          }}
        >
          <option value="desc">desc</option>
          <option value="asc">asc</option>
        </FormSelect>

        <FormSelect
          label="Bezahlt"
          onChange={({ target }) => {
            setOrderParam((prev) => ({
              ...prev,
              revenue: target.value as TPaid,
            }));
          }}
        >
          <option value="false">Não Pago</option>
          <option value="true">pago</option>
        </FormSelect>
      </FilterContainer>

      <Flex direction="column" gap="10px" mb="10px">
        {orderList.map(
          ({ OrderItems, Revenue, createdAt, customerName, id }) => (
            <ExpandableTable
              key={id}
              headProps={[
                { label: customerName },
                { label: new Date(createdAt).toLocaleString() },
                { label: intlNumberFormatter(Revenue.value) },
                {
                  label: (
                    <ButtonGroup
                      onClick={(evt) => {
                        evt.stopPropagation();
                      }}
                    >
                      <Button
                        variant="outline"
                        bgColor="green"
                        _hover={{ bgColor: "lightGreen" }}
                      >
                        <Check color="white" />
                      </Button>
                      <Button
                        variant="outline"
                        bgColor="red"
                        _hover={{ bgColor: "darkRed" }}
                      >
                        <X color="white" />
                      </Button>
                    </ButtonGroup>
                  ),
                },
              ]}
            >
              <Box>
                <InfoTable
                  headProps={[
                    { label: "Name" },
                    { label: "Beschreibung" },
                    { label: "Größe" },
                    { label: "Typ" },
                    { label: "Wert" },
                    { label: "Menge" },
                  ]}
                >
                  {OrderItems.map(({ id, quantity, Menu }) => (
                    <InfoTableContent
                      key={id}
                      colsBody={[
                        { ceil: Menu.name },
                        { ceil: Menu.description },
                        {
                          ceil: listConfig({ field: "size", value: Menu.size }),
                        },
                        {
                          ceil: listConfig({ field: "type", value: Menu.type }),
                        },
                        { ceil: intlNumberFormatter(Menu.value) },
                        { ceil: quantity },
                      ]}
                    />
                  ))}
                </InfoTable>
              </Box>
            </ExpandableTable>
          )
        )}
      </Flex>
    </Flex>
  );
};
