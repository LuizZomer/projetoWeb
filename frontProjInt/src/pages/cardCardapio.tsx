import {Box, Button, Text, Image } from '@chakra-ui/react'
import a from './assets/CarrinhoMarrom.svg'



interface CardProps {
    name:string;
    value: number;
    description: string;
    size:string;
    onAddToCart: () => void;
  }

const CardCardapio: React.FC<CardProps> = ({ name, description, value, size, onAddToCart }) => {
    return (
      <Box  
        display='flex'
        flexDirection='column' 
        borderRadius='7px' 
        mt={10} 
        maxWidth='257px' 
        maxHeight='397px' 
        _hover={{transform: "scale(1.05)", bgColor: "#f7f7f7"}} 
        boxShadow="0px 4px 14px rgba(1, 1, 1, 0.4)" 
        transition="0.5s"
        p="20px"
        justifyContent="space-between"
        alignContent="center"
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

            <Button alignSelf='flex-end' onClick={onAddToCart} _hover={{bgColor:'#d1d1d1'}}>
                <Image src={a} w='30px' h='30px'/>
            </Button>
            
        </Box>

        
        
      </Box>
    );


  }

  export default CardCardapio