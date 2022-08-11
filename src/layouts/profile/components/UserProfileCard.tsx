import React, { useContext, useEffect } from "react";
import {
    Box,
    Avatar,
    Center,
    VStack,
    Heading,
    Button,
    Text,
    useMediaQuery
} from "@chakra-ui/react";
import { UserContext } from "../../../context/UserContext";

const UserProfileCard = () => {
    const user = useContext(UserContext)!;

    const [isLargerThan830] = useMediaQuery('(min-width: 830px)')

    return (
        <Box
            w="full"
            bgColor="blackAlpha.300"
            position={"relative"}
            mt="8"
            p="12"
        >
            <Center>
                <Avatar size="2xl" name={user.username} src={user.photo} />
            </Center>
            <VStack align={"center"} spacing="4">
                <Heading mt="4" size={isLargerThan830 ? '2xl' : 'xl'}  >
                    {user.username}
                </Heading>
                <Text
                    fontSize="md"
                    noOfLines={3}
                    maxW="80%"
                    fontWeight={"light"}
                >
                    {user.bio}
                </Text>

                <Text>
                    {user.followerCount} follower
                    {user.followerCount !== 1 && "s"}
                </Text>

                <Button
                    position={isLargerThan830? 'absolute': 'relative'}
                    top={isLargerThan830?3:0}
                    right={isLargerThan830?5:0}
                    minWidth={'1rem'}
                    colorScheme='teal'
                >
                    Follow
                </Button>
            </VStack>
        </Box>
    );
};

export default UserProfileCard;
