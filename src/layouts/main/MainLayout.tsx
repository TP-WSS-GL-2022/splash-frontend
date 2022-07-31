import { FC } from 'react';
import { Outlet } from 'react-router-dom';

import { Box, HStack, VStack } from '@chakra-ui/react';

import { Navbar, Sidebar } from './components';

const MainLayout: FC = () => {
   return (
      <HStack minH="100vh" bg="gray.900" align="stretch" gap="0">
         <Sidebar />

         <VStack flex="1" m="0 !important">
            <Navbar />
            <Box flex="1" m="0 !important" alignSelf="stretch">
               <Outlet />
            </Box>
         </VStack>
      </HStack>
   );
};

export default MainLayout;
