import { FC } from "react";
import { Heading, SimpleGrid, Center } from "@chakra-ui/react";
import UserProfileCard from "./components/UserProfileCard";
import StreamThumbnail from "../following/components/StreamThumbnail";
const Profile: FC = () => {
    return (
        <Center>
            <SimpleGrid w={"50%"} flexWrap="wrap" >
                <UserProfileCard/>
                <Heading>
                    Past Broadcast
                </Heading>
                <SimpleGrid minChildWidth="72" spacing="4">
                    <StreamThumbnail />
                    <StreamThumbnail />
                    <StreamThumbnail />
                    <StreamThumbnail />
                    <StreamThumbnail />
                </SimpleGrid>
            </SimpleGrid>
        </Center>
    );
}

export default Profile
