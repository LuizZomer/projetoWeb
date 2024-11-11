import { useState } from "react";
import { Box, Button, Text, Image } from "@chakra-ui/react";
import b from '../assets/VectorBrown.svg'; 
import c from '../assets/VectorBranco.svg';
import d from '../assets/PizzaWhite.svg';
import e from '../assets/PizzaBrown.svg';
import f from '../assets/outlineWhite.svg';
import g from '../assets/outlineBrown.svg';
import h from '../assets/GroupWhite.svg';
import i from '../assets/Group.svg';

interface FiltrosAreaProps {
  onSelectFilter: (type: string) => void;
}

export default function FiltrosArea({ onSelectFilter }: FiltrosAreaProps) {
  const [selected, setSelected] = useState<string | null>(null);

  const handleSelect = (value: string) => {
    setSelected(value);
    onSelectFilter(value); // Chama a função do componente pai
  };

  return (
    <Box display='flex' justifyContent='space-between' mt='57px' mb='40px' mx={{base:'10vw',mobile:'20vw'}} flexWrap='wrap' gap='4px'>
      <Button
        bg={selected === "noodle" ? "#75492A" : "white"}
        color={selected === "noodle" ? "white" : "#75492A"}
        onClick={() => handleSelect("noodle")}
        _hover={{ bg: selected === "noodle" ? "#5A401F" : "#FFEBE8" }} // Marrom mais escuro e vermelho mais claro
        display='flex'
        flexDirection='column'
        alignItems='center'

        boxShadow="0px 4px 14px rgba(1, 1, 1, 0.4)"
        borderRadius='md'
        w='120px'
        h='120px'
      >
          <Image src={ selected === "noodle" ? c : b} boxSize={{ base: "40px", sm: "50px", md: "60px" }}/>
          <Text mt={2} fontFamily='Lato'>Nudelin</Text>
      </Button>

      <Button
        bg={selected === "pizza" ? "#75492A" : "white"}
        color={selected === "pizza" ? "white" : "#75492A"}
        onClick={() => handleSelect("pizza")}
        _hover={{ bg: selected === "pizza" ? "#5A401F" : "#FFEBE8" }} // Marrom mais escuro e vermelho mais claro
        display='flex'
        boxShadow="0px 4px 14px rgba(1, 1, 1, 0.4)"
        flexDirection='column'
        alignItems='center'

        borderRadius='md'
        w='120px'
        h='120px'
      >
        <Image src={ selected === "pizza" ? d : e} />
        <Text fontFamily='Lato' mt={2}>Pizzas</Text>  
      </Button>

      <Button
        bg={selected === "salad" ? "#75492A" : "white"}
        color={selected === "salad" ? "white" : "#75492A"}
        onClick={() => handleSelect("salad")}
        _hover={{ bg: selected === "salad" ? "#5A401F" : "#FFEBE8" }} // Marrom mais escuro e vermelho mais claro
        display='flex'
        flexDirection='column'
        alignItems='center'
        boxShadow="0px 4px 14px rgba(1, 1, 1, 0.4)"
        borderRadius='md'
        w='120px'
        h='120px'
      >
        <Image src={ selected === "salad" ? f : g} />
        <Text fontFamily='Lato' mt={2}>Salat</Text>  
      </Button>

      <Button
        bg={selected === "drink" ? "#75492A" : "white"}
        color={selected === "drink" ? "white" : "#75492A"}
        onClick={() => handleSelect("drink")}
        _hover={{ bg: selected === "drink" ? "#5A401F" : "#FFEBE8" }} // Marrom mais escuro e vermelho mais claro
        display='flex'
        flexDirection='column'
        alignItems='center'
        boxShadow="0px 4px 14px rgba(1, 1, 1, 0.4)"
        borderRadius='md'
        w='120px'
        h='120px'
      >
        <Image src={ selected === "drink" ? h : i} />
        <Text fontFamily='Lato' mt={2}>Getränke</Text>  
      </Button>
    </Box>
  );
}
