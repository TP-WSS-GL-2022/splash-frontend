import React, { useContext, useEffect } from "react";
import {
    Box,
    Avatar,
    Center,
    VStack,
    Heading,
    Button,
    Text,
} from "@chakra-ui/react";
import { UserContext } from "../../../context/UserContext";

const UserProfileCard = () => {
    const user = useContext(UserContext)!;

    return (
        <Box
            w="full"
            bgColor="blackAlpha.300"
            position={"relative"}
            mt="8"
            p="12"
        >
            <Button position={"absolute"} top="5" right="5" colorScheme="teal">
                Follow
            </Button>
            <Center>
                <Avatar size="2xl" name={user.username} src={user.photo} />
            </Center>
            <VStack align={"center"} spacing="4">
                <Heading mt="4" size="2xl" noOfLines={1} maxW="50%">
                    {user.username}
                </Heading>
                <Text
                    fontSize="md"
                    noOfLines={3}
                    maxW="50%"
                    fontWeight={"light"}
                >
                    {user.bio}
                </Text>

                <Text>
                    {user.followerCount} follower
                    {user.followerCount !== 1 && "s"}
                </Text>
            </VStack>
        </Box>
    );
};

export default UserProfileCard;
