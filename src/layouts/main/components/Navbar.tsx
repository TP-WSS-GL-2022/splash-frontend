import { signOut } from "firebase/auth"
import { FC, useContext, useState } from "react"
import { FiMenu, FiVideo } from "react-icons/fi"
import { useNavigate } from "react-router-dom"

import {
    Avatar, Button, Drawer, DrawerContent, Flex, HStack, IconButton, Image, Menu, MenuButton,
    MenuDivider, MenuItem, MenuList, useDisclosure
} from "@chakra-ui/react"

import { UserContext } from "../../../context/UserContext"
import { auth } from "../../../util/firebase"
import { AppRoute } from "../../../util/routes"
import { AuthModal } from "./modal"
import StreamModal from "./modal/StreamModal"
import Sidebar from "./Sidebar"

const Navbar: FC = () => {
    const user = useContext(UserContext);
    const { isOpen: drawerIsOpen, onToggle: toggleDrawer } = useDisclosure();
    const [modalState, setModalState] = useState({ index: 0, isOpen: false });
    const { isOpen, onOpen, onClose } = useDisclosure();
    const navigate = useNavigate();

    return (
        <>
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

                <Image
                    display={{ base: "flex", md: "none" }}
                    boxSize={14}
                    objectFit="cover"
                    src="/assets/splash.png"
                />

                <HStack spacing={6}>
                    {user ? (
                        <>
                            <Button
                                variant={"solid"}
                                colorScheme={"teal"}
                                size={"sm"}
                                leftIcon={<FiVideo />}
                                onClick={onOpen}
                                display={{ base: "none", md: "inline-flex" }}
                            >
                                Stream
                            </Button>
                            <StreamModal isOpen={isOpen} onClose={onClose} />
                            <Menu>
                                <MenuButton
                                    as={Button}
                                    rounded={"full"}
                                    variant={"link"}
                                    cursor={"pointer"}
                                    minW={0}
                                >
                                    <Avatar size={"sm"} src={user.photo} />
                                </MenuButton>
                                <MenuList>
                                    <MenuItem
                                        onClick={() =>
                                            navigate(AppRoute.Profile)
                                        }
                                    >
                                        Profile
                                    </MenuItem>
                                    <MenuItem
                                        onClick={() =>
                                            navigate(AppRoute.Settings)
                                        }
                                    >
                                        Settings
                                    </MenuItem>
                                    <MenuDivider />
                                    <MenuItem onClick={() => signOut(auth)}>
                                        Sign out
                                    </MenuItem>
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
                <Drawer
                    preserveScrollBarGap
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
            </Flex>
        </>
    );
};

export default Navbar;
