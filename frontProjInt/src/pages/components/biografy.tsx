import { Box, Image, Text} from "@chakra-ui/react"
import a from "../assets/Second-section.png";

function Biografy(){

    return(
        <Box display="flex" 
            alignItems="center" 
            justifyContent="space-between" 
            width='80%'
            alignSelf='center'
            >

            <Text  as='b' 
                fontSize='lg' 
                fontFamily="Rakkas" 
                textAlign='left' 
                textColor="#482D19" 
                width={566}
                > Die Pizzeria Bei Giovanni in Witten erzählt eine Geschichte von Liebe und Familientradition. Giovanni, ein leidenschaftlicher Italiener, gründete die Pizzeria und brachte authentische Rezepte aus seiner Heimat mit. Nach seinem unerwarteten Weggang ging die Pizzeria in die Hände seines Bruders über, der beschloss, den Namen zu Ehren von Giovanni beizubehalten. Hier ehren wir weiterhin sein Vermächtnis, indem wir Pizzen servieren, die mit den gleichen frischen Zutaten und der gleichen Leidenschaft zubereitet werden, die Giovanni schon immer hatte. Jedes Stück erzählt eine Geschichte und bewahrt Giovannis Erinnerung in Wittens Herzen.
            </Text>

            <Image height={300} src={a} alt="Sobre"/>

        </Box>
    )
}

export default Biografy