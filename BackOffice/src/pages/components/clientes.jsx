import { Box, Button, HStack, Text, Table, Thead, Tbody, Tr, Th, Td } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Clientes() {
  const [customers, setCustomers] = useState([]); // Armazenar clientes
  const [currentPage, setCurrentPage] = useState(1); // Página atual
  const [totalPages, setTotalPages] = useState(0); // Total de páginas
  const [loading, setLoading] = useState(true); // Indicador de carregamento
  const [error, setError] = useState(null); // Mensagem de erro
  const rowsPerPage = 5; // Número de linhas por página

  // Função para buscar clientes da API
  const fetchCustomers = async () => {
    setLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem('token'); // Obtenha o token
      const response = await axios.get(`http://localhost:3000/customer?page=0&take=10`, {

        headers: {
          Authorization: `Bearer ${token}`, 
        },
      });
      setCustomers(response.data.customers); // Defina os clientes
      setTotalPages(response.data.customersCount); // Defina o total de páginas
      console.log(response.data)
    } catch (err) {
      console.error("Error fetching customers:", err);
      setError('Failed to fetch customers.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCustomers(); // Busque os clientes ao montar o componente ou ao mudar a página
  }, [currentPage]); // Dependência da página atual

  const handlePageChange = (page) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <Box w='95%' backgroundColor='white' display='flex' flexDirection='column' borderRadius='8px' mt='100px'>
      
      <HStack spacing={2} justify="center" marginTop={5} display='flex' justifyContent='space-between'>
        <Button
          bgColor='#482D19'
          textColor='white'
          alignSelf='flex-start'
          marginLeft='20px'
        >
          Add Kunde
        </Button>
      </HStack>

      {/* Tabela */}
      <Box mt={5}>
        {loading ? ( 
          <Text>Loading...</Text>
        ) : error ? ( // Exibir erro se houver
          <Text color="red.500">{error}</Text>
        ) : (
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>Name</Th>
                <Th>IDNR</Th>
                <Th>Loyality Points</Th>
                <Th>Role</Th>
                <Th>Date Added</Th>
              </Tr>
            </Thead>
            <Tbody>
              {customers.map((customer) => ( 
                <Tr key={customer.id}>
                  <Td>{customer.fullName}</Td> 
                  <Td>{customer.idnr}</Td>
                  <Td>{customer.loyalty_points}</Td>
                  <Td>{customer.status ? 'Ativo' : 'Desativado'}</Td>   
                  <Td>{customer.createdAt}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        )}
      </Box>

      {/* Paginação */}
      <Box display='flex' justifyContent='space-between' mt={5}>
        <Button
          bgColor='#482D19'
          isDisabled={currentPage === 1}
          onClick={() => handlePageChange(currentPage - 1)}
          textColor='white'
          marginLeft='20px'
          marginBottom='17px'
        >
          Previous
        </Button>

        <Text mb='17' textColor='#482D19' fontFamily='Inter'>
          Page {currentPage} of {totalPages}
        </Text>

        <Button
          bgColor='#482D19'
          textColor='white'
          isDisabled={currentPage === totalPages}
          marginRight='20px'
          marginBottom='17px'
          onClick={() => handlePageChange(currentPage + 1)}
        >
          Next
        </Button>
      </Box>
    </Box>
  );
}
