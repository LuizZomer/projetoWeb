import {Box, Text, Image } from '@chakra-ui/react'
import a from '../assets/pizza.png'


interface CardProps {
    title: string;
    description: string;
  }

const Card: React.FC<CardProps> = ({ title, description }) => {
    return (
      <Box display='flex' flexDirection='column' bgColor='#75492A' padding={4} borderRadius={45} mt={10} width='285px' height='775px' mx='10px'>
        <Image src={a} alt="Pizza" alignSelf='center' mt='49px'/>

        <Text
        textColor="white" 
        fontFamily='Rakkas'
        marginY={5}
        textAlign='center'
        fontSize='24px'

        > {title}
        </Text>


        <Text
        textColor="white" 
        fontFamily='Rakkas'
        marginX={2}
        alignSelf='center'
        fontSize='24px'
        mt='40px'
        > {description}
        </Text>
        
      </Box>
    );


  }

  export default Card