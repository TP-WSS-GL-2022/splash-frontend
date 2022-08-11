import { FC } from "react";
import { Heading, SimpleGrid, Center, Box, Container } from "@chakra-ui/react";
import UserProfileCard from "./components/UserProfileCard";
import StreamThumbnail from "../following/components/StreamThumbnail";
import { UserProvider } from "../../context/UserContext";
const Profile: FC = () => {
    return (
        <Container centerContent maxW="container.xl">
            <SimpleGrid w="50%" flexWrap="wrap">
                <UserProfileCard />
                <Box mt="12">
                    <Heading>Past Broadcast</Heading>
                    <SimpleGrid mt="4   " minChildWidth="72" spacing="4">
                        <StreamThumbnail />
                        <StreamThumbnail />
                        <StreamThumbnail />
                        <StreamThumbnail />
                        <StreamThumbnail />
                    </SimpleGrid>
                </Box>
            </SimpleGrid>
        </Container>
    );
};

export default Profile;
