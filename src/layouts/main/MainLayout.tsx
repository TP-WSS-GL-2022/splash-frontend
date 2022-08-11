import { FC } from "react"
import { Outlet } from "react-router-dom"

import { Box, HStack, useDisclosure, VStack } from "@chakra-ui/react"

import { Navbar, Sidebar } from "./components"

const MainLayout: FC = () => {
    const { isOpen: sidebarIsOpen, onToggle: toggleSidebar } = useDisclosure();
    return (
        <HStack h="full" bg="gray.900" align="stretch" gap="0">
            <Sidebar
                display={{ base: "none", md: "block" }}
                open={sidebarIsOpen}
                toggle={toggleSidebar}
            />

            <VStack flex="1" m="0 !important">
                <Navbar />
                <Box
                    h="calc(100% - 5rem);"
                    flex="1"
                    m="0 !important"
                    alignSelf="stretch"
                >
                    <Outlet />
                </Box>
            </VStack>
        </HStack>
    );
};

export default MainLayout;
