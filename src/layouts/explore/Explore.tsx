import { Container, Heading, VStack } from "@chakra-ui/react";
import { FC } from "react";
import RecommendedSmallerChannels from "./components/RecommendedChannels";
import RecommendedStreams from "./components/RecommendedSmallerChannels";
import RecommendedVods from "./components/RecommendedVods";

const Explore: FC = () => {
    return (
        <Container maxW="container.xl" mt={12}>
            <Heading color={"teal.200"}>Explore</Heading>
            <VStack align={"stretch"} gap={8} my={8}>
                <RecommendedStreams />
                <RecommendedVods />
                <RecommendedSmallerChannels />
            </VStack>
        </Container>
    );
};

export default Explore;
