import {
    Avatar,
    Button,
    Drawer,
    DrawerContent,
    Flex,
    FlexProps,
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
import { FiMenu, FiVideo } from "react-icons/fi";
import AuthModal from "./Modal";
import SidebarContent from "./Sidebar";

// TODO: Replace with a hook to see the auth state
const isLoggedIn = false;

interface NavHeaderProps extends FlexProps {
    onToggle: () => void;
    isOpen: boolean;
}

const NavHeader = ({ onToggle, isOpen }: NavHeaderProps) => {
    const {
        isOpen: modalIsOpen,
        onOpen: modalOnOpen,
        onClose: modalOnClose,
    } = useDisclosure();
    const {
        isOpen: authState,
        onOpen: setLogin,
        onClose: setSignUp,
        onToggle: toggleAuthState,
    } = useDisclosure();

    const openLogin = () => {
        setLogin();
        modalOnOpen();
    };

    const openSignUp = () => {
        setSignUp();
        modalOnOpen();
    };
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
                onClick={onToggle}
                variant="outline"
                aria-label="open menu"
                icon={<FiMenu />}
            />

            <Text
                display={{ base: "flex", md: "none" }}
                fontSize="2xl"
                fontFamily="monospace"
                fontWeight="bold"
            >
                Logo
            </Text>

            <Drawer
                autoFocus={false}
                isOpen={isOpen}
                placement="left"
                onClose={onToggle}
                returnFocusOnClose={false}
                onOverlayClick={onToggle}
            >
                <DrawerContent>
                    <SidebarContent isOpen={isOpen} onToggle={onToggle} />
                </DrawerContent>
            </Drawer>

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
                            onClick={openLogin}
                        >
                            Sign In
                        </Button>
                        <Button
                            display={{ base: "none", md: "inline-flex" }}
                            fontWeight={600}
                            colorScheme={"teal"}
                            onClick={openSignUp}
                        >
                            Sign Up
                        </Button>
                    </>
                )}
            </HStack>
            <AuthModal
                isOpen={modalIsOpen}
                onClose={modalOnClose}
                authState={authState}
                setLogin={setLogin}
                setSignUp={setSignUp}
                onToggle={toggleAuthState}
            />
        </Flex>
    );
};

export default NavHeader;
