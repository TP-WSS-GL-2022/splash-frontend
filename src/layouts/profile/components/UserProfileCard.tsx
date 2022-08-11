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
import { auth } from "../../../util/firebase";
import { UserContext } from "../../../models/User";

const UserProfileCard = () => {
    const user = useContext(UserContext);

    // useEffect(() => {
    //     console.dir(user);
    // }, [user]);

    if (!user) return <></>;

    return (
        <Box
            w="full"
            bgColor="blackAlpha.300"
            height={80}
            position={"relative"}
            mt={6}
            p={6}
        >
            <Button position={"absolute"} top={5} right={5} colorScheme="teal">
                Follow
            </Button>
            <Center>
                <Avatar size="2xl" name={user.username} src={user.photo} />
            </Center>
            <VStack align={"center"}>
                <Heading mt={4} size="2xl" noOfLines={1} maxW="50%">
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

                <Text>{user.followerCount}</Text>
            </VStack>
        </Box>
    );
};

export default UserProfileCard;
