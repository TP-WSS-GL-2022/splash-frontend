import { FC } from 'react'

import { Box, Divider, Heading, SimpleGrid } from '@chakra-ui/react'

import StreamThumbnail from '../../components/StreamThumbnail'

const Following: FC = () => {
    return (
        <Box p="8">
            <Heading size="xl" color="teal.200">
                Following
            </Heading>

            <Box mt="8">
                <Heading mb="4" size="lg" color="white">
                    Live Broadcasts
                </Heading>
                <SimpleGrid minChildWidth="80" spacing="8">
                    <StreamThumbnail />
                    <StreamThumbnail />
                    <StreamThumbnail />
                    <StreamThumbnail />
                    <StreamThumbnail />
                </SimpleGrid>
            </Box>

            <Divider my="12" opacity="20%" />

            <Box>
                <Heading mb="4" size="lg" color="white">
                    Past Broadcasts
                </Heading>
                <SimpleGrid minChildWidth="80" spacing="8">
                    <StreamThumbnail />
                    <StreamThumbnail />
                    <StreamThumbnail />
                    <StreamThumbnail />
                    <StreamThumbnail />
                    <StreamThumbnail />
                    <StreamThumbnail />
                </SimpleGrid>
            </Box>
        </Box>
    );
};

export default Following;
