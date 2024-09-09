import {Box, Text, Button} from '@chakra-ui/react'

export default function DescVantagens(){
    return(
        <Box 
                display='flex' 
                justifyContent='space-between' 
                m='10%'
                maxWidth='70%'
                >

                <Text 
                w={400}
                fontFamily='Rakkas'
                color='#482D19'
                fontSize='large'
                fontWeight='semibold'
                
                    >Wenn Sie der Pizzeria Bei Giovanni beitreten, profitieren Sie von einer Reihe exklusiver Geschenke, die Ihr Erlebnis noch spezieller machen.
                </Text>

                <Button
                bgColor='#75492A'
                textColor='white'
                w='376px'
                h='118px'
                fontSize='xxx-large'
                fontWeight='bold'
                fontFamily='Rakkas'
                    >VERBIDEN
                </Button>

            </Box>

    )
}