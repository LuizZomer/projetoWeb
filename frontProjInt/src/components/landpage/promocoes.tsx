import { Box, Image, Text } from "@chakra-ui/react";







export default function Promo(){
    return(
        <Box display='flex' flexDir='column' alignItems='center'>
            <Text
                color='#482D19'
                fontFamily='Rakkas'
                fontWeight='Bold'
                fontSize='5xl'
                mt={30}
                >Aktuelle Aktionen
            </Text>


            <Text
                color='#482D19'
                fontFamily='Rakkas'
                fontWeight='Bold'
                fontSize='xl'
                
                >Bleiben Sie über unsere neuesten Angebote informiert!
            </Text>

            <Image src='' 
                alt="Foto Promoção" 
                backgroundColor='#75492A' 
                paddingX={400} 
                paddingY={250}
                margin={50}
            /> 

            <Box display='flex' justifyContent='space-around' width='100%' alignItems='center'>
                <Text
                    color='#482D19'
                    fontWeight='bold'
                    fontStyle='Rakkas'
                    fontSize='large'
                    >Inh.: Círo Donadío
                </Text>

                <Text
                    color='#482D19'
                    fontWeight='bold'
                    fontStyle='Rakkas'
                    fontSize='large'
                    >Hörder Str. 323 58454 Wítten
                </Text> 

                <Text
                    color='#482D19'
                    fontWeight='bold'
                    fontStyle='Rakkas'
                    fontSize='xx-large'   
                    >Aktuelle Aktionen
                </Text> 


            </Box>  
        </Box>
    )
}