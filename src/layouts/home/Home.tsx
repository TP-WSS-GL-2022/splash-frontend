import {
    Box,
    Container,
    Flex,
    Heading, IconButton
} from "@chakra-ui/react"
import { FC } from "react"
import { FiArrowLeft, FiArrowRight } from "react-icons/fi"
import CategoryThumbnail from "../../components/CategoryThumbnail"
import StreamThumbnail from "../../components/StreamThumbnail"
import { HeroCarousel } from "./components"

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

            <Box mt="12">
                <Heading>Categories</Heading>
                <Box pos="relative">
                    <IconButton
                        aria-label="Previous recommended category"
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
                        <CategoryThumbnail />
                        <CategoryThumbnail />
                        <CategoryThumbnail />
                        <CategoryThumbnail />
                        <CategoryThumbnail />
                        <CategoryThumbnail />
                        <CategoryThumbnail />
                    </Box>
                    <IconButton
                        aria-label="Next recommended category"
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

            <Box mt="12"></Box>
        </Container>
    );
};

export default Home;
