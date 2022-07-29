import React from "react";
import {
    Box,
    Image,
    Avatar,
    Heading,
    Text,
    Stack,
    AspectRatio,
} from "@chakra-ui/react";
import Video from "./video.jpg";

const StreamCard = () => {
    return (
        <Box maxW="sm" borderRadius="lg" overflow="hidden">
            <AspectRatio ratio={16 / 10}>
                <Image src={Video} alt="Video image here" />
            </AspectRatio>
            <Box display="flex" alignItems="topline" mt={2}>
                <Avatar name="Dan Abrahmov" src="https://bit.ly/dan-abramov" />
                <Stack spacing={0.4}>
                    <Heading as="h5" size="sm" color={"white"} ml={1}>
                        Stream Name
                    </Heading>
                    <Text fontSize="sm" color={"white"} pl={1}>
                        Streamer Name
                    </Text>
                </Stack>
            </Box>
        </Box>
    );
};

export default StreamCard;
