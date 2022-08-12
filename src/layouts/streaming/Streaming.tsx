import { doc, query, where } from "firebase/firestore"
import { FC } from "react"
import { useCollection, useDocumentData } from "react-firebase-hooks/firestore"
import { FiPlay } from "react-icons/fi"
import { useParams } from "react-router-dom"

import {
    Avatar, Box, Center, Flex, Heading, HStack, IconButton, useBoolean, VStack
} from "@chakra-ui/react"

import FlvPlayer from "../../components/FlvPlayer"
import { Streams, Users } from "../../models"
import ChatSidebar from "./components/ChatSidebar"

const Streaming: FC<{}> = () => {
    const userId = useParams().userId!;

    const [clicked, setClicked] = useBoolean();
    const [user] = useDocumentData(doc(Users, userId ?? "-"));
    const streamSnap = useCollection(
        query(
            Streams,
            where("streamer", "==", doc(Users, userId ?? "-")),
            where("endedAt", "==", null),
            where("startedAt", "!=", null)
        )
    )[0]?.docs[0];

    return (
        <>
            <Flex h="full">
                <Flex flex="3" direction="column" overflowY="scroll">
                    {clicked ? (
                        <FlvPlayer
                            width="800px"
                            height="450px"
                            userId={userId ?? "-"}
                        />
                    ) : (
                        <Center width="800px" height="450px">
                            <IconButton
                                aria-label="Play"
                                onClick={setClicked.on}
                            >
                                <FiPlay />
                            </IconButton>
                        </Center>
                    )}
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
                    </Box>
                </Flex>
                <ChatSidebar streamRef={streamSnap?.ref} />
            </Flex>
        </>
    );
};

export default Streaming;
