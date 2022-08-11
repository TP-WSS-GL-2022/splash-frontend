import React from 'react'
import { Box, Avatar, Center, VStack, Heading, Text, Button,useMediaQuery } from '@chakra-ui/react'

const UserProfileCard = () => {

    const [isLargerThan830] = useMediaQuery('(min-width: 830px)')

    return (
        <Box
            w={"100%"}
            bgColor="blackAlpha.300"
            height={80}
            position={'relative'}
            mt={2}

        >

            <Center>
                <Avatar
                    size='2xl'
                    mt={5}
                    name="Dan Abramov"
                    src="https://bit.ly/dan-abramov"
                />
            </Center>
            <VStack align={"center"}>
                <Heading size='2xl' noOfLines={1} maxW='50%'>
                    Dan Abramov
                </Heading>
                <Text noOfLines={3} maxW='50%' fontWeight={'light'}>
                    Streamer Bio Here
                </Text>

                <Text>
                    2.6k Followers
                </Text>

                <Button
                    // sx={{
                    //     'font-size': 'clamp(0.7rem,calc(0.7rem+5vw), 2rem)!important',
                    //     padding: 'calc(clamp(0.5rem,calc(0.7rem+2vw),1rem) / 2) clamp(0.5rem,calc(0.7rem+2vw),1rem) !important'
                    // }}
                    position={isLargerThan830? 'absolute': 'relative'}
                    top={isLargerThan830?3:0}
                    right={isLargerThan830?5:0}
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