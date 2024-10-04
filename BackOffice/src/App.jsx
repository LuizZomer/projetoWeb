
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import LgnUser from './pages/LgnUser';
import { ChakraProvider } from '@chakra-ui/react';
import { AuthProvider, useAuth } from './context/AuthContext';

import Home from './pages/Home';
import Func from './pages/usurios';




function App() {

  const router = createBrowserRouter([
    {
      path:'/benutzer',
      element:<Func/>
    },
    {
      path:'/',
      element:<LgnUser/>
    },
    {
      path:'/home',
      element:<Home/>
    }

   ]);
  
  return (
    <AuthProvider>
      <ChakraProvider>
        <RouterProvider router={router} />
      </ChakraProvider>
    </AuthProvider>
  );
}

export default App;