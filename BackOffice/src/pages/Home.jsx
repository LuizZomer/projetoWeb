import { Box ,Text, FormControl, FormLabel, Select, Input} from "@chakra-ui/react";
import SideBar from "./components/sidebar";


export default function Home(){



    return(
        <Box display='flex'>
            <SideBar/>
            <Box backgroundColor='#897F61' h='100vh' w='100vw' display='flex'  flexDir='column' alignItems='center'>
                <Text fontFamily='inter' textColor='white' fontSize='38' alignSelf='flex-start' marginLeft='5%' marginY={5}>Benutzer</Text>
                <Box w='90%' backgroundColor='white'>
                    <Text>Filter</Text>

                    <Text>Name</Text>
                    <Input placeholderTextColor="black.400" placeholder="Suchen" />

                    <FormControl>
                    <FormLabel>Erlaubris</FormLabel>
                        <Select placeholder='Erlaubris'>
                            <option>Wählen</option>
                            <option>?</option>
                        </Select>
                    </FormControl>


                </Box>
            </Box>
        </Box>
    )
}