import { FC, PropsWithChildren } from "react";
import { IconType } from "react-icons";
import {
    FiChevronsLeft,
    FiCompass,
    FiHome,
    FiSettings,
    FiStar,
} from "react-icons/fi";
import { useLocation, useNavigate } from "react-router-dom";

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
    Image,
    Stack,
} from "@chakra-ui/react";

import { AppRoute } from "../../../util/routes";

interface SidebarItemProps extends PropsWithChildren<BoxProps> {
    icon: IconType;
    link: AppRoute;
    isSidebarOpen: boolean;
    tooltipLabel: string;
}

const sidebarItems = [
    {
        name: "Home",
        icon: FiHome,
        link: AppRoute.Home,
    },
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
    {
        name: "Test",
        icon: FiSettings,
        link: AppRoute.Test,
    },
];

const SidebarItem: FC<SidebarItemProps> = ({
    link,
    icon,
    children,
    isSidebarOpen,
    tooltipLabel,
}) => {
    const location = useLocation();
    const navigate = useNavigate();
    return (
        <Tooltip
            label={tooltipLabel}
            openDelay={300}
            offset={[0, 12]}
            placement="right"
            isDisabled={isSidebarOpen}
            hasArrow
        >
            <Button
                size="xl"
                w="100%"
                p="4"
                borderRadius="lg"
                justifyContent="start"
                cursor="pointer"
                bg={location.pathname === link ? "teal.200" : "whiteAlpha.200"}
                color={location.pathname === link ? "black" : "white"}
                _hover={{ bg: "teal.200", color: "black" }}
                _active={{ bg: "teal.200", color: "black" }}
                onClick={() => navigate(link)}
                overflowWrap="break-word"
                overflow="hidden"
            >
                <Icon mr="4" fontSize="16" as={icon} />
                {children}
            </Button>
        </Tooltip>
    );
};

interface SidebarProps extends BoxProps {
    open: boolean;
    toggle: () => void;
}

const Sidebar: FC<SidebarProps> = ({ open, toggle, ...rest }) => {
    return (
        <Box
            alignSelf="stretch"
            borderRight="1px"
            borderRightColor="gray.700"
            transition="0.4s ease-in-out"
            w={{ base: "full", md: open ? "15rem" : "5rem" }}
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

                    <Flex
                        alignItems="center"
                        gap={2}
                        opacity={open ? "1" : "0"}
                        transition="0.2s ease-in"
                        overflowWrap="break-word"
                        overflow="hidden"
                    >
                        <Image
                            boxSize={14}
                            objectFit="cover"
                            src="/assets/splash.png"
                        />
                        <Text fontSize="2xl" fontWeight="bold">
                            Splash
                        </Text>
                    </Flex>

                    <IconButton
                        icon={
                            <Icon
                                as={FiChevronsLeft}
                                transform={`rotate(${
                                    open ? "0deg" : "180deg"
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
                        onClick={toggle}
                    />
                </Flex>

                <VStack mt={4} spacing={2}>
                    {sidebarItems.map((item, index) => (
                        <SidebarItem
                            key={index}
                            icon={item.icon}
                            link={item.link}
                            isSidebarOpen={open}
                            tooltipLabel={item.name}
                        >
                            <Text
                                fontSize="md"
                                opacity={open ? "1" : "0"}
                                transition="opacity 0.2s ease-in"
                            >
                                {item.name}
                            </Text>
                        </SidebarItem>
                    ))}
                </VStack>
            </Box>
        </Box>
    );
};

export default Sidebar;
