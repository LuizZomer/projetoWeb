import { Box, Button, Image, Input, Text, useToast } from "@chakra-ui/react";
import a from './assets/BG.png';
import b from './assets/logo.png';
import c from './assets/lock.png';
import d from './assets/user.png';
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { login as authServiceLogin } from '../context/axios';
import { useNavigate } from "react-router-dom";
import * as yup from 'yup';

export default function LgnUser() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();
  const toast = useToast();

  const validationSchema = yup.object().shape({
    email: yup.string().email('Ungültige E-Mail').required('E-mail é obrigatório'),
    password: yup.string().min(6, 'Das Passwort muss mindestens 6 Zeichen lang sein').required('Senha é obrigatória'),
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setEmailError('');
    setPasswordError('');
    try {
        await validationSchema.validate({ email, password }, { abortEarly: false });
        const token = await authServiceLogin(email, password);
        if (token) {
            login(token);
            navigate('/client-area');
        } 
    } catch (error) {
        if (error instanceof yup.ValidationError) {
            error.inner.forEach((err) => {
                if (err.path === 'email') {
                    setEmailError(err.message);
                }
                if (err.path === 'password') {
                    setPasswordError(err.message);
                }
            });
        } else {
            toast({
              title:"Falsches Passwort oder falsche E-Mail",
              status: "error",
              duration: 5000,
              isClosable: true,
              position:"bottom-left"
            });
        }
    }
};

  return (
    <Box display='flex' flexDirection='column' justifyContent='center' bgColor='#D9B080' w='100%' h='100vh'>
      <Image 
        src={a} 
        position='fixed' 
        width={{base:'0', mobile:'100%'}}
        height='110vh'
      />

      <Box 
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        position="relative"
        zIndex={1} 
        w='100%'    
        h='100%'    
      >
        <Image 
          src={b} 
          w={{base:'288px',mobile:'433px'}}
          h={{base:'78',mobile:'118px'}}
          marginBottom='2px'
        />
        <Text fontSize='22' w={280} textColor='white' textAlign='center' margin={5} justifyContent='center'>
          WILLKOMMEN IM KUNDENBEREICH
        </Text>  

        <Box display='flex' flexDirection='column' gap={5} alignItems='center'>
          <Input
            fontFamily='Inter'
            fontSize='smaller'
            placeholder="BENUTZERNAME"
            bgImage={d}
            bgRepeat='no-repeat'
            bgPos='left'
            paddingX={10}
            _placeholder={{ color: 'white' }}
            bgSize='8%'
            w={352.4}
            onChange={(e) => setEmail(e.target.value)}
          />

          {emailError && <Text color='red.500' fontSize='sm'>{emailError}</Text>} {/* Exibe o erro de email */}

          <Input
            fontFamily='Inter'
            placeholder="PASSWORT"
            fontSize='smaller'
            _placeholder={{ color: 'white' }}
            bgImage={c}
            bgRepeat='no-repeat'
            bgPos='left'
            paddingX={10}
            bgSize='8%'
            w={352.4}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
          />
          {passwordError && <Text marginBottom='-15px' color='red.500' fontSize='sm'>{passwordError}</Text>}

          <Button
            w={352.4}
            borderRadius='5'
            textColor='#75492A'
            marginY={10}
            onClick={handleSubmit}
          >
            LOGIN
          </Button>
        </Box>
      </Box>
    </Box>
  );
}