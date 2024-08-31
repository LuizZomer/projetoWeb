
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';
import Landpage from './pages/landpage';
import { ChakraProvider } from '@chakra-ui/react';

const router = createBrowserRouter([
  {
    path:'/',
    element:<Landpage/>
  },
  {
    path:'*',
    element:<Navigate to="/" />
  },
 ]);

export default function App() {
  return (
  <ChakraProvider>
    <RouterProvider router={router} />
  </ChakraProvider>
  );
 }