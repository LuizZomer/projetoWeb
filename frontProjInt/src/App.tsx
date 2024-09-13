
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';
import Landpage from './pages/landpage';
import { ChakraProvider } from '@chakra-ui/react';
import theme from './pages/components/breakpoints';

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
  <ChakraProvider theme={theme}>
    <RouterProvider router={router} />
  </ChakraProvider>
  );
 }