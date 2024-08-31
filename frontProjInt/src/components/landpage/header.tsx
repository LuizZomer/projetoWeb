import { Box, Image } from "@chakra-ui/react"
import { Button, ButtonGroup } from '@chakra-ui/react'
import Home from '../../assets/Home.png'

function Header(){

    return(
        <Box position='fixed' width='100%'  zIndex='10' backgroundColor='white' padding={15}> 
            <ButtonGroup display="flex" alignItems="center" justifyContent="space-around" mt={2}>
                <Button flex={0.5}  > 
                    <Image src={Home} alt="Home" paddingBottom={2}/>
                </Button>
                <Button   flex={1}>HAUSS</Button>
                <Button   flex={1}>VERBIDEN</Button>
                <Button   flex={1}>SPEISKARTE</Button>
                <Button   flex={1}  color={"#482D19"} >AN</Button>
            </ButtonGroup>
        </Box>
    )
}

export default Header