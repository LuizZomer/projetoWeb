
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';
import Landpage from './pages/landpage';
import { ChakraProvider } from '@chakra-ui/react';
import theme from './pages/componentsLand/breakpoints';
import LgnUser from './pages/loginUser';
import { AuthProvider } from './context/AuthContext';
import ClientArea from './pages/clientArea';
import Cardapio from './pages/cardapio';




const router = createBrowserRouter([
  {
    path:'/',
    element:<Landpage/>
  },
  {
    path:'*',
    element:<Navigate to="/" />
  },
  {
    path:'/login',
    element:<LgnUser/>
  },
  {
    path:'/client-area',
    element:<ClientArea/>
  },
  {
    path:'/speiskarte',
    element:<Cardapio/>
  }
 ]);

export default function App() {

  

  return (

          <AuthProvider>
            <ChakraProvider theme={theme}>
              <RouterProvider router={router} />
            </ChakraProvider>
          </AuthProvider>
          )
         
 }