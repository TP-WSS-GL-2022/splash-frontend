import React from "react";
import { FC, useState } from "react";
import { FiMenu, FiVideo } from "react-icons/fi";

import { useNavigate } from "react-router-dom";

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
    Skeleton,
    Box,
    Image,
    useDisclosure,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Center,
    FormControl,
    FormLabel,
    Switch
} from "@chakra-ui/react";

import { useAuthState } from "react-firebase-hooks/auth";
import { AuthModal } from "./modal";
import Sidebar from "./Sidebar";
import { auth } from "../../../util/firebase";
import { signOut } from "firebase/auth";
import { AppRoute } from "../../../util/routes";

const Navbar: FC = () => {
    const { isOpen: drawerIsOpen, onToggle: toggleDrawer } = useDisclosure();
    const [modalState, setModalState] = useState({ index: 0, isOpen: false });
    const [user, loading, error] = useAuthState(auth);
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [size, setSize] = React.useState('xl')
    const finalRef = React.useRef(null)
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
                    {loading ? (
                        <Skeleton w="28" h={4} />
                    ) : user ? (
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
                            <Modal finalFocusRef={finalRef} size={size} isOpen={isOpen} onClose={onClose}>
                                <ModalOverlay />
                                <ModalContent>
                                    <Center>
                                        <ModalHeader>Title</ModalHeader>
                                    </Center>
                                    <ModalCloseButton />
                                    <ModalBody>
                                        <Image
                                            draggable={false}
                                            src={"https://filestore.community.support.microsoft.com/api/images/857d91c4-3174-47e1-ac65-fb319ae97773?upload=true"}
                                            w="100%"
                                            h="300"
                                            alt="Video Thumbnail here"
                                        />
                                        <Box mt="5"></Box>
                                        <FormControl display='flex' alignItems='center'>
                                            <FormLabel htmlFor='email-alerts' mb='0'>
                                            <FiVideo />
                                            </FormLabel>
                                            <Switch id='email-alerts' />
                                        </FormControl>
                                    </ModalBody>
                                    <ModalFooter>
                                        <Button colorScheme='teal' mr={3} onClick={console.log}>
                                            Start Streaming
                                        </Button>
                                    </ModalFooter>
                                </ModalContent>
                            </Modal>
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
                                            "https://images.unsplash.com/photo-1520810627419-35e362c5dc07?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&ixid=eyJhcHBfaWQiOjE3Nzg0fQ"
                                        }
                                    />
                                </MenuButton>
                                <MenuList>
                                    <MenuItem onClick={() => navigate(AppRoute.Profile)}>Profile</MenuItem>
                                    <MenuItem onClick={() => navigate(AppRoute.Settings)}>Settings</MenuItem>
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
