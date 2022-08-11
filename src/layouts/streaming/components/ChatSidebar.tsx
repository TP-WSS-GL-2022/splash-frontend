import { FC, PropsWithChildren } from "react";

import {
    Box,
    Button,
    Flex,
    Highlight,
    Input,
    Spacer,
    Text,
    VStack,
    Wrap,
    WrapItem,
} from "@chakra-ui/react";

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

const ChatSidebar: FC<{}> = () => {
    return (
        <Flex
            w="80"
            justify="space-between"
            direction="column"
            borderLeftWidth="thin"
            borderLeftColor="gray.700"
        >
            <VStack
                px="4"
                pb="4"
                h="full"
                align="start"
                maxH="2xl"
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
