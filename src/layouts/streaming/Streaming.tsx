import { FC } from "react"
import { FiPlay } from "react-icons/fi"
import { useParams } from "react-router-dom"

import {
    Avatar, Box, Center, Flex, Heading, HStack, IconButton, useBoolean, VStack
} from "@chakra-ui/react"

import FlvPlayer from "../../components/FlvPlayer"
import ChatSidebar from "./components/ChatSidebar"

const Streaming: FC<{}> = () => {
    const userId = useParams().userId!;

    const [clicked, setClicked] = useBoolean();

    return (
        <>
            <Flex h="full">
                <Flex flex="3" direction="column" overflowY="scroll">
                    {clicked ? (
                        <FlvPlayer
                            width="800px"
                            height="450px"
                            userId={userId}
                        />
                    ) : (
                        <Center
                            width="800px"
                            height="450px"
                            onClick={setClicked.on}
                        >
                            <IconButton
                                aria-label="Play"
                                icon={<FiPlay />}
                            ></IconButton>
                        </Center>
                    )}
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
