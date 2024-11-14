import { Box, Text } from "@chakra-ui/react"

export default function Pontos({ loyalty_points }: { loyalty_points: number }){
    return(
        <Box w='100vw'>
            <Text ml='80px' textColor='#482D19' mt='30px' mb='60px' fontWeight='bold' fontSize='40' fontFamily='Roboto'>Punktestand</Text>
            <Box display='flex' ml='80px'>
                <Box fontFamily='Roboto' w='40%'>
                    <Text opacity='70%' fontSize='16px'>Monatliche Punkte</Text>
                    <Text fontSize='28px'>{loyalty_points}</Text>
                </Box>
            </Box>
        </Box>
    )
}