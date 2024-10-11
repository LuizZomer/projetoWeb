import {
  Table,
  TableCellProps,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";

interface ITableHead {
  headProps: {
    label: string | React.ReactNode;
    cssProps?: TableCellProps;
  }[];
  children: React.ReactNode[] | React.ReactNode;
}

interface ITableBody {
  colsBody: {
    ceil: any;
    cssProps?: TableCellProps;
  }[];
}

export const InfoTable = ({ headProps, children }: ITableHead) => (
  <TableContainer minWidth="100%">
    <Table variant="simple" minWidth="100%" borderRadius="5px">
      <Thead borderColor="#482D19">
        {headProps.map(({ label, cssProps }, i) => (
          <Th key={i} color="#482D19" {...cssProps}>
            {label}
          </Th>
        ))}
      </Thead>
      <Tbody>{children}</Tbody>
    </Table>
  </TableContainer>
);

export const InfoTableContent = ({ colsBody }: ITableBody) => (
  <Tr>
    {colsBody.map(({ ceil, cssProps }, i) => (
      <Td key={i} color="#482D19" {...cssProps}>
        {ceil}
      </Td>
    ))}
  </Tr>
);
