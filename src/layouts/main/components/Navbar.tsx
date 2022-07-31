import { FC, useState } from "react";
import { FiMenu, FiVideo } from "react-icons/fi";

import { useNavigate } from 'react-router-dom';

import {
    Avatar,
    Button,
    Drawer,
    DrawerContent,
    Flex,
    HStack,
    IconButton,
    Menu,
    MenuButton,
    MenuDivider,
    MenuItem,
    MenuList,
    Text,
    useDisclosure,
} from "@chakra-ui/react";

import { useAuth } from "../../../hooks/useAuth";
import { AuthModal } from "./modal";
import Sidebar from "./Sidebar";

const Navbar: FC = () => {
    const { isOpen: drawerIsOpen, onToggle: toggleDrawer } = useDisclosure();
    const [modalState, setModalState] = useState({ index: 0, isOpen: false });
    const { isLoggedIn } = useAuth();
    const navigate = useNavigate();
    return (
        <Flex
            h="20"
            px={{ base: 4, md: 4 }}
            alignSelf="stretch"
            alignItems="center"
            borderBottomWidth="1px"
            borderBottomColor="gray.700"
            bg="gray.900"
            justifyContent={{ base: "space-between", md: "flex-end" }}
        >
            <IconButton
                display={{ base: "flex", md: "none" }}
                onClick={toggleDrawer}
                variant="outline"
                aria-label="open menu"
                icon={<FiMenu />}
            />

            <Drawer
                autoFocus={false}
                isOpen={drawerIsOpen}
                placement="left"
                onClose={toggleDrawer}
                returnFocusOnClose={false}
                onOverlayClick={toggleDrawer}
            >
                <DrawerContent>
                    <Sidebar open={drawerIsOpen} toggle={toggleDrawer} />
                </DrawerContent>
            </Drawer>

            <Text
                display={{ base: "flex", md: "none" }}
                fontSize="2xl"
                fontFamily="monospace"
                fontWeight="bold"
            >
                Logo
            </Text>

            <HStack spacing={6}>
                {isLoggedIn ? (
                    <>
                        <Button
                            variant={"solid"}
                            colorScheme={"teal"}
                            size={"sm"}
                            leftIcon={<FiVideo />}
                            onClick={console.log}
                            display={{ base: "none", md: "inline-flex" }}
                        >
                            Stream
                        </Button>
                        <Menu>
                            <MenuButton
                                as={Button}
                                rounded={"full"}
                                variant={"link"}
                                cursor={"pointer"}
                                minW={0}
                            >
                                <Avatar
                                    size={"sm"}
                                    src={
                                        "https://images.unsplash.com/photo-1493666438817-866a91353ca9?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9"
                                    }
                                />
                            </MenuButton>
                            <MenuList>
                                <MenuItem>Link 1</MenuItem>
                                <MenuItem>Link 2</MenuItem>
                                <MenuDivider />
                                <MenuItem>Link 3</MenuItem>
                            </MenuList>
                        </Menu>
                    </>
                ) : (
                    <>
                        <Button
                            fontWeight={400}
                            variant={"ghost"}
                            onClick={() =>
                                setModalState({ index: 0, isOpen: true })
                            }
                        >
                            Sign In
                        </Button>
                        <Button
                            display={{ base: "none", md: "inline-flex" }}
                            fontWeight={600}
                            colorScheme={"teal"}
                            onClick={() =>
                                setModalState({ index: 1, isOpen: true })
                            }
                        >
                            Sign Up
                        </Button>
                    </>
                )}
            </HStack>
            <AuthModal state={modalState} setState={setModalState} />
        </Flex>
    );
};

export default Navbar;
