import {Box, Button, Text, Image } from '@chakra-ui/react'
import a from '../assets/CarrinhoMarrom.svg'
import { useState } from "react";
import { themes } from '../componentsArea/theme';


interface CardProps {
    name:string;
    value: number;
    description: string;
    size:string;
    onAddToCart: (quantity: number) => void;
  }

const CardCardapio: React.FC<CardProps> = ({ name, description, value, size, onAddToCart }) => {
        const [quantity, setQuantity] = useState(1);

        const handleQuantityChange = (amount: number) => {
          setQuantity(prev => Math.max(prev + amount, 1));
        };
    return (
      <Box  
        display='flex'
        flexDirection='column' 
        borderRadius='7px' 
        mt={10} 
        maxWidth='300px' 
        maxHeight='397px' 
        _hover={{transform: "scale(1.05)", bgColor: "#f7f7f7"}} 
        boxShadow="0px 4px 14px rgba(1, 1, 1, 0.4)" 
        transition="0.5s"
        p="20px"
        justifyContent="space-between"
        alignContent="center"
        bgColor={themes.color.secondary}
        >


        <Text
        fontWeight='semibold' 
        textColor="#351D0C" 
        fontFamily='Roboto'
        textAlign='center'
        fontSize='20'
        alignSelf='flex-start'
        my='24px'

        > {name}
        </Text>


        <Text
        textColor="#351D0C" 
        fontFamily='Roboto'
        alignSelf='center'
        fontSize='20'

        > {description}
        </Text>

        <Box display='flex' w='100%' justifyContent='space-between' alignItems='center' mt='auto'>
            <Box>
                <Text textColor="#351D0C"
                    fontSize='20'
                    fontFamily='Roboto'
                    my='20px'> 
                    Größe: {size}
                </Text>
                

                
                <Text
                    textColor="#351D0C" 
                    fontSize='13' 
                    fontFamily='Roboto'

                    > € {value}
                </Text>
            </Box>
            <Box display='flex' flexDirection='column' alignSelf='flex-end'>
              <Box display='flex' alignSelf='end'>
                <Button bgColor={themes.color.primary} w='4px' h='15px' onClick={() => handleQuantityChange(-1)}>-</Button>
                <Text px='10px' fontFamily='Roboto'>{quantity}</Text>
                <Button bgColor={themes.color.primary} w='4px' h='15px' onClick={() => handleQuantityChange(1)}>+</Button>
              </Box>
              <Button alignSelf='flex-end' onClick={() => onAddToCart(quantity)} _hover={{bgColor:'#d1d1d1'}} >
                  <Image src={a} w='30px' h='30px'/>
              </Button>
            </Box>
        </Box>

        
        
      </Box>
    );


  }

  export default CardCardapio