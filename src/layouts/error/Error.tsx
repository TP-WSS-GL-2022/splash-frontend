import { FC } from 'react';

import { Box, Center, Text } from '@chakra-ui/react';

const Error: FC = () => {
    return (
        <Center h="100vh">
            <Text fontSize="xl" fontWeight="bold">
                404
            </Text>
            <Box m={4} w={0.5} h="3rem" bg="white" />
            <Text>This page is still under construction</Text>
        </Center>
    );
};

export default Error;
