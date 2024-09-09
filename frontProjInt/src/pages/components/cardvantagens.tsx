import { Box, Text } from "@chakra-ui/react";
import Card from "./card";
import DescVantagens from "./descVantagens";


function Cardvantagens(){
    return(
            <Box display="flex" 
                flexDirection='column' 
                alignItems="center" 
                justifyContent="center" mt={10}>

                <Text as='b' 
                    textColor="#482D19" 
                    fontFamily='Rakkas' 
                    fontSize='3xl'
                    >VERBIDEN
                </Text>

                <Box 
                    display="flex" 
                    alignItems='center' 
                    justifyContent='space-evenly' 
                    mt={10} 
                    width="100%"
                    maxWidth="1200px" 
                    p={4}
                >
                    <Card title="Exclusive Rabatte" 
                    description="Erhalten Sie exklusive Rabatte, Sonderangebote und Angebote basierend auf den Bestellungen, die Sie normalerweise aufgeben. Ihre Vorlieben werden immer belohnt!"
                    />

                    <Card title="Treueprogramm" 
                    description="Sammeln Sie bei jedem Einkauf Punkte und lösen Sie diese gegen kostenlose Mahlzeiten, Getränke oder Desserts ein. Genießen Sie Ihr Erlebnis in der Pizzeria Bei Giovanni noch mehr!"
                    />

                    <Card 
                    title="Priorität bei Reservierungen" 
                    description="Erhalten Sie bevorzugte Reservierungen und sichern Sie sich Ihren Platz in unserer Pizzeria, besonders an geschäftigen Tagen."
                    />

                    <Card title="Familienangebote" 
                    description="Rabatte und spezielle Pakete für Gruppen- oder Familienessen. Genießen Sie köstliche Momente mit Ihren Liebsten!"
                    />
                </Box>
                <DescVantagens/>
            </Box>

            

        
    )
}

export default Cardvantagens