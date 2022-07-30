import {
    Box,
    BoxProps,
    Button,
    Flex,
    Icon,
    IconButton,
    Text,
    Tooltip,
    VStack,
} from "@chakra-ui/react";
import { ReactNode } from "react";
import { IconType } from "react-icons";
import {
    FiChevronsLeft,
    FiCompass,
    FiHome,
    FiSettings,
    FiStar,
} from "react-icons/fi";
import { useLocation, useNavigate } from "react-router-dom";
import { AppRoute } from "../../../util/routes";

interface LinkItemProps {
    name: string;
    icon: IconType;
    link: string;
}

const LinkItems: Array<LinkItemProps> = [
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

interface NavItemProps {
    children: ReactNode;
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

export default SidebarContent;
