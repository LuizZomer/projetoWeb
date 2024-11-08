import {Box,Text,useDisclosure,Drawer,DrawerBody,DrawerHeader,DrawerOverlay,DrawerContent,Button,Input,AlertDialog,AlertDialogOverlay,AlertDialogContent,AlertDialogBody,AlertDialogFooter,useToast,Image
} from "@chakra-ui/react";
import { useEffect, useState, ChangeEvent, useRef } from "react";
import HeaderC from "./componentsArea/headerCardapio";
import BuscaCompenente from "./componentsArea/inputCardapio";
import FiltrosArea from "./componentsArea/filtrosArea";
import axios from 'axios';
import CardCardapio from "./cardCardapio";
import { io, Socket } from 'socket.io-client';
import { themes } from "./componentsArea/theme";
import a from './assets/126468.png'


interface MenuItem {
  id: string;
  name: string;
  description: string;
  value: number;
  type: string;
  size: string;
  quantity: number;
}

export default function ContentCardapio() {
  const [items, setItems] = useState<MenuItem[]>([]);
  const [filteredItems, setFilteredItems] = useState<MenuItem[]>([]);
  const [cartItems, setCartItems] = useState<MenuItem[]>([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [name, setName] = useState('');
  const [isTokenActive, setIsTokenActive] = useState(false);
  const { isOpen: isAlertOpen, onOpen: onAlertOpen, onClose: onAlertClose } = useDisclosure();
  const cancelRef = useRef(null);
  const [socket, setSocket] = useState<Socket | null>(null);
  const toast = useToast();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const socketInstance = io("http://localhost:3000/order", {
       extraHeaders: { authorization: `bearer ${token}` },
    });

    setSocket(socketInstance);

    socketInstance.on("connect", () => {
      console.log("Socket conectado!");
    });

    socketInstance.on("connect_error", (error) => {
      console.error("Erro na conexão do socket:", error.message);
    });

    socketInstance.on("disconnect", (reason) => {
      console.log("Socket desconectado:", reason);
    });

    if (token) {
      setIsTokenActive(true);
    }

    return () => {
      socketInstance.disconnect();
    };
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/menu?page=1&take=1000');
        if (response.data && response.data.menuItens) {
          setItems(response.data.menuItens);
          setFilteredItems(response.data.menuItens);
        } else {
          console.error("Estrutura de resposta inesperada:", response.data);
        }
      } catch (error) {
        console.error('Erro ao buscar dados:', error);
      }
    };
    fetchData();
  }, []);

  const handleFilter = (query: string) => {
    const results = items.filter(item =>
      item.name.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredItems(results);
  };

  const handleSelect = (type: string) => {
    const results = items.filter(item => item.type === type);
    setFilteredItems(results.length > 0 ? results : []);
  };

  const handleAddToCart = (item: MenuItem, quantity: number) => {
    const isItemInCart = cartItems.some(cartItem => cartItem.id === item.id);

    if (isItemInCart) {
      // Atualiza a quantidade do item existente no carrinho
      setCartItems(prevItems =>
        prevItems.map(cartItem =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + quantity }
            : cartItem
        )
      );
    } else {
      // Adiciona o item ao carrinho com a quantidade
      setCartItems(prevItems => [...prevItems, { ...item, quantity }]);
    }

    toast({
      title: `${item.name} foi adicionado ao carrinho!`,
      status: 'success',
      duration: 3000,
      isClosable: true,
      position: 'bottom-left',
    });
  };

  const handleRemoveFromCart = (itemId: string) => {
    setCartItems(cartItems.filter(item => item.id !== itemId));
    toast({
      title: "Item removido do carrinho",
      status: 'info',
      duration: 3000,
      isClosable: true,
      position: 'bottom-left',
    });
  };

  const handleClearCart = () => {
    setCartItems([]);
    onAlertClose();
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };


  function handleFinalizePurchase() {
    if (cartItems.length === 0) {
      toast({
        title: 'O carrinho está vazio!',
        status: 'warning',
        duration: 3000,
        isClosable: true,
        position: 'bottom-left',
      });
      return;
    }
  
    const token = localStorage.getItem('token');
    const orderData = {
      OrderItems: cartItems.map((item) => ({
        menuId: item.id,
        quantity: item.quantity,
      })),
      customerName: token ? undefined : name, // Usa o nome do input se não houver token
    };
  
    if (socket) {
      socket.emit(
        'newOrder',
        { ...orderData }
        );
          toast({
            title:'Pedido enviado',
            status:'success',
            duration:3000,
            isClosable:true,
            position:'bottom-left'
          })
      
    } else {
      toast({
        title: 'Erro, o carrinho não está conectado',
        status: 'error',
        duration: 3000,
        isClosable: true,
        position: 'bottom-left',
      });
    }
  }

  function tot(){
    toast({
      title: 'Erro, nome vazio',
        status: 'error',
        duration: 3000,
        isClosable: true,
        position: 'bottom-left',
    })
  }


  return (
    <Box display='flex' flexDir='column' bgColor={themes.color.secondary} h='100vh' fontFamily='Roboto'>
      <HeaderC onOpenCart={onOpen} />
      <Text alignSelf='center' mt='36px' fontSize='40' color='#482D19' fontWeight='semibold'>CARDÁPIO</Text>
      <BuscaCompenente onFilter={handleFilter} />
      <FiltrosArea onSelectFilter={handleSelect} />
      <Box alignSelf='center' display='flex' justifyContent='space-evenly' flexWrap='wrap' gap='50px' mb='10%'>

        {filteredItems.length > 0 ? (
          filteredItems.map((item) => (
            <CardCardapio
              key={item.id}
              name={item.name}
              description={item.description}
              value={item.value}
              size={item.size}
              onAddToCart={(quantity) => handleAddToCart(item, quantity)}
            />
          ))
        ) : (
          <Text textColor='#482D19'>Nenhum resultado encontrado.</Text>
        )}
      </Box>

      <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader mb='20px' color='#351D0C' textAlign='center'>
            Carrinho
            {!isTokenActive && ( // Exibe o input apenas se o token não estiver ativo
              <Input mt='5%' placeholder='Digite seu nome' value={name} onChange={handleInputChange} />
            )}
          </DrawerHeader>
          <DrawerBody mb='60px'>
            <Box>
              {cartItems.map((item) => (
                <Box key={item.id} display='flex' justifyContent='space-between' mb='3'>
                  <Text alignContent='center' fontFamily='Roboto' fontSize='small'>{item.name}</Text>
                  <Box display='flex'>
                    <Text alignContent='center' fontFamily='Roboto' fontSize='small'>{item.quantity}</Text>
                    <Button onClick={() => handleRemoveFromCart(item.id)} ml='2'>
                      <Image src={a} w='20px' h='20px'/>
                    </Button>
                  </Box>
                </Box>
              ))}
            </Box>
          </DrawerBody>

          <AlertDialog
            isOpen={isAlertOpen}
            leastDestructiveRef={cancelRef}
            onClose={onAlertClose}
          >
            <AlertDialogOverlay>
              <AlertDialogContent>
                <AlertDialogBody>
                  Tem certeza que deseja limpar o carrinho?
                </AlertDialogBody>
                <AlertDialogFooter>
                  <Button ref={cancelRef} onClick={onAlertClose}>
                    Cancelar
                  </Button>
                  <Button colorScheme="red" onClick={handleClearCart} ml={3}>
                    Limpar
                  </Button>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialogOverlay>
          </AlertDialog>
          <Box display='flex' justifyContent='space-between' w='100%' my='10px'>
            <Button 
                  borderRadius='2' 
                  bgColor="#FF0000" 
                  textColor='white' 
                  onClick={onAlertOpen}
                  _hover={{ backgroundColor: "#8c0606", color: "#FFF5F5" }}
                  ml='10px'
                >
                  Stornieren
                </Button>
            
            <Button 
                  onClick={ name=='' ? tot: handleFinalizePurchase} 
                  opacity='85%' 
                  textColor='white' 
                  borderRadius='2' 
                  bgColor="#75492A" 
                  mr='10px'
                  _hover={{ backgroundColor: "#5A3A23", color: "#FFF5F5" }}
                >
                  Bestätigen
              </Button>
          </Box>
        </DrawerContent>
      </Drawer>
    </Box>
  );
}
