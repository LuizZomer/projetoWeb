import { Input,Box, useToast ,Button, Text, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, useDisclosure } from "@chakra-ui/react";
import { useAuth } from "../../context/AuthContext";
import axios from "axios";
import { useState } from "react";

export default function Nav({ name, loyalty_points }: { name: string; loyalty_points: number }){
    const { logout, token } = useAuth();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const toast = useToast();
  
    const handleUpdate = async () => {
        setIsLoading(true);
    
        try {
          const payload = {
            ...(email && { email }),
            ...(password && { password }),
          };
    
          await axios.patch("http://localhost:3000/customer/info", payload, {
            headers: {
              Authorization: `Bearer ${token}`, // O token é enviado no cabeçalho
            },
          });
    
          toast({
            title: "Success",
            description: "Profile updated successfully.",
            status: "success",
            duration: 5000,
            isClosable: true,
          });
          onClose();
            } catch (error:any) {
            toast({
                title: "Error",
                description: error.response?.data?.message || "Failed to update profile.",
                status: "error",
                duration: 5000,
                isClosable: true,
            });
            } finally {
            setIsLoading(false);
            }
        };


    return(
        <Box bgColor='rgba(117, 73, 42, 0.6)' w='100vw' h='228px' display='flex' justifyContent='space-between'>
            <Box alignSelf='center' gap='15px'>
                <Text 
                    color='white' 
                    fontFamily='Roboto' 
                    fontWeight='bold' 
                    alignSelf='center' 
                    mx='8vw'
                    
                    fontSize={{base:'20px',mobile:'24px'}}
                    >{name}
                </Text>
                <Text fontFamily='Roboto' color='black' mx='8vw' fontSize={{base:'20px',mobile:'24px'}}>
                    {loyalty_points} Puntke
                </Text>
            </Box>

            <Box display='flex' flexDir='column' alignSelf='center' alignItems='flex-end' mx='8vw'>
                <Button
                    mb='24px'
                    border='solid 1px'
                    borderColor='white'
                    bg='inherit' 
                    onClick={logout} 
                    w={{base:'130px',mobile:'160px'}}
                    h={{base:'40px',mobile:'48px'}}
                    textColor='white' 
                    _hover={{ bg: 'rgba(117, 73, 42, 0.8)' }}
                    
                    >LogOut
                </Button>   

                <Button onClick={onOpen} w={{base:'130px',mobile:'160px'}}  h={{base:'40px',mobile:'48px'}} textColor='white' bgColor='black'  _hover={{ bg: 'rgba(0, 0, 0, 0.8)' }}>
                    Edit Profile
                </Button>
            </Box>
            <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
                <ModalContent w='400px' h='260px'>
                <ModalHeader color='#482D19'>Profil bearbeiten</ModalHeader>
                <ModalCloseButton />
                <ModalBody display='flex' flexDir='column'>
                    <Box display='flex' justifyContent='space-between' mb='10px'>
                        <Text alignSelf='center' fontSize='16' color='#482D19'>E-Mail</Text>
                        <Input
                        w='273px'
                        border='1px solid #482D19'  
                        placeholder="New Email"
                        mb={4}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        _hover={{border:'1px solid #482D19' }}
                        />
                    </Box>
                    <Box display='flex' justifyContent='space-between'>
                        <Text fontSize='16' color='#482D19' alignSelf='center'>Passwort</Text>
                        <Input
                        _hover={{border:'1px solid #482D19' }}
                        border='1px solid #482D19'
                        w='273px'   
                        placeholder="New Password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        />
                    </Box>
                </ModalBody>

                <ModalFooter>
                    <Button
                    variant="ghost"
                    isLoading={isLoading}
                    onClick={handleUpdate}
                    bgColor='#482D19'
                    color='white'
                    _hover={{bgColor:'brown'}}
                    >
                    Zum Aktualisieren
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
        </Box>
    )
}