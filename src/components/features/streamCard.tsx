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
        <Box>
            <AspectRatio ratio={16 / 10}>
                {/* Use Video Thumbnail */}
                <Image src={Video} w="100%" alt="Video Thumbnail here" />
            </AspectRatio>
            <Box display="flex" alignItems="topline" mt={2}>
                {/* Streamer Avatar */}
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
