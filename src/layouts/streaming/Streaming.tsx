import { ReactFlvPlayer } from "@asurraa/react-ts-flv-player";
import { Avatar, Box, Flex, Heading, HStack, VStack } from "@chakra-ui/react";
import { FC } from "react";
import ChatSidebar from "./components/ChatSidebar";

const Streaming: FC<{}> = () => {
    return (
        <>
            <Flex h="full">
                <Flex flex="3" direction="column" overflowY="scroll">
                    <Box minH="2xl">
                        <ReactFlvPlayer
                            url={`http://18.143.74.14:6969/api`}
                            isLive={true}
                        />
                    </Box>
                    <StreamFooter />
                </Flex>
                <ChatSidebar />
            </Flex>
        </>
    );
};

const StreamFooter: FC<{}> = () => {
    return (
        <Box p="6" borderTopWidth="thin" borderTopColor="gray.600">
            <VStack align="start">
                <Heading size="md">
                    apox streaming 49/50 twitch affliate! !lurk
                </Heading>
            </VStack>
            <HStack mt="6" spacing="4">
                <Avatar />
                <Heading size="md">johndoe</Heading>
            </HStack>

            {/* <Heading size="md">
                apox streaming 49/50 twitch affliate! !lurk
            </Heading>
            <Heading size="md">
                apox streaming 49/50 twitch affliate! !lurk
            </Heading>
            <Heading size="md">
                apox streaming 49/50 twitch affliate! !lurk
            </Heading>
            <Heading size="md">
                apox streaming 49/50 twitch affliate! !lurk
            </Heading>
            <Heading size="md">
                apox streaming 49/50 twitch affliate! !lurk
            </Heading>
            <Heading size="md">
                apox streaming 49/50 twitch affliate! !lurk
            </Heading> */}
        </Box>
    );
};

export default Streaming;
