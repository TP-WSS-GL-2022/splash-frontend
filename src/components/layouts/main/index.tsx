import { Box, HStack, useDisclosure, VStack } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import NavHeader from "./NavHeader";
import SidebarContent from "./Sidebar";

const SidebarWithHeader = () => {
    const { isOpen, onToggle } = useDisclosure();
    const { isOpen: isOpenMobile, onToggle: onToggleMobile } = useDisclosure();
    return (
        <HStack minH="100vh" bg="gray.900" align="stretch" gap="0">
            <SidebarContent
                isOpen={isOpen}
                onToggle={onToggle}
                display={{ base: "none", md: "block" }}
                w={{ base: "full", md: isOpen ? "15rem" : "5rem" }}
            />

            <VStack flex="1" m="0 !important">
                <NavHeader isOpen={isOpenMobile} onToggle={onToggleMobile} />

                <Box flex="1" m="0 !important" alignSelf="stretch">
                    <Outlet />
                </Box>
            </VStack>
        </HStack>
    );
};

export default SidebarWithHeader;
