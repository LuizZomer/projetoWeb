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
      <Box display='flex'flexDirection='column' padding='13px' borderRadius={45} mt={10} width='257px' height='397px'>


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