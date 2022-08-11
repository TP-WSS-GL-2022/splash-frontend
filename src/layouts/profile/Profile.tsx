import { FC } from "react";
import { Heading, SimpleGrid, Center } from "@chakra-ui/react";
import UserProfileCard from "./components/UserProfileCard";
import StreamThumbnail from "../following/components/StreamThumbnail";
import { UserProvider } from "../../context/UserContext";
const Profile: FC = () => {
    return (
        <UserProvider>
            <Center>
                <SimpleGrid w={"50%"} flexWrap="wrap">
                    <UserProfileCard />
                    <Heading>Past Broadcast</Heading>
                    <SimpleGrid minChildWidth="72" spacing="4">
                        <StreamThumbnail />
                        <StreamThumbnail />
                        <StreamThumbnail />
                        <StreamThumbnail />
                        <StreamThumbnail />
                    </SimpleGrid>
                </SimpleGrid>
            </Center>
        </UserProvider>
    );
};

export default Profile;
