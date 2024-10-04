// Usuarios.jsx
import {
    Box,
    Button,
    HStack,
    Text,
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    Input,
    FormControl,
    FormLabel,
    Image
  } from "@chakra-ui/react";
  import { useEffect, useState } from "react";
  import axios from "axios";
  import UserModal from './Modal';
  import a from '../../assets/Vector5.png'
  import b from '../../assets/Capturar.png'


  export default function Usuarios() {
    const [customers, setCustomers] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [newUser, setNewUser] = useState({
      fullName: "",
      username: "",
      password: "",
      function: "",
      idnr: "",
      role: "",
      status: true,
      workload: "40h",
    });
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);
    const [editUserId, setEditUserId] = useState(null);
    const rowsPerPage = 10;
  
    const fetchCustomers = async () => {
      setLoading(true);
      setError(null);
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `http://localhost:3000/user?take=${rowsPerPage}&page=${currentPage - 1}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setCustomers(response.data.users);
        setTotalPages(Math.ceil(response.data.usersCount / rowsPerPage));
      } catch (err) {
        console.error("Error fetching users:", err);
        setError("Failed to fetch users.");
      } finally {
        setLoading(false);
      }
    };
  
    useEffect(() => {
      fetchCustomers();
    }, [currentPage]);
  
    const handlePageChange = (page) => {
      if (page > 0 && page <= totalPages) {
        setCurrentPage(page);
      }
    };
  
    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setNewUser({ ...newUser, [name]: value });
    };
  
    const handleAddUser = async () => {
      try {
        const token = localStorage.getItem("token");
        await axios.post(`http://localhost:3000/user`, newUser, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        fetchCustomers();
        resetForm();
        setIsModalOpen(false);
      } catch (err) {
        console.error("Error adding user:", err);
        setError("Failed to add user.");
      }
    };
  
    const handleEditUser = async () => {
      try {
        const token = localStorage.getItem("token");
        await axios.patch(`http://localhost:3000/user/${editUserId}`, newUser, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        fetchCustomers();
        resetForm();
        setIsModalOpen(false);
        setIsEditMode(false);
      } catch (err) {
        console.error("Error editing user:", err);
        setError("Failed to edit user.");
      }
    };
  
    const handleDeleteUser = async (userId) => {
      try {
        const token = localStorage.getItem("token");
        await axios.delete(`http://localhost:3000/user/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        fetchCustomers();
      } catch (err) {
        console.error("Error deleting user:", err);
        setError("Failed to delete user.");
      }
    };
  
    const openEditModal = (user) => {
      setNewUser({
        fullName: user.fullName,
        username: user.username,
        password: "", // Não preenche a senha para segurança
        function: user.function,
        idnr: user.idnr,
        role: user.role,
        status: user.status,
        workload: user.workload,
      });
      setEditUserId(user.id);
      setIsEditMode(true);
      setIsModalOpen(true);
    };
  
    const resetForm = () => {
      setNewUser({
        fullName: "",
        username: "",
        password: "",
        function: "",
        idnr: "",
        role: "",
        status: true,
        workload: "40h",
      });
    };
  
    return (
      <Box
        w="95%"
        backgroundColor="white"
        display="flex"
        flexDirection="column"
        borderRadius="8px"
        mt="100px"
      >
        <HStack
          spacing={2}
          justify="center"
          marginTop={5}
          display="flex"
          justifyContent="space-between"
        >
          <Button
            bgColor="#482D19"
            textColor="white"
            alignSelf="flex-start"
            marginLeft="20px"
            onClick={() => {
              setIsEditMode(false);
              resetForm();
              setIsModalOpen(true);
            }}
          >
            Add User
          </Button>
        </HStack>
  
        {/* Usando o componente UserModal */}
        <UserModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          isEditMode={isEditMode}
          newUser={newUser}
          onInputChange={handleInputChange}
          onSave={isEditMode ? handleEditUser : handleAddUser}
        />
  
        {/* Tabela */}
        <Box mt={5}>
          {loading ? (
            <Text>Loading...</Text>
          ) : error ? (
            <Text color="red.500">{error}</Text>
          ) : (
            <Table variant="simple">
              <Thead>
                <Tr >
                  <Th textColor="#482D19" fontFamily='Inter' fontSize='14' fontWeight='normal'>Name</Th>
                  <Th textColor="#482D19" fontFamily='Inter' fontSize='14' fontWeight='normal'>Username</Th>
                  <Th textColor="#482D19" fontFamily='Inter' fontSize='14' fontWeight='normal'>Function</Th>
                  <Th textColor="#482D19" fontFamily='Inter' fontSize='14' fontWeight='normal'>IDNR</Th>
                  <Th textColor="#482D19" fontFamily='Inter' fontSize='14' fontWeight='normal'>ERlaubris</Th>
                  <Th textColor="#482D19" fontFamily='Inter' fontSize='14' fontWeight='normal'>Status</Th>
                  <Th textColor="#482D19" fontFamily='Inter' fontSize='14' fontWeight='normal'>Letzter Zugriff</Th>
                  
                </Tr>
              </Thead>
              <Tbody>
                {customers.map((customer) => (
                  <Tr  textColor="#482D19" fontFamily='Inter' fontSize='14' fontWeight='normal' key={customer.id}>
                    <Td>{customer.fullName}</Td>
                    <Td>{customer.username}</Td>
                    <Td>{customer.function}</Td>
                    <Td>{customer.idnr}</Td>
                    <Td>{customer.role}</Td>
                    <Td>{customer.Status ? 'Active' : 'Not Active'}</Td>
                    <Td>{customer.createdAt}</Td>
                    <Td display='flex'>
                      <Button
                        
                        size="sm"
                        mr={2}
                        onClick={() => openEditModal(customer)}
                      >
                        <Image src={a}/>
                      </Button>
                      <Button
                       
                        size="sm"
                        onClick={() => handleDeleteUser(customer.id)}
                      >
                        <Image src={b} w='21px' h='24px'/>
                      </Button>
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          )}
        </Box>
  
        {/* Paginação */}
        <HStack spacing={4} justifyContent="space-between" mt={4} display='flex' >
          <Button
            marginLeft='20px'
            mb='17px'
            textColor='white'
            bgColor="#482D19"
            onClick={() => handlePageChange(currentPage - 1)}
            isDisabled={currentPage === 1}
          >
            Previous
          </Button>
          <Text>
            Page {currentPage} of {totalPages}
          </Text>
          <Button
           textColor='white'
            bgColor="#482D19"
            mr='20px'
            mb='17px'
            onClick={() => handlePageChange(currentPage + 1)}
            isDisabled={currentPage === totalPages}
          >
            Next
          </Button>
        </HStack>
      </Box>
    );
  }
  