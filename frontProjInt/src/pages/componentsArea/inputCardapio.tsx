import { Box, InputGroup, InputLeftElement, Image,Input } from "@chakra-ui/react"
import a from '../assets/Group 9.png'
import React,{useState} from "react";




    interface SearchComponentProps {
        onFilter: (query: string) => void;
      }

const BuscaComponente: React.FC<SearchComponentProps> = ({ onFilter }) => {
        
    const [query, setQuery] = useState<string>("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setQuery(value);
        onFilter(value);
      };


    return(
        <Box display="flex" w='782px' alignSelf='center' mt='36px' h='45px' padding='10px'>
            <InputGroup>
                <InputLeftElement >
                    <Image src={a} ml='25px' h='30px' w='35px'/>
                </InputLeftElement>
                <Input
                paddingLeft='5rem'
                placeholder="search"
                _placeholder={{ color: "white" }}
                value={query}
                onChange={handleChange}
                bgColor='#75492A'
                opacity='85%'
                textColor='#F1ECDC' 
                />
            </InputGroup>
        </Box>
    )
    
}

export default BuscaComponente