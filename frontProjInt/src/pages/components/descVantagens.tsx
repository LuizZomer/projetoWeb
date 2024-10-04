import {Box, Text, Button} from '@chakra-ui/react'

export default function DescVantagens(){
    return(
        <Box 
                display='flex'
                flexDir={{base:'column', mobile:'row'}} 
                justifyContent={{base:'center',mobile:'space-between'}}
                marginX='10%'
                marginY={{base:'20%',mobile:'12%'}}
                alignItems='center'
                alignContent='center'
                gap={10} 
                >

                <Text 
                
                fontFamily='Rakkas'
                color='#482D19'
                w={{base:'300px',mobile:'464px'}}
                h={{base:'200px',mobile:'144px'}}
                fontWeight='semibold'
                fontSize={{base:'20px',mobile:'2vw'}}
                marginRight={{base:'0px',mobile:'8vw'}}
                marginBottom={{base:'20px',mobile:'0'}} 
                
                
                    >Wenn Sie der Pizzeria Bei Giovanni beitreten, profitieren Sie von einer Reihe exklusiver Geschenke, die Ihr Erlebnis noch spezieller machen.
                </Text>

                <Button
                bgColor='#75492A'
                textColor='white'
                w={{base:'10em',mobile:'30vw'}}
                h={{base:'70px',mobile:'118px'}}    
                fontWeight='bold'
                fontFamily='Rakkas'
                fontSize={{base:'22',mobile:'48'}}
                _hover={{bg:'gray'}}
                    >VERBIDEN
                </Button>

            </Box>

    )
}