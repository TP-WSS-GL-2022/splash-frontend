import { Box, IconButton, HStack, Text, chakra } from "@chakra-ui/react";
import { query, where } from "firebase/firestore";
import _ from "lodash";
import { useCollection } from "react-firebase-hooks/firestore";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";
import ProfileThumbnail from "../../../components/ProfileThumbnail";
import { User, Users } from "../../../models";

const RecommendedSmallerChannels = () => {
    const userSnap = useCollection(
        query(Users, where("followerCount", "<", 50))
    )[0]?.docs;

    const docs = userSnap?.map(snap => snap.data());
    const users = _.sampleSize(docs, 5);
    return (
        <Box>
            <Text fontSize={20}>
                Recommended smaller{" "}
                <chakra.span color="teal.200">channels</chakra.span>
            </Text>
            <HStack
                mt={4}
                gap={8}
                pos="relative"
                overflowY="hidden"
                className="invis-scrollbar"
            >
                {userSnap
                    ? users?.map((snap, index) => (
                          <ProfileThumbnail user={snap as User} key={index} />
                      ))
                    : "Loading..."}
            </HStack>
        </Box>
    );
};

export default RecommendedSmallerChannels;
