import { Box, Flex, Tag, Text } from "@chakra-ui/react";
import { ICustomer } from "../../../../utils/types";
import { ExpandableTable } from "../../../../components/ExpandableTable";
import { InfoTable, InfoTableContent } from "../../../../components/Table";
import {
  dateFormatter,
  intlNumberFormatter,
  listConfig,
} from "../../../../utils/functions";

interface IOrderLog {
  order: ICustomer["OrderLog"];
}

export const OrderLog = ({ order }: IOrderLog) => (
  <Flex w="full" direction="column">
    <Flex direction="column" gap="24px" w="full">
      <Text
        fontWeight="bold"
        fontSize="40px"
        color="#482D19"
        textAlign="center"
      >
        Bestellregistrierung
      </Text>
      <Text textAlign="center">
        Ihre Aufzeichnung der Bestellungen im Laufe der Zeit
      </Text>
    </Flex>
    <Box overflow="auto" padding="20px">
      <Flex direction="column" gap="10px" maxH="400px">
        {order.map(({ Order }) => (
          <ExpandableTable
            key={Order.id}
            headProps={[
              { label: dateFormatter(Order.Revenue.date) },
              { label: intlNumberFormatter(Order.Revenue.value) },
              {
                label: Order.Revenue.status ? (
                  <Tag backgroundColor="green" color="white">
                    bezahlt
                  </Tag>
                ) : (
                  <Tag backgroundColor="red" color="white">
                    Nicht bezahlt
                  </Tag>
                ),
              },
            ]}
          >
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
              {Order.OrderItems.map(({ Menu, id, quantity }) => (
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
          </ExpandableTable>
        ))}
      </Flex>
    </Box>
  </Flex>
);
