
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import LgnUser from './components/LgnUser';
import { ChakraProvider } from '@chakra-ui/react';
import { AuthProvider } from './context/AuthContext';




function App() {

  const router = createBrowserRouter([
    {
      path:'/',
      element:<LgnUser/>
    },
    {
      path:'*',
      element:<Navigate to="/" />
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