import { Box, IconButton, HStack, Text, chakra } from "@chakra-ui/react";
import { query, where } from "firebase/firestore";
import _ from "lodash";
import { useCollection } from "react-firebase-hooks/firestore";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";
import StreamThumbnail from "../../../components/StreamThumbnail";
import { Streams } from "../../../models";

const RecommendedStreams = () => {
    const streamSnap = useCollection(
        query(
            Streams,
            where("endedAt", "==", null),
            where("startedAt", "!=", null)
        )
    )[0]?.docs;

    const docs = streamSnap?.map(snap => snap.data());
    console.log(docs);
    const streams = docs
        ? _.sampleSize(docs, docs!.length > 5 ? 5 : docs!.length)
        : null;

    return (
        <Box>
            <Text fontSize={20}>
                <chakra.span color="teal.200">Streams</chakra.span> we think
                you'll like
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
                    {streams?.map(stream => (
                        <StreamThumbnail />
                    ))}
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

export default RecommendedStreams;
