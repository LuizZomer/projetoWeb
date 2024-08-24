import { Box, Image } from "@chakra-ui/react"
import { Button, ButtonGroup } from '@chakra-ui/react'
import Home from '../../assets/Home.png'

function Header(){

    return(
        <Box >
            <ButtonGroup display="flex" alignItems="center" justifyContent="space-between" mt={2}>
                <Button flex={0.5}  > 
                    <Image src={Home} alt="Home" />
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