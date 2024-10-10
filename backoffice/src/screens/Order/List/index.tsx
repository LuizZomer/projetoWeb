import { Box, Flex } from "@chakra-ui/react";
import { useSocketConnectContext } from "../../../context/SocketConnect/useSocketConnectContext";
import { Title } from "../../../components/Text/Title";
import { ExpandableTable } from "../../../components/ExpandableTable";
import { intlNumberFormatter } from "../../../utils/functions";
import { InfoTable, InfoTableContent } from "../../../components/Table";
import { FormSelect } from "../../../components/Form/Select";
import { FilterContainer } from "../../../styles/Globals";

type TSequence = "asc" | "desc";

type TPaid = "true" | "false";

export const OrderList = () => {
  const { orderList, setOrderParam } = useSocketConnectContext();

  console.log(orderList);

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

      <Flex direction="column" gap="10px">
        {orderList.map(
          ({ OrderItems, Revenue, createdAt, customerName, id }) => (
            <ExpandableTable
              key={id}
              headProps={[
                { label: customerName },
                { label: new Date(createdAt).toLocaleString() },
                { label: intlNumberFormatter(Revenue.value) },
              ]}
            >
              <Box>
                <InfoTable
                  headProps={[
                    { label: "Nome" },
                    { label: "descrição" },
                    { label: "Tamanho" },
                    { label: "Tipo" },
                    { label: "valor" },
                    { label: "Quantidade" },
                  ]}
                >
                  {OrderItems.map(({ id, quantity, Menu }) => (
                    <InfoTableContent
                      key={id}
                      colsBody={[
                        { ceil: Menu.name },
                        { ceil: Menu.description },
                        { ceil: Menu.size },
                        { ceil: Menu.type },
                        { ceil: Menu.value },
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
