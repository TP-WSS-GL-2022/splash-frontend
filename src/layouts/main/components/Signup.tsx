import { FC } from 'react';

import { Flex, Heading, Input, Button } from '@chakra-ui/react';

const Signup: FC = () => {
    return (
        <Flex height="80vh" alignItems="center" justifyContent="center">
            <Flex direction='column' bg="whiteAlpha.200" p={12} rounded={6}>
                <Heading mb={6}>Signup</Heading>
                <Input placeholder = "example@gmail.com" variant="filled" mb={3} type="email"/>
                <Input placeholder = "password" variant="filled" mb={3} type="password"/>
                <Input placeholder = "confirm password" variant="filled" mb={6} type="password"/>
                <Button color="teal.200">Signup</Button>
            </Flex>
        </Flex>
    );
};

export default Signup;