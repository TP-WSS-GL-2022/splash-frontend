import { FC, PropsWithChildren } from "react"

import { Button, Flex, Highlight, Input, Text, VStack } from "@chakra-ui/react";
import { Message, Messages, Stream } from "../../../models";
import {
    useCollection,
    useCollectionData,
} from "react-firebase-hooks/firestore";
import { DocumentReference, query, where } from "firebase/firestore";

export interface ChatMessageProps {
    // author: User ??
    authorName: string; // temp
}

export const ChatMessage: FC<PropsWithChildren<ChatMessageProps>> = props => {
    const { authorName, children: message } = props;

    return (
        <Text mt="1" color="white" textAlign="start" fontSize="sm">
            <Highlight
                query={authorName}
                styles={{ fontWeight: "semibold", textColor: "cyan.400" }}
            >
                {`${authorName}: `}
            </Highlight>
            {message}
        </Text>
    );
};

const messages = Array(40).fill(null);

export interface ChatSidebarProps {
    streamRef: DocumentReference<Stream>;
}

const ChatSidebar: FC<ChatSidebarProps> = ({ streamRef }) => {
    const [messages, isLoadingMessages, hasErrorMessages] = useCollectionData(
        query(Messages, where("streamId", "==", streamRef))
    );

    if (!messages || isLoadingMessages) return <></>;

    return (
        <Flex
            w="80"
            direction="column"
            borderLeftWidth="thin"
            borderLeftColor="gray.700"
        >
            <VStack
                px="4"
                pb="4"
                align="start"
                overflowY="scroll"
            >
                {messages.map(_ => (
                    <ChatMessage authorName="johndoe" key={Math.random()}>
                        Hello world!
                    </ChatMessage>
                ))}
            </VStack>
            <VStack
                p="4"
                align="end"
                borderTopWidth="thin"
                borderTopColor="gray.700"
            >
                <Input
                    bg="gray.800"
                    borderColor="gray.700"
                    focusBorderColor="gray.600"
                />
                <Button
                    alignSelf="end"
                    size="sm"
                    bgColor="teal.400"
                    _hover={{ bgColor: "teal.300" }}
                    _active={{ bgColor: "teal.500" }}
                    textColor="white"
                >
                    Chat
                </Button>
            </VStack>
        </Flex>
    );
};

export default ChatSidebar;
