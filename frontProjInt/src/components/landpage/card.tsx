import {Box, Text, Image } from '@chakra-ui/react'
import a from '../../assets/pizza.png'


interface CardProps {
    title: string;
    description: string;
  }

const Card: React.FC<CardProps> = ({ title, description }) => {
    return (
      <Box display='flex' flexDirection='column' bgColor='#75492A' padding={4} borderRadius={45} mt={10} width='200px' height='500px'>
        <Image src={a} alt="Pizza" alignSelf='center'/>

        <Text
        textColor="white" 
        fontFamily='Rakkas'
        marginY={5}
        textAlign='center'

        > {title}
        </Text>


        <Text
        textColor="white" 
        fontFamily='Rakkas'
        marginX={2}
        alignSelf='center'

        > {description}
        </Text>
        
      </Box>
    );


  }

  export default Card