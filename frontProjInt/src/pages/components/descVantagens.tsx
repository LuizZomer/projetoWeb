import {Box, Text, Button} from '@chakra-ui/react'

export default function DescVantagens(){
    return(
        <Box 
                display='flex' 
                justifyContent='space-between'
                marginX='10%'
                marginY='12%' 
                >

                <Text 
                
                fontFamily='Rakkas'
                color='#482D19'
                w='464px'
                h='144px'
                fontWeight='semibold'
                fontSize='24'
                marginRight='300px'
                
                    >Wenn Sie der Pizzeria Bei Giovanni beitreten, profitieren Sie von einer Reihe exklusiver Geschenke, die Ihr Erlebnis noch spezieller machen.
                </Text>

                <Button
                bgColor='#75492A'
                textColor='white'
                w='376px'
                h='118px'
                fontWeight='bold'
                fontFamily='Rakkas'
                fontSize='48'
                    >VERBIDEN
                </Button>

            </Box>

    )
}