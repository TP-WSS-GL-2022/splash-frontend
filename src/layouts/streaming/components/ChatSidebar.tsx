import { FC, PropsWithChildren } from "react";

import { Button, Flex, Highlight, Input, Text, VStack } from "@chakra-ui/react";
import { Message, Messages, Stream, User } from "../../../models";
import {
    useCollectionData,
    useDocumentDataOnce,
} from "react-firebase-hooks/firestore";
import { DocumentReference, query, where } from "firebase/firestore";

export interface ChatMessageProps {
    authorRef: DocumentReference<User>;
}

export const ChatMessage: FC<PropsWithChildren<ChatMessageProps>> = props => {
    const { authorRef, children: message } = props;

    const [author, isLoadingAuthor] = useDocumentDataOnce(authorRef);

    return (
        <Text mt="1" color="white" textAlign="start" fontSize="sm">
            {author && (
                <Highlight
                    query={author.username}
                    styles={{ fontWeight: "semibold", textColor: "cyan.400" }}
                >
                    {`${author?.username}: `}
                </Highlight>
            )}
            {message}
        </Text>
    );
};

export interface ChatSidebarProps {
    streamRef: DocumentReference<Stream>;
}

const ChatSidebar: FC<ChatSidebarProps> = ({ streamRef }) => {
    const [messages, isLoadingMessages, hasErrorMessages] = useCollectionData(
        query(
            Messages,
            where("streamId", "==", streamRef),
            where("createdAt", ">=", new Date())
        )
    );

    if (!messages || isLoadingMessages) return <></>;

    return (
        <Flex
            w="80"
            direction="column"
            borderLeftWidth="thin"
            borderLeftColor="gray.700"
        >
            <VStack px="4" pb="4" align="start" overflowY="scroll">
                {messages.map(message => (
                    <ChatMessage
                        authorRef={message.authorRef}
                        key={Math.random()}
                    >
                        {message.content}
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
