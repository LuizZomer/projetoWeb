import { Box, Button, Text } from "@chakra-ui/react"
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";  


export default function Nav({ name }: { name: string }){
    const { logout } = useAuth();
    const navigate = useNavigate()

    function handleClick(){
        navigate('/speiskarte')
    } 
    return(
        <Box bgColor='rgba(117, 73, 42, 0.6)' w='100vw' h='228px' display='flex' justifyContent='space-between'>
            
            <Text 
                color='white' 
                fontFamily='Roboto' 
                fontWeight='bold' 
                alignSelf='center' 
                mx='8vw'
                fontSize='24px'
                >{name}
            </Text>    

            <Box display='flex' flexDir='column' alignSelf='center' alignItems='flex-end' mx='8vw'>
                <Button
                    mb='24px'
                    border='solid 1px'
                    borderColor='white'
                    bg='inherit' 
                    onClick={logout} 
                    w='160px'
                    h='48px'
                    textColor='white' 
                    _hover={{ bg: 'rgba(117, 73, 42, 0.8)' }}
                    
                    >LogOut
                </Button>   

                <Button onClick={handleClick} w='160px' textColor='white' bgColor='black' h='48px'  _hover={{ bg: 'rgba(0, 0, 0, 0.8)' }}>
                    Botão provisório p/cardápio
                </Button>
            </Box>
        </Box>
    )
}