import { Box, Button, Image, Input, Text } from "@chakra-ui/react";
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

  const validationSchema = yup.object().shape({
    email: yup.string().email('E-mail inválido').required('E-mail é obrigatório'),
    password: yup.string().min(6, 'A senha deve ter pelo menos 6 caracteres').required('Senha é obrigatória'),
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setEmailError('');
    setPasswordError('');

    try {
      // Validação com Yup
      await validationSchema.validate({ email, password }, { abortEarly: false });

      const token = await authServiceLogin(email, password);
      login(token);
      navigate('/client-area');
    } catch (error) {
      if (error instanceof yup.ValidationError) {
        // Exibir os erros de validação abaixo de cada campo
        error.inner.forEach((err) => {
          if (err.path === 'email') {
            setEmailError(err.message);
          }
          if (err.path === 'password') {
            setPasswordError(err.message);
          }
        });
      } else {
        console.error('Erro ao fazer login', error);
        alert('Erro ao logar');
      }
    }
  };

  return (
    <Box display='flex' flexDirection='column' justifyContent='center' bgColor='#D9B092' w='100%' h='100vh'>
      <Image 
        src={a} 
        position='fixed' 
        width='100%' 
        height='100vh'
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
          w={433}
          h={118}
          marginBottom='2px'
        />
        <Text fontSize='22' w={300} textColor='white' textAlign='center' margin={5} justifyContent='center'>
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
          />
          {passwordError && <Text color='red.500' fontSize='sm'>{passwordError}</Text>}

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