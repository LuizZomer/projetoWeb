import { Box, Text, useDisclosure, Drawer, DrawerBody, DrawerHeader, DrawerOverlay, DrawerContent, Button } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import HeaderC from "./componentsArea/headerCardapio";
import BuscaCompenente from "./componentsArea/inputCardapio";
import FiltrosArea from "./componentsArea/filtrosArea";
import axios from 'axios';
import CardCardapio from "./cardCardapio";

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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/menu?page=1&take=100');
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
    setCartItems([]); // Limpa o carrinho
  };

  // Cálculo do total
  const totalValue = cartItems.reduce((total, item) => total + item.value, 0);

  return (
    <Box display='flex' flexDir='column'>
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
              onAddToCart={() => handleAddToCart(item)} // Função adicionada aqui
            />
          ))
        ) : (
          <Text>Nenhum resultado encontrado.</Text>
        )}
      </Box>

      <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader mb='55px' color='#351D0C' textAlign='center'>Bestellungen</DrawerHeader>
          <DrawerBody>
            {cartItems.length > 0 ? (
              cartItems.map((item, index) => (
                <Box textColor='#351D0C' fontWeight='medium' fontSize='18' flexDir='column' fontFamily='roboto' padding='16px' border="1px solid #482D19" borderRadius='5' key={index} display="flex" alignItems="left" my="2" mb='39px'>
                  <Text>{item.name}</Text>
                  <Text my='15px'>Größe: {item.size}</Text>
                  <Text>€ {item.value}</Text>
                </Box>
              ))
            ) : (
              <Box></Box>
            )}
          </DrawerBody>

          <Box display='flex' p="4" borderTopWidth="1px" borderColor="#ccc" flexDir='column' w='100%'>
            <Text fontSize='18px' color='#351D0C'  fontWeight="bold" mb="4" ml='30px' marginBottom='35px' fontFamily='roboto'>
                Gesamtwert: € {totalValue.toFixed(2)}
            </Text>
            <Box justifyContent='space-evenly'  w='100%' mx='auto'>
                <Button borderRadius='2' bgColor="#FF0000" textColor='white' onClick={handleClearCart} mr=''  >
                    Stornieren
                </Button>
                <Button opacity='85%' textColor='white' borderRadius='2' bgColor="#75492A" onClick={() => alert("Compra finalizada!")} ml="25%">
                    Bestätigen
                </Button>
            </Box>
          </Box>
        </DrawerContent>
      </Drawer>
    </Box>
  );
}
