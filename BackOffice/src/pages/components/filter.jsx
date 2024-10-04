import { Box ,Text, FormControl, FormLabel, Select,Image, Input, Button, InputGroup, InputLeftElement} from "@chakra-ui/react";
import a from '../../assets/Vector4.png'
import Usuarios from "./usuarios";

export default function Filter(){

    return(
        <Box w='95%' backgroundColor='white' display='flex' flexDirection='column' borderRadius='8px' borderColor='black' borderStyle='solid' borderWidth='1px'>

                    <Text fontSize='20' textColor='#482D19' marginLeft='33px' marginTop='18px' marginBottom='13px'>Filter</Text>

                    <Box display='flex' flexDir='row' marginLeft='33px' textColor='#482D19' paddingBottom='20px'>

                        <Box marginRight='58px'>
                            <Text fontSize='14' fontFamily='Inter' fontWeight='hairline'>Name</Text>
                            <InputGroup>
                                <InputLeftElement
                                    children={
                                      <Image
                                        src={a}
                                        mt='2'
                                      />
                                    }
                                />
                                <Input 
                                    borderColor='#482D19' 
                                    _placeholder={{ color: '#482D19' }} 
                                    placeholder="Suchen" 
                                    w='280px' 
                                    h='44px'
                                    />
                            </InputGroup>
                        </Box>


                        <FormControl>
                        <FormLabel fontFamily='inter' fontSize='14' textColor='#482D19' gap='0'>Erlaubris</FormLabel>
                            <Select borderColor='#482D19' marginTop='-2' fontSize='14' w='280px' h='44px' placeholder='Erlaubris'>
                                <option>Wählen</option>
                                <option>?</option>
                            </Select>   
                        </FormControl>

                        <Button borderRadius='4px'
                        
                        color='white' 
                        bgColor='#482D19' 
                        w='175px' h='43px' 
                        alignSelf='end' 
                        mx='12' 
                        fontFamily='Inter' 
                        fontSize='20px' 
                        paddingX='30px' 
                        fontWeight='normal'
                        _hover={{bg:'gray'}}
                            >Zu senden
                        </Button>

                    </Box>

                </Box>

    )

}