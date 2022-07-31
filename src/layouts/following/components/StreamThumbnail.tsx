import { FC } from 'react';

import { AspectRatio, Avatar, Box, Heading, HStack, Image, Text, VStack } from '@chakra-ui/react';

import placeholderStream from './placeholder_stream.jpg';

const StreamThumbnail: FC = () => {
    return (
        <Box
            // use tab key and remove if needed
            tabIndex={0}
            maxW="inherit"
            bgColor="gray.800"
            borderWidth="thin"
            borderColor="gray.700"
            transition="all 0.2s"
            cursor="pointer"
            _hover={{
                transform: "scale(1.02)",
                borderColor: "gray.600",
                bgColor: "gray.700",
            }}
        >
            <AspectRatio ratio={16 / 10}>
                <Image
                    draggable={false}
                    src={placeholderStream}
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

export default StreamThumbnail;
