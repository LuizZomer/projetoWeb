import { Box, Image, Text } from "@chakra-ui/react";
import React from "react";
import a from '../assets/pizza2.png'
import b from '../assets/salad2.png'
import c from '../assets/noodle.png'
import d from '../assets/soft-drink_3194517.png'

interface RecentOrderProps {
    ultimosItens: string[][];
    types: string[];
    pontos: number[];
}

const RecentOrder: React.FC<RecentOrderProps> = ({ ultimosItens, types, pontos }: RecentOrderProps) =>{

    const getImageForType = (type: string) => {
        switch (type) {
            case 'pizza':
                return a;
            case 'salad':
                return b;
            case 'noodle':
                return c;
            case 'drink':
                return d;
            default:
                return a;
        }
    };

    return(
        <Box mt='60px' display='flex' flexDir='column'>
            <Text fontSize='40' fontWeight='bold' color='#482D19' alignSelf='center'>Letzte Bestellungen</Text>
            <Box display='flex' justifyContent='space-around'>
                <Box mt='60px' display='flex' flexDir='column' textAlign='center' w='340px' h='228px' alignItems='center'>
                    <Box w='100px' h='100px' bgColor='#AC927F' borderRadius='50' display='flex' alignContent='center' justifyContent='center'>
                        <Image w='60%' src={getImageForType(types[0] || 'default')} alt="?" justifySelf='center' alignSelf='center'/>
                    </Box>
                    <Text my='20px' fontSize='20' fontFamily='roboto' color='#482D19' fontWeight='regular'>{ultimosItens[0]}</Text>
                    <Text color='black' fontSize='28' fontFamily='roboto'>{pontos[0]} Punkte</Text>
                </Box>
                <Box mt='60px' w='340px' h='228px' display='flex' flexDir='column' textAlign='center' alignItems='center'>
                    <Box w='100px' h='100px' bgColor='#AC927F' borderRadius='50' display='flex' alignContent='center' justifyContent='center'>
                        <Image w='60%' src={getImageForType(types[1] || 'default')} alt="?" justifySelf='center' alignSelf='center'/>
                    </Box>
                    <Text my='20px' fontSize='20' fontFamily='roboto' color='#482D19' fontWeight='regular'>{ultimosItens[1]}</Text>
                    <Text color='black' fontSize='28' fontFamily='roboto'>{pontos[1]} Punkte</Text>
                </Box>
                <Box mt='60px' w='340px' h='228px' display='flex' flexDir='column' textAlign='center' alignItems='center' >
                    <Box  w='100px' h='100px' bgColor='#AC927F' borderRadius='50' display='flex' alignContent='center' justifyContent='center'>
                        <Image w='60%' src={getImageForType(types[2] || 'default')}  alt="?" justifySelf='center' alignSelf='center'/>
                    </Box>
                    <Text my='20px' fontSize='20' fontFamily='roboto' color='#482D19' fontWeight='regular'>{ultimosItens[2]}</Text>
                    <Text color='black' fontSize='28' fontFamily='roboto'>{pontos[2]} Punkte</Text>
                </Box>
            </Box>
        </Box>
    )
}
export default RecentOrder