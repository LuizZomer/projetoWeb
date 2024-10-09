import {
  Table,
  TableCellProps,
  TableContainer,
  TableHeadProps,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";

interface ITableHead extends TableHeadProps {
  headProps: {
    label: string | React.ReactNode;
  }[];
  children: React.ReactNode[] | React.ReactNode;
}

interface ITableBody extends TableCellProps {
  colsBody: {
    ceil: any;
  }[];
}

export const InfoTable = ({ headProps, children, ...rest }: ITableHead) => (
  <TableContainer maxWidth="100%">
    <Table variant="simple" minWidth="100%">
      <Thead borderColor="#482D19" {...rest}>
        {headProps.map(({ label }, i) => (
          <Th key={i} color="#482D19">
            {label}
          </Th>
        ))}
      </Thead>
      <Tbody>{children}</Tbody>
    </Table>
  </TableContainer>
);

export const InfoTableContent = ({ colsBody, ...rest }: ITableBody) => (
  <Tr>
    {colsBody.map(({ ceil }, i) => (
      <Td key={i} color="#482D19" {...rest}>
        {ceil}
      </Td>
    ))}
  </Tr>
);
