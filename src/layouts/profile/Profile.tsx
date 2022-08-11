import { Box, Container, Heading, SimpleGrid } from "@chakra-ui/react"
import { FC } from "react"
import StreamThumbnail from "../../components/StreamThumbnail"
import UserProfileCard from "./components/UserProfileCard"
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
