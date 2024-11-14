import { Box, Text, Image } from "@chakra-ui/react"


export default function Resgate(){
    return(
        <Box>
            <Text>Punkte einlösen</Text>
            <Text>Sie können Punkte gegen verschiedene Produkte einlösen. Schauen Sie sich die Möglichkeiten an!</Text>
            <Box>
                <Box>
                    <Image/>
                    <Box>
                        <Text>Pizza</Text>
                        <Text>50 Punkte</Text>
                        <Text>50 Stück verfügbar</Text>
                    </Box>
                </Box>

                <Box>
                    <Image/>
                    <Box>
                        <Text>Pizza</Text>
                        <Text>50 Punkte</Text>
                        <Text>50 Stück verfügbar</Text>
                    </Box>
                </Box>

                <Box>
                    <Image/>
                    <Box>
                        <Text>Pizza</Text>
                        <Text>50 Punkte</Text>
                        <Text>50 Stück verfügbar</Text>
                    </Box>
                </Box>

                <Box>
                    <Image/>
                    <Box>
                        <Text>Pizza</Text>
                        <Text>50 Punkte</Text>
                        <Text>50 Stück verfügbar</Text>
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}