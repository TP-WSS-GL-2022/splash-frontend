import { Box, chakra, HStack, IconButton, Text } from "@chakra-ui/react";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";
import StreamThumbnail from "../../../components/StreamThumbnail";

const RecommendedVods = () => {
    return (
        <Box>
            <Text fontSize={20}>
                <chakra.span color="teal.200">Vods</chakra.span> we think you'll
                like
            </Text>
            <Box pos="relative" mt={4}>
                <IconButton
                    aria-label="Previous recommended category"
                    pos="absolute"
                    top="50%"
                    transform="translateY(-50%)"
                    left="-14"
                    zIndex="overlay"
                    bgColor="transparent"
                    fontSize="2xl"
                    _hover={{
                        bgColor: "whiteAlpha.50",
                    }}
                >
                    <FiArrowLeft />
                </IconButton>
                <HStack
                    gap={8}
                    pos="relative"
                    overflowY="hidden"
                    className="invis-scrollbar"
                >
                    <StreamThumbnail />
                    <StreamThumbnail />
                    <StreamThumbnail />
                    <StreamThumbnail />
                    <StreamThumbnail />
                    <StreamThumbnail />
                    <StreamThumbnail />
                    <StreamThumbnail />
                    <StreamThumbnail />
                    <StreamThumbnail />
                </HStack>
                <IconButton
                    aria-label="Next recommended category"
                    pos="absolute"
                    top="50%"
                    right="-14"
                    zIndex="overlay"
                    bgColor="transparent"
                    transform="translateY(-50%)"
                    fontSize="2xl"
                    _hover={{
                        bgColor: "whiteAlpha.50",
                    }}
                >
                    <FiArrowRight />
                </IconButton>
            </Box>
        </Box>
    );
};

export default RecommendedVods;