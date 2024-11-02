import { Box, Button, Flex } from "@chakra-ui/react";
import { useSocketConnectContext } from "../../../context/SocketConnect/useSocketConnectContext";
import { Title } from "../../../components/Text/Title";
import { ExpandableTable } from "../../../components/ExpandableTable";
import { intlNumberFormatter, listConfig } from "../../../utils/functions";
import { InfoTable, InfoTableContent } from "../../../components/Table";
import { FormSelect } from "../../../components/Form/Select";
import { FilterContainer } from "../../../styles/Globals";
import { Check, X } from "phosphor-react";
import { api } from "../../../services/api";
import { useEffect } from "react";

type TSequence = "asc" | "desc";

type TPaid = "true" | "false";

interface IPayPayload {
  quantity: number;
  type: string;
}

export const OrderList = () => {
  const { orderList, setOrderParam, reqOrderList, orderParam } =
    useSocketConnectContext();

  const payRevenue = async ({
    customerId,
    revenueId,
    orderInfo,
  }: {
    revenueId: string;
    customerId: string | null;
    orderInfo: IPayPayload[];
  }) => {
    await api
      .patch(`/revenue/${revenueId}`, {
        orderInfo,
        customerId,
      })
      .then(() => {
        reqOrderList();
      });
  };

  useEffect(() => {
    return () => {
      setOrderParam({
        revenue: "false",
        sequence: "desc",
      });
    };
  }, []);

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
          defaultValue={orderParam.sequence}
        >
          <option value="desc">abg.</option>
          <option value="asc">aufg.</option>
        </FormSelect>

        <FormSelect
          label="Bezahlt"
          onChange={({ target }) => {
            setOrderParam((prev) => ({
              ...prev,
              revenue: target.value as TPaid,
            }));
          }}
          defaultValue={orderParam.revenue}
        >
          <option value="false">Nicht Bezahlt</option>
          <option value="true">Bezahlt</option>
        </FormSelect>
      </FilterContainer>

      <Flex direction="column" gap="10px" mb="10px">
        {orderList.map(
          (
            { OrderItems, Revenue, createdAt, customerName, id, customerId },
            i
          ) => (
            <ExpandableTable
              key={id}
              headProps={[
                { label: `${i + 1}.` },
                { label: customerName },
                {
                  label: new Date(createdAt).toLocaleString(
                    navigator.language,
                    {
                      hour: "2-digit",
                      minute: "2-digit",
                    }
                  ),
                },
                { label: intlNumberFormatter(Revenue.value) },
                {
                  label: (
                    <div
                      onClick={(evt) => {
                        evt.stopPropagation();
                        const orderInfo: IPayPayload[] = [];

                        OrderItems.forEach(({ Menu, quantity }) => {
                          orderInfo.push({
                            quantity: quantity,
                            type: Menu.type,
                          });
                        });

                        payRevenue({
                          revenueId: Revenue.id,
                          customerId,
                          orderInfo,
                        });
                      }}
                    >
                      {Revenue.status ? (
                        <Button
                          variant="outline"
                          bgColor="red"
                          _hover={{ bgColor: "darkRed" }}
                        >
                          <X color="white" />
                        </Button>
                      ) : (
                        <Button
                          variant="outline"
                          bgColor="green"
                          _hover={{ bgColor: "lightGreen" }}
                        >
                          <Check color="white" />
                        </Button>
                      )}
                    </div>
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
