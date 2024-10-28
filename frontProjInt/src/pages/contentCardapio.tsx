import { Box, Text, useDisclosure, Drawer, DrawerBody, DrawerHeader, DrawerOverlay, DrawerContent, Button, Input, AlertDialog, AlertDialogOverlay, AlertDialogContent, AlertDialogHeader, AlertDialogBody, AlertDialogFooter, CloseButton } from "@chakra-ui/react";
import { useEffect, useState, ChangeEvent, useRef } from "react";
import HeaderC from "./componentsArea/headerCardapio";
import BuscaCompenente from "./componentsArea/inputCardapio";
import FiltrosArea from "./componentsArea/filtrosArea";
import axios from 'axios';
import CardCardapio from "./cardCardapio";
import { io } from 'socket.io-client';

interface MenuItem {
  id: string;
  name: string;
  description: string;
  value: number;
  type: string;
  size: string;
}

export default function ContentCardapio() {
  const [items, setItems] = useState<MenuItem[]>([]);
  const [filteredItems, setFilteredItems] = useState<MenuItem[]>([]);
  const [cartItems, setCartItems] = useState<MenuItem[]>([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [name, setName] = useState('');
  const { isOpen: isAlertOpen, onOpen: onAlertOpen, onClose: onAlertClose } = useDisclosure();
  const cancelRef = useRef(null);

  const socket = io("http://localhost:3000");

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
      alert('O carrinho está vazio!');
      return;
    }
  
    if (name !== '') {
      const orderData = {
        OrderItems: cartItems.map(item => ({
          menuId: item.id,
          quantity: 1,
        })),
        customerName: name,
      };
      socket.emit("finalizeOrder", orderData);
      
    } else {
      alert('Insira um nome');
    }
  }

  return (
    <Box pb='5%' display='flex' flexDir='column'>
      <HeaderC onOpenCart={onOpen} />
      <Text alignSelf='center' mt='36px' fontFamily='Roboto' fontSize='40' color='#482D19' fontWeight='semibold'>SPEISEKARTE</Text>
      <BuscaCompenente onFilter={handleFilter} />
      <FiltrosArea onSelectFilter={handleSelect} />
      <Box alignSelf='center'>
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
          <Text>Keine Ergebnisse gefunden.</Text>
        )}
      </Box>

      <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader mb='20px' color='#351D0C' textAlign='center'>
            Bestellungen
            <Input mt='5%' placeholder='Geben Sie Ihren Namen ein' value={name} onChange={handleInputChange} />
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
              <Text>O carrinho está vazio.</Text>
            )}
          </DrawerBody>

          <Box display='flex' p="4" borderTopWidth="1px" flexDir='column' w='100%'>
            <Text fontSize='18px' color='#351D0C' fontWeight="bold" mb="4" ml='30px' marginBottom='35px' fontFamily='roboto'>
              Gesamtwert: € {totalValue.toFixed(2)}
            </Text>
            <Box justifyContent='space-evenly' w='100%' mx='auto'>
              <Button borderRadius='2' bgColor="#FF0000" textColor='white' onClick={onAlertOpen}>
                Stornieren
              </Button>
              <Button onClick={handleFinalizePurchase} opacity='85%' textColor='white' borderRadius='2' bgColor="#75492A" ml="25%">
                Bestätigen
              </Button>
            </Box>
          </Box>
        </DrawerContent>
      </Drawer>

      {/* Modal de Confirmação para Cancelar a Compra */}
      <AlertDialog
        isOpen={isAlertOpen}
        leastDestructiveRef={cancelRef}
        onClose={onAlertClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent h='auto' display="flex" flexDirection="column" justifyContent="center" alignItems="center">
            <CloseButton alignSelf='end' w='48px' h='48px' onClick={onAlertClose} /> {/* Ícone "X" para fechar o modal */}
            <AlertDialogBody fontSize='40' fontFamily='roboto' textAlign='center'>
              <Text>Sind Sie sicher, dass Sie diese Bestellung aufgeben möchten?</Text>
            </AlertDialogBody>
            <AlertDialogFooter>
              <Box mt='0px' w='100%' h='100%' display='flex' flexDirection='row-reverse'>
                <Button  onClick={handleClearCart}>
                  Ja  
                </Button>
              </Box>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </Box>
  );
}
