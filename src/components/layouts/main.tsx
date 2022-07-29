import { IconType } from "react-icons";
import {
    FiChevronsLeft, FiCompass, FiHome, FiMenu, FiSettings, FiStar, FiVideo
} from "react-icons/fi";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

import {
    Avatar, Box, BoxProps, Button, Drawer, DrawerContent, Flex, FlexProps, HStack, Icon, IconButton,
    Menu, MenuButton, MenuDivider, MenuItem, MenuList, Text, Tooltip, useDisclosure, VStack
} from "@chakra-ui/react";

import { AppRoute } from "../../util/routes";

// TODO: Replace with a hook to see the auth state
const isLoggedIn = false;

interface LinkItemProps {
    name: string;
    icon: IconType;
    link: AppRoute;
}

const LinkItems: LinkItemProps[] = [
    { name: "Home", icon: FiHome, link: AppRoute.Home },
    {
        name: "Explore",
        icon: FiCompass,
        link: AppRoute.Explore,
    },
    {
        name: "Following",
        icon: FiStar,
        link: AppRoute.Following,
    },
    { name: "Test", icon: FiSettings, link: AppRoute.Test },
];

interface SidebarProps extends BoxProps {
    onToggle: () => void;
    isOpen: boolean;
}

const SidebarContent = ({ onToggle, isOpen, ...rest }: SidebarProps) => {
    return (
        <Box
            alignSelf="stretch"
            borderRight="1px"
            borderRightColor="gray.700"
            transition="0.4s ease-in-out"
            {...rest}
        >
            <Box pos="sticky" top={0} mx={4}>
                <Flex
                    h="20"
                    alignItems="center"
                    justifyContent="space-between"
                    position="relative"
                >
                    {/* TODO: Change to a Logo SVG or PNG and */}
                    <Text
                        fontSize="2xl"
                        fontWeight="bold"
                        opacity={isOpen ? "1" : "0"}
                        transition="0.2s ease-in"
                        position="absolute"
                    >
                        Splash
                    </Text>

                    <IconButton
                        icon={
                            <Icon
                                as={FiChevronsLeft}
                                transform={`rotate(${
                                    isOpen ? "0deg" : "180deg"
                                })`}
                                transition="opacity 0.2s ease-in, transform 0.2s ease-in"
                            />
                        }
                        aria-label="open menu"
                        p="4"
                        ml="auto"
                        size="xl"
                        color="white"
                        bg="whiteAlpha.200"
                        borderRadius="lg"
                        _hover={{ bg: "teal.200", color: "black" }}
                        onClick={onToggle}
                    />
                </Flex>

                <VStack mt={4} spacing={2}>
                    {LinkItems.map((link, index) => (
                        <NavItem key={index} link={link} isOpen={isOpen}>
                            <Text
                                fontSize="md"
                                opacity={isOpen ? "1" : "0"}
                                transition="opacity 0.2s ease-in"
                            >
                                {link.name}
                            </Text>
                        </NavItem>
                    ))}
                </VStack>
            </Box>
        </Box>
    );
};

interface NavItemProps extends FlexProps {
    link: LinkItemProps;
    isOpen: boolean;
}

const NavItem = ({ link, isOpen, children }: NavItemProps) => {
    const location = useLocation();
    const navigate = useNavigate();
    return (
        <Tooltip
            label={link.name}
            openDelay={300}
            offset={[0, 12]}
            placement="right"
            isDisabled={isOpen}
            hasArrow
        >
            <Button
                size="xl"
                w="100%"
                p="4"
                borderRadius="lg"
                justifyContent="start"
                cursor="pointer"
                bg={
                    location.pathname === link.link
                        ? "teal.200"
                        : "whiteAlpha.200"
                }
                color={location.pathname === link.link ? "black" : "white"}
                _hover={{ bg: "teal.200", color: "black" }}
                onClick={() => navigate(link.link)}
                overflowWrap="break-word"
                overflow="hidden"
            >
                <Icon mr="4" fontSize="16" as={link.icon} />
                {children}
            </Button>
        </Tooltip>
    );
};

interface MobileProps extends FlexProps {
    onToggle: () => void;
    isOpen: boolean;
}
const NavHeader = ({ onToggle, isOpen }: MobileProps) => {
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
                        <Button fontWeight={400} variant={"ghost"}>
                            Sign In
                        </Button>
                        <Button
                            display={{ base: "none", md: "inline-flex" }}
                            fontWeight={600}
                            colorScheme={"teal"}
                        >
                            Sign Up
                        </Button>
                    </>
                )}
            </HStack>
        </Flex>
    );
};

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
