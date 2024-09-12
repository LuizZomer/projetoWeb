import { Box, Image } from "@chakra-ui/react"
import { Button} from '@chakra-ui/react'
import Home from '../assets/Home.png'

function Header(){

    return(
        <Box 
            position='fixed'
            width='100%'  
            zIndex='10' 
            backgroundColor='white' 
            padding='24px'
            display="flex" 
            alignItems="center" 
            justifyContent="space-around" >
                 



                <Button 
                
                    flex={0.5} 
                    backgroundColor='white'> 
                        <Image src={Home} alt="Home" paddingBottom={2}/>
                </Button>

                <Button  
                    backgroundColor='white'  
                    flex={1}
                    >HAUSS
                </Button>

                <Button  
                    backgroundColor='white'  
                    flex={1}
                    >VERBIDEN
                </Button>

                <Button  
                    backgroundColor='white'  
                    flex={1}
                    >SPEISKARTE
                </Button>

                <Button  
                    backgroundColor='white'  
                    flex={1}  
                    color={"#482D19"} 
                    >AN
                </Button>


            
        </Box>
    )
}

export default Header