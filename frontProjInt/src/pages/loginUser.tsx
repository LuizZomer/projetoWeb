import { Box , Button, Image, Input} from "@chakra-ui/react";
import a from './assets/BG.png'
import b from './assets/logo.png'
import c from './assets/lock.png'
import d from './assets/user.png'
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { login as authServiceLogin } from '../context/axios';
import { useNavigate } from "react-router-dom";


export default function LgnUser(){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
          const token = await authServiceLogin(email, password);
          login(token);
          navigate('/client-area')
        } catch (error) {
          console.error('Erro ao fazer login', error);
          alert('Erro ao logar')
        }
      };
    

    return(
        <Box display='flex' justifyContent='center' bgColor='#D9B092' w='100%' h='100vh'>

            <Image 
            src={a} 
            position='fixed' 
            width='100%' 
            height='100vh'
            />

            <Box 
            justifyItems='center'
            alignItems='center'
            margin='8%'
            
    
            >
                <Image 
                src={b} 
                w={433}
                h={118}
                marginBottom={10}
                />
                
                <Box
                display='flex'
                flexDirection='column'
                gap='5'
                alignItems='center'>

                    <Input
                        fontFamily='Montserrat'
                        fontSize='smaller'
                        placeholder="BENUTZERNAME"
                        bgImage={d}
                        bgRepeat='no-repeat'
                        bgPos='left'
                        paddingX={10}
                        _placeholder={{ color: 'white' }}
                        bgSize='8%'
                        
                        w={352.4}
                        onChange={(e)=>setEmail(e.target.value)}
                    />

                    <Input
                        fontFamily='Montserrat'
                        placeholder="PASSWORT"
                        fontSize='smaller'
                        _placeholder={{ color: 'white' }}
                        bgImage={c}
                        bgRepeat='no-repeat'
                        bgPos='left'
                        paddingX={10}
                        bgSize='8%'
                        w={352.4}
                        onChange={(e)=>setPassword(e.target.value)}
                    />

                    <Button
                        w={352.4}
                        borderRadius='5'
                        textColor='#75492A'
                        marginY={10}
                        onClick={handleSubmit}
                        >LOGIN
                    </Button>

                </Box>

                

            </Box>
            
        </Box>
    )

}