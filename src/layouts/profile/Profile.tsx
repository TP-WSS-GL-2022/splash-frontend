import { FC } from "react";
<<<<<<< HEAD
import { Heading, SimpleGrid, Center } from "@chakra-ui/react";
import UserProfileCard from "./components/UserProfileCard";
import StreamThumbnail from "../following/components/StreamThumbnail";
const Profile: FC = () => {
    return (
        <Center>

            <SimpleGrid w={"50%"} flexWrap="wrap" >
                <UserProfileCard></UserProfileCard>
                <Heading>
                    Past Broadcast
                </Heading>
                <SimpleGrid minChildWidth="80" spacing="8">
                    <StreamThumbnail />
                    <StreamThumbnail />
                    <StreamThumbnail />
                    <StreamThumbnail />
                    <StreamThumbnail />
                </SimpleGrid>
            </SimpleGrid>
        </Center>
=======

import {
    Heading,
    Avatar,
    Box,
    Center,
    Text,
    Stack,
    Link,
    Badge,
    useColorModeValue,
    Flex,
    StatLabel,
    StatNumber
  } from '@chakra-ui/react';


const Profile: FC = () => {
    return (
        <Center py={6}>
        <Box
          maxW={'1000px'}
          w={'full'}
          bg={useColorModeValue('white', 'gray.900')}
          boxShadow={'2xl'}
          rounded={'lg'}
          p={6}
          textAlign={'center'}>
          <Avatar
            size={'xl'}
            src={
              'https://images.unsplash.com/photo-1520810627419-35e362c5dc07?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&ixid=eyJhcHBfaWQiOjE3Nzg0fQ'
            }
            mb={4}
            pos={'relative'}
            _after={{
              content: '""',
              w: 4,
              h: 4,
              bg: 'green.300',
              border: '2px solid white',
              rounded: 'full',
              pos: 'absolute',
              bottom: 0,
              right: 3,
            }}
          />
          <Heading fontSize={'2xl'} fontFamily={'body'}>
            Lindsey James
          </Heading>
          <Text fontWeight={600} color={'gray.500'} mb={4}>
            @lindsey_jam3s
          </Text>
          <Text
            textAlign={'center'}
            color={useColorModeValue('gray.700', 'gray.400')}
            px={3}>
            Actress, musician, songwriter and artist. PM for work inquires or{' '}
            <Link href={'#'} color={'blue.400'}>
              #tag
            </Link>{' '}
            me in your posts
          </Text>
  
          <Stack align={'center'} justify={'center'} direction={'row'} mt={6}>
            <Badge
              px={2}
              py={1}
              bg={useColorModeValue('gray.50', 'gray.800')}
              fontWeight={'400'}>
              #art
            </Badge>
            <Badge
              px={2}
              py={1}
              bg={useColorModeValue('gray.50', 'gray.800')}
              fontWeight={'400'}>
              #photography
            </Badge>
            <Badge
              px={2}
              py={1}
              bg={useColorModeValue('gray.50', 'gray.800')}
              fontWeight={'400'}>
              #music
            </Badge>
          </Stack>
        </Box>
      </Center>
>>>>>>> main
    );
};

export default Profile;
