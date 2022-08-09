import {
    Box,
    Container,
    Flex,
    Heading,
    HStack,
    IconButton,
    VStack,
} from "@chakra-ui/react";
import { FC, useRef } from "react";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";
import { ref } from "yup";
import StreamThumbnail from "../following/components/StreamThumbnail";
import { HeroCarousel } from "./widgets";

const Home: FC = () => {
    return (
        <Container maxW="container.xl">
            <Box mt="12">
                <Heading>Recommended Streams</Heading>
                <Flex justify="center" mt="8">
                    <HeroCarousel />
                </Flex>
            </Box>

            <Box mt="12">
                <Heading>Popular Live Channels</Heading>
                <Box pos="relative">
                    <IconButton
                        aria-label="Previous recommended stream"
                        h="100%"
                        pos="absolute"
                        top="50%"
                        left="-14"
                        zIndex="overlay"
                        bgColor="transparent"
                        transform="translateY(-50%)"
                        fontSize="2xl"
                        _hover={{
                            bgColor: "whiteAlpha.50",
                        }}
                    >
                        <FiArrowLeft />
                    </IconButton>
                    <Box
                        w="full"
                        display="flex"
                        gap="6"
                        mt="6"
                        overflowX="scroll"
                        overflowY="hidden"
                        pos="relative"
                        className="invis-scrollbar"
                    >
                        <StreamThumbnail />
                        <StreamThumbnail />
                        <StreamThumbnail />
                        <StreamThumbnail />
                        <StreamThumbnail />
                    </Box>
                    <IconButton
                        aria-label="Next recommended stream"
                        h="100%"
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
        </Container>
    );
};

export default Home;
