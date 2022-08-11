import React from 'react'
import { Box, Avatar, Center, VStack, Heading, Text, Button } from '@chakra-ui/react'

const UserProfileCard = () => {
    return (
        <Box
            w={"100%"}
            bgColor="blackAlpha.300"
            height={80}
            position={'relative'}
            mt={2}
        >
            <Button position={'absolute'}
                top={5}
                right={5}
                colorScheme='teal'
                >
                Follow
            </Button>
            <Center>
                <Avatar
                    size='2xl'
                    mt={5}
                    name="Dan Abramov"
                    src="https://bit.ly/dan-abramov"
                />
            </Center>
            <VStack align={"center"}>
                <Heading as='h2' size='2xl' noOfLines={1} maxW='50%'>
                    Dan Abramov
                </Heading>
                <Text fontSize='md' noOfLines={3} maxW='50%' fontWeight={'light'}>
                    Streamer Bio Here
                </Text>

                <Text>
                    2.6k Followers
                </Text>

            </VStack>
        </Box>
    )
}

export default UserProfileCard