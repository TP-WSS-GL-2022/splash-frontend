import { FC } from "react";
import { Heading, SimpleGrid, Center } from "@chakra-ui/react";
import UserProfileCard from "./components/UserProfileCard";
import StreamThumbnail from "../following/components/StreamThumbnail";
const Profile: FC = () => {
    return (
        <Center>

            <SimpleGrid w={"50%"} flexWrap="wrap" >
                <UserProfileCard></UserProfileCard>
                <Heading>
                    Past Broadcast
                </Heading>
                <SimpleGrid minChildWidth="80" spacing="8">
                    <StreamThumbnail />
                    <StreamThumbnail />
                    <StreamThumbnail />
                    <StreamThumbnail />
                    <StreamThumbnail />
                </SimpleGrid>
            </SimpleGrid>
        </Center>
    );
};

export default Profile;
