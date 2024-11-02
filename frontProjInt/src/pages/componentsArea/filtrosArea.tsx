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
    <Box display='flex' justifyContent='space-between' mt='57px' mb='40px' mx='318px'>
      <Button
        bg={selected === "nudelin" ? "#75492A" : "white"}
        color={selected === "nudelin" ? "white" : "#75492A"}
        onClick={() => handleSelect("nudelin")}
        _hover={{ bg: selected === "nudelin" ? "#5A401F" : "#FFEBE8" }} // Marrom mais escuro e vermelho mais claro
        display='flex'
        flexDirection='column'
        alignItems='center'
        padding='5%'
        borderRadius='md'
        w='120px'
        h='120px'
      >
        <Image src={ selected === "nudelin" ? c : b} />
        <Text mt={2}>Nudelin</Text>
      </Button>

      <Button
        bg={selected === "pizza" ? "#75492A" : "white"}
        color={selected === "pizza" ? "white" : "#75492A"}
        onClick={() => handleSelect("pizza")}
        _hover={{ bg: selected === "pizza" ? "#5A401F" : "#FFEBE8" }} // Marrom mais escuro e vermelho mais claro
        display='flex'
        flexDirection='column'
        alignItems='center'
        padding='5%'
        borderRadius='md'
        w='120px'
        h='120px'
      >
        <Image src={ selected === "pizza" ? d : e} />
        <Text mt={2}>Pizzas</Text>  
      </Button>

      <Button
        bg={selected === "salat" ? "#75492A" : "white"}
        color={selected === "salat" ? "white" : "#75492A"}
        onClick={() => handleSelect("salat")}
        _hover={{ bg: selected === "salat" ? "#5A401F" : "#FFEBE8" }} // Marrom mais escuro e vermelho mais claro
        display='flex'
        flexDirection='column'
        alignItems='center'
        padding='5%'
        borderRadius='md'
        w='120px'
        h='120px'
      >
        <Image src={ selected === "salat" ? f : g} />
        <Text mt={2}>Salat</Text>  
      </Button>

      <Button
        bg={selected === "getränke" ? "#75492A" : "white"}
        color={selected === "getränke" ? "white" : "#75492A"}
        onClick={() => handleSelect("getränke")}
        _hover={{ bg: selected === "getränke" ? "#5A401F" : "#FFEBE8" }} // Marrom mais escuro e vermelho mais claro
        display='flex'
        flexDirection='column'
        alignItems='center'
        padding='5%'
        borderRadius='md'
        w='120px'
        h='120px'
      >
        <Image src={ selected === "getränke" ? h : i} />
        <Text mt={2}>Getränke</Text>  
      </Button>
    </Box>
  );
}
