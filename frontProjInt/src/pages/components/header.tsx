import { Box} from "@chakra-ui/react"
import { Button} from '@chakra-ui/react'

function Header(){

    return(
        <Box 
            position={{base:'static', mobile:'fixed'}} 
            width='100%'  
            zIndex='10' 
            backgroundColor='white' 
            padding={{base:'10px',mobile:'24px'}}
            
            display="flex"
            flexDir={{base:'column', mobile:'row'}} 
            alignItems="center" 
            justifyContent="space-around"
            gap='0.7rem'
            boxShadow="0 4px 6px rgba(0, 0, 0, 0.1)"    
             >
                 




                <Button 

                    backgroundColor='white'
                    flex={1}
                    fontSize='0.9rem' 
                    >HAUSS
                </Button>

                <Button 

                    backgroundColor='white'  
                    flex={1}
                    fontSize='0.9rem' 
                    >VERBIDEN
                </Button>

                <Button
  
                    backgroundColor='white'  
                    flex={1}
                    fontSize='0.9rem' 
                    >SPEISKARTE
                </Button>

                <Button

                    backgroundColor='white'  
                    flex={1}
                    fontSize='0.9rem'  
                    color={"#482D19"}
                    mb='9px'    
                    >AN
                </Button>


            
        </Box>
    )
}

export default Header