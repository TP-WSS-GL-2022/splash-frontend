import { IconType } from "react-icons";
import {
    FiChevronsLeft,
    FiCompass,
    FiHome,
    FiMenu,
    FiSettings,
    FiStar,
    FiVideo,
} from "react-icons/fi";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

import {
    Avatar,
    Box,
    BoxProps,
    Button,
    Drawer,
    DrawerContent,
    Flex,
    FlexProps,
    HStack,
    Icon,
    IconButton,
    Menu,
    MenuButton,
    MenuDivider,
    MenuItem,
    MenuList,
    Text,
    Tooltip,
    useDisclosure,
} from "@chakra-ui/react";
import { AppRoute } from "../../util/routes";

const isLoggedIn = false;

interface LinkItemProps {
    name: string;
    icon: IconType;
    link: string;
    tooltip: string;
}

const LinkItems: Array<LinkItemProps> = [
    { name: "Home", icon: FiHome, link: AppRoute.Home, tooltip: "Home" },
    {
        name: "Explore",
        icon: FiCompass,
        link: AppRoute.Explore,
        tooltip: "Explore",
    },
    {
        name: "Following",
        icon: FiStar,
        link: AppRoute.Following,
        tooltip: "Following",
    },
    { name: "Test", icon: FiSettings, link: AppRoute.Test, tooltip: "Test" },
];

interface SidebarProps extends BoxProps {
    onToggle: () => void;
    isOpen: boolean;
}

const SidebarContent = ({ onToggle, isOpen, ...rest }: SidebarProps) => {
    return (
        <Box
            borderRight="1px"
            borderRightColor="gray.700"
            w={{ base: "full", md: isOpen ? "15rem" : "5rem" }}
            pos="fixed"
            h="full"
            {...rest}
        >
            <Flex
                h="20"
                alignItems="center"
                mx={4}
                my={2}
                justifyContent="space-between"
                position="relative"
            >
                <Text
                    fontSize="2xl"
                    fontFamily="monospace"
                    fontWeight="bold"
                    opacity={isOpen ? "1" : "0"}
                    transition="0.2s ease-in"
                    position="absolute"
                >
                    Logo
                </Text>
                <Button
                    p="4"
                    mb={2}
                    ml="auto"
                    size="xl"
                    color="white"
                    bg="whiteAlpha.200"
                    borderRadius="lg"
                    justifyContent="start"
                    cursor="pointer"
                    _hover={{ bg: "teal.200", color: "black" }}
                    onClick={onToggle}
                    aria-label="open menu"
                >
                    <Icon
                        fontSize="16"
                        as={FiChevronsLeft}
                        transform={`rotate(${isOpen ? "0deg" : "180deg"})`}
                        transition="opacity 0.2s ease-in, transform 0.2s ease-in"
                    />
                </Button>
            </Flex>

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
        <Box mb={2} mx={4}>
            <Tooltip
                label={link.tooltip}
                openDelay={300}
                offset={[0, 12]}
                placement="right"
                isDisabled={isOpen}
                hasArrow
            >
                <Button
                    bg={
                        location.pathname === link.link
                            ? "teal.200"
                            : "whiteAlpha.200"
                    }
                    color={location.pathname === link.link ? "black" : "white"}
                    size="xl"
                    w="100%"
                    justifyContent="start"
                    p="4"
                    borderRadius="lg"
                    cursor="pointer"
                    _hover={{ bg: "teal.200", color: "black" }}
                    onClick={() => navigate(link.link)}
                    overflowWrap="break-word"
                    overflow="hidden"
                >
                    <Icon mr="4" fontSize="16" as={link.icon} />
                    {children}
                </Button>
            </Tooltip>
        </Box>
    );
};

interface MobileProps extends FlexProps {
    onToggle: () => void;
    isOpen: boolean;
}
const NavHeader = ({ onToggle, isOpen, ...rest }: MobileProps) => {
    return (
        <Flex
            px={{ base: 4, md: 4 }}
            height="20"
            alignItems="center"
            bg={"gray.900"}
            borderBottomWidth="1px"
            borderBottomColor={"gray.700"}
            justifyContent={{ base: "space-between", md: "flex-end" }}
            {...rest}
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
                size="full"
            >
                <DrawerContent>
                    <SidebarContent
                        isOpen={isOpen}
                        onToggle={onToggle}
                        transition="0.4s ease-in-out"
                    />
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
                            fontSize={"sm"}
                            fontWeight={400}
                            variant={"ghost"}
                        >
                            Sign In
                        </Button>
                        <Button
                            display={{ base: "none", md: "inline-flex" }}
                            fontSize={"sm"}
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
        <Box minH="100vh" bg="gray.900">
            <SidebarContent
                isOpen={isOpen}
                onToggle={onToggle}
                display={{ base: "none", md: "block" }}
                transition="0.4s ease-in-out"
            />

            <NavHeader
                isOpen={isOpenMobile}
                onToggle={onToggleMobile}
                transition="0.4s ease-in-out"
                ml={{ base: 0, md: isOpen ? "15rem" : "5rem" }}
            />
            <Box
                ml={{ base: 0, md: isOpen ? "15rem" : "5rem" }}
                p="4"
                transition="0.4s ease-in-out"
            >
                <Outlet />
            </Box>
        </Box>
    );
};

export default SidebarWithHeader;
