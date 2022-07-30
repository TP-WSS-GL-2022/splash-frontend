import { FC } from "react";
import { Outlet } from "react-router-dom";

import { Box, HStack, useDisclosure, VStack } from "@chakra-ui/react";

import { HomeNavbar, HomeSidebar } from "./components/";

const Home: FC = () => {
    const { isOpen: sidebarIsOpen, onToggle: toggleSidebar } = useDisclosure();
    return (
        <HStack minH="100vh" bg="gray.900" align="stretch" gap="0">
            <HomeSidebar
                display={{ base: "none", md: "block" }}
                open={sidebarIsOpen}
                toggle={toggleSidebar}
            />

            <VStack flex="1" m="0 !important">
                <HomeNavbar />
                <Box flex="1" m="0 !important" alignSelf="stretch">
                    <Outlet />
                </Box>
            </VStack>
        </HStack>
    );
};

export default Home;
