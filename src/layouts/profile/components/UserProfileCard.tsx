import React from 'react'
import { Box, Avatar, Center, VStack, Heading, Text, Button, useMediaQuery } from '@chakra-ui/react'

const UserProfileCard = () => {

    const [isLargerThan830] = useMediaQuery('(min-width: 830px)')

    return (
        <Box
            w={"100%"}
            bgColor="blackAlpha.300"
            minHeight={80}
            position={'relative'}
            mt={2}
            marginBottom={5}
        >

            <Center>
                <Avatar
                    size='2xl'
                    mt={5}
                    name="Dan Abramov"
                    src="https://bit.ly/dan-abramov"
                />
            </Center>
            <VStack align={"center"} paddingBottom={3}>
                <Heading size={isLargerThan830 ? '2xl' : 'xl'}  >
                    Dan Abramov
                </Heading>
                <Text>
                    2.6k Followers
                </Text>
                <Text maxW={'80%'} >
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Et, eius ex? Quos in nam neque dolor a eaque, quam aut dicta quasi nobis aliquid corporis laborum rem explicabo eveniet! Voluptate.
                </Text>
                <Button
                    position={isLargerThan830 ? 'absolute' : 'relative'}
                    top={isLargerThan830 ? 3 : 0}
                    right={isLargerThan830 ? 5 : 0}
                    minWidth={'1rem'}
                    colorScheme='teal'
                >
                    Follow
                </Button>
            </VStack>
        </Box>
    )
}

export default UserProfileCard