import {
    Avatar,
    Box,
    Image,
    Container,
    Text,
    useColorModeValue,
    VStack,
} from "@chakra-ui/react";
import { FC } from "react";
import { User } from "../models";

const ProfileThumbnail: FC<{ user: User }> = ({ user }) => {
    return (
        <Container
            my={2}
            p={8}
            rounded={"lg"}
            boxShadow={"lg"}
            bg={useColorModeValue("white", "gray.800")}
            transition="all 0.2s"
            borderWidth="thin"
            borderColor="gray.700"
            _hover={{
                transform: "scale(1.02)",
                borderColor: "gray.600",
                bgColor: "gray.700",
            }}
        >
            <VStack>
                <Avatar
                    border={useColorModeValue(
                        "4px solid white",
                        "4px solid var(--chakra-colors-gray-700)"
                    )}
                    size={"xl"}
                >
                    {user.photo && (
                        <Image
                            borderRadius="full"
                            boxSize="full"
                            src={user.photo}
                        />
                    )}
                </Avatar>
                <Text>{user.username}</Text>
                <Text>{user.followerCount} followers</Text>
            </VStack>
        </Container>
    );
};

export default ProfileThumbnail;
