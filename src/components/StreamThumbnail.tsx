import { FC } from "react"
import { useNavigate } from "react-router-dom"

import {
    AspectRatio, Avatar, Badge, Box, Heading, HStack, Image, Text, VStack
} from "@chakra-ui/react"

import { AppRoute } from "../util/routes"

const StreamThumbnail: FC = () => {
    const navigate = useNavigate();

    return (
        <Box
            // use tab key and remove if needed
            tabIndex={0}
            w="72"
            minW="72"
            bgColor="gray.800"
            borderWidth="thin"
            borderColor="gray.700"
            transition="all 0.2s"
            cursor="pointer"
            pos="relative"
            _hover={{
                transform: "scale(1.02)",
                borderColor: "gray.600",
                bgColor: "gray.700",
            }}
            onClick={() => navigate(`${AppRoute.Live}/johndoe`)}
        >
            <LiveIndicator />
            <AspectRatio ratio={16 / 10}>
                <Image
                    draggable={false}
                    src="/assets/stream_placeholder.jpg"
                    w="100%"
                    alt="Video Thumbnail here"
                />
            </AspectRatio>
            <Box p="4">
                <HStack spacing="4" align="center">
                    <Avatar
                        name="Dan Abramov"
                        src="https://bit.ly/dan-abramov"
                    />
                    <VStack align="start">
                        <Heading size="sm" noOfLines={1} color={"white"}>
                            APEX GRIND TO MASTER??!! 24/50 TWITCH AFFLIATE GOAL
                        </Heading>
                        <Text fontSize="md" color={"white"}>
                            mrbongles
                        </Text>
                    </VStack>
                </HStack>
            </Box>
        </Box>
    );
};

const LiveIndicator: FC = () => {
    return (
        <Badge
            px="2"
            pos="absolute"
            left="4"
            top="4"
            zIndex={1}
            bgColor="red.400"
            fontSize="0.9rem"
            borderWidth="1px"
            borderColor="red.300"
            borderRadius="6"
        >
            LIVE
        </Badge>
    );
};

export default StreamThumbnail;
