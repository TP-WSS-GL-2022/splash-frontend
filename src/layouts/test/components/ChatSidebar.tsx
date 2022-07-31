import { FC, PropsWithChildren } from 'react';

import { Button, Flex, Highlight, Input, Spacer, Text, VStack } from '@chakra-ui/react';

export interface ChatMessageProps {
    // author: User ??
    authorName: string; // temp
}

export const ChatMessage: FC<PropsWithChildren<ChatMessageProps>> = props => {
    const { authorName, children: message } = props;

    return (
        <Text color="white" textAlign="start" fontSize="sm">
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

const ChatSidebar: FC = () => {
    return (
        <Flex
            direction="column"
            p="4"
            h="full"
            w="22rem"
            right="0"
            borderLeft="1px"
            borderLeftColor="gray.700"
        >
            <VStack align="start" overflowY="scroll">
                <ChatMessage authorName="shockch4rge">Hello world!</ChatMessage>
                <ChatMessage authorName="fucker123">Deez nuts</ChatMessage>
                <ChatMessage authorName="isuckzechballs">
                    His balls are delicious!
                </ChatMessage>
            </VStack>
            <Spacer />
            <VStack align="end">
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
