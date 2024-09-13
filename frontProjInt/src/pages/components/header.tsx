import { Box} from "@chakra-ui/react"
import { Button} from '@chakra-ui/react'

function Header(){

    return(
        <Box 
            position='fixed'
            width='100%'  
            zIndex='10' 
            backgroundColor='white' 
            padding='24px'
            
            display="flex"
            flexDir={{base:'column', mobile:'row'}} 
            alignItems="center" 
            justifyContent="space-around" >
                 




                <Button 
                    marginBottom={{base:'10px', mobile:'0'}} 
                    backgroundColor='white'
                    flex={1}
                    fontSize='2rem'
                    >HAUSS
                </Button>

                <Button 
                    marginBottom={{base:'10px', mobile:'0'}}  
                    backgroundColor='white'  
                    flex={1}
                    >VERBIDEN
                </Button>

                <Button
                    marginBottom={{base:'10px', mobile:'0'}}  
                    backgroundColor='white'  
                    flex={1}
                    >SPEISKARTE
                </Button>

                <Button
                    marginBottom={{base:'10px', mobile:'0'}}  
                    backgroundColor='white'  
                    flex={1}  
                    color={"#482D19"} 
                    >AN
                </Button>


            
        </Box>
    )
}

export default Header