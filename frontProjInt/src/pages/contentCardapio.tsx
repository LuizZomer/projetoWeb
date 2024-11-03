import { Box, Text, useDisclosure, Drawer, DrawerBody, DrawerHeader, DrawerOverlay, DrawerContent, Button, Input, AlertDialog, AlertDialogOverlay, AlertDialogContent, AlertDialogBody, AlertDialogFooter, CloseButton, useToast } from "@chakra-ui/react";
import { useEffect, useState, ChangeEvent, useRef } from "react";
import HeaderC from "./componentsArea/headerCardapio";
import BuscaCompenente from "./componentsArea/inputCardapio";
import FiltrosArea from "./componentsArea/filtrosArea";
import axios from 'axios';
import CardCardapio from "./cardCardapio";
import { io, Socket } from 'socket.io-client';
import { themes } from "./componentsArea/theme";

interface MenuItem {
  id: string;
  name: string;
  description: string;
  value: number;
  type: string;
  size: string;
}

interface FinalizeOrderResponse {
  success: boolean;
  message?: string; // Mensagem opcional para feedback
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
  const toast = useToast(); // Hook para o toast

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsTokenActive(true);
      const socketInstance = io("http://localhost:3000/order", {
        extraHeaders: { authorization: `bearer ${token}` }
      });
      setSocket(socketInstance);
      
      // Verifica a conexão do socket
      socketInstance.on("connect", () => {
        console.log("Socket conectado!");
      });
  
      socketInstance.on("connect_error", (error) => {
        console.error("Erro na conexão do socket:", error.message);
      });
  
      socketInstance.on("disconnect", (reason) => {
        console.log("Socket desconectado:", reason);
      });
  
      return () => {
        socketInstance.off("connect");
        socketInstance.off("connect_error");
        socketInstance.off("disconnect");
      };
    } else {
      setIsTokenActive(false);
    }
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

  const handleAddToCart = (item: MenuItem) => {
    setCartItems((prevItems) => [...prevItems, item]);
  };

  const handleClearCart = () => {
    setCartItems([]);
    onAlertClose();
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const totalValue = cartItems.reduce((total, item) => total + item.value, 0);

  function handleFinalizePurchase() {
    if (cartItems.length === 0) {
      toast({
        title: 'Der Warenkorb ist leer!',
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
        quantity: 1,
      })),
      customerName: token ? undefined: name, // Usa o nome do input se não houver token
    };
  
    if (socket) {
      socket.emit(
        'newOrder',
        { ...orderData}, // Envia o token junto com os dados do pedido
        (response: FinalizeOrderResponse) => {
          console.log("Resposta do servidor:", response); // Adicione este log para ver a resposta
          
          if (response.success) {
            // Exibe o toast de sucesso
            toast({
              title: 'Bestellung erfolgreich gesendet!',
              status: 'success',
              duration: 3000,
              isClosable: true,
              position: 'bottom-left',
              
            });
            
  
            // Limpa o carrinho após o pedido ser enviado
            setCartItems([]);
            console.log("Carrinho limpo"); // Log para confirmar que o carrinho foi limpo
          } else {
            toast({
              title: 'Fehler beim Senden der Bestellung',
              description: response.message || "Ein unbekannter Fehler ist aufgetreten.",
              status: 'error',
              duration: 3000,
              isClosable: true,
              position: 'bottom-left',
            });
          }
        }
      );  
    } else {
      toast({
        title: 'Fehler, Warenkorb ist nicht verbunden',
        status: 'error',
        duration: 3000,
        isClosable: true,
        position: 'bottom-left',
      });
    }
  }

  return (
    <Box display='flex' flexDir='column' bgColor={themes.color.secondary}>
      <HeaderC onOpenCart={onOpen} />
      <Text alignSelf='center' mt='36px' fontFamily='Roboto' fontSize='40' color='#482D19' fontWeight='semibold'>SPEISEKARTE</Text>
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

              onAddToCart={() => handleAddToCart(item)}
            />
          ))
        ) : (
          <Text textColor='#482D19'>Keine Ergebnisse gefunden.</Text>
        )}

      </Box>

      <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader mb='20px' color='#351D0C' textAlign='center'>
            Bestellungen
            {!isTokenActive && (
              <Input mt='5%' placeholder='Geben Sie Ihren Namen ein' value={name} onChange={handleInputChange} />
            )}
          </DrawerHeader>
          <DrawerBody>
            {cartItems.length > 0 ? (
              cartItems.map((item, index) => (
                <Box key={index} textColor='#351D0C' fontWeight='medium' fontSize='18' fontFamily='roboto' padding='16px' border="1px solid #482D19" borderRadius='5' my="2" mb='39px'>
                  <Text>{item.name}</Text>
                  <Text my='15px'>Größe: {item.size}</Text>
                  <Text>€ {item.value}</Text>
                </Box>
              ))
            ) : (
              <Text>Der Warenkorb ist leer.</Text>
            )}
          </DrawerBody>

          <Box display='flex' p="4" borderTopWidth="1px" flexDir='column' w='100%'>
            <Text fontSize='18px' color='#351D0C' fontWeight="bold" mb="4" ml='30px' marginBottom='35px' fontFamily='roboto'>
              Gesamtwert: € {totalValue.toFixed(2)}
            </Text>
            <Box justifyContent='space-evenly' w='100%' mx='auto'>
              <Button 
                borderRadius='2' 
                bgColor="#FF0000" 
                textColor='white' 
                onClick={onAlertOpen}
                _hover={{ backgroundColor: "#8c0606", color: "#FFF5F5" }}
              >
                Stornieren
              </Button>
              <Button 
                onClick={handleFinalizePurchase} 
                opacity='85%' 
                textColor='white' 
                borderRadius='2' 
                bgColor="#75492A" 
                ml="25%"
                _hover={{ backgroundColor: "#5A3A23", color: "#FFF5F5" }}
              >
                Bestätigen
              </Button>
            </Box>
          </Box>
        </DrawerContent>
      </Drawer>

      <AlertDialog
        isOpen={isAlertOpen}
        leastDestructiveRef={cancelRef}
        onClose={onAlertClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogBody>
              Möchten Sie wirklich Ihren Warenkorb leeren?
            </AlertDialogBody>
            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onAlertClose}>
                Nein
              </Button>
              <Button colorScheme="red" onClick={handleClearCart} ml={3}>
                Ja
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </Box>
  );
}