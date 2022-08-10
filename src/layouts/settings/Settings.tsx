import {
    Box,
    Container,
    Heading,
    Text,
    Stack,
    Flex,
    FormControl,
    FormLabel,
    HStack,
    Button,
    Input,
    InputGroup, 
    InputRightElement,
    Center,
    IconButton,
    Avatar,
    AvatarBadge,
} from "@chakra-ui/react";


import { ViewIcon, ViewOffIcon, SmallCloseIcon } from '@chakra-ui/icons';
import { FC, useState } from "react";

const Settings: FC = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [value, setValue] = useState()

    return (
        <Container maxW="container.xl">
            <Box mt="5">
                <Heading>Account</Heading>
                <Text fontSize={{ md: '1xl', lg: '2xl' }} color={'white'} >
                        Live streaming video platform
                </Text>{' '}
                <Text fontSize={{ base: 'md', lg: 'lg' }} color={'gray.500'}>
                    Customize and update your account details
                </Text>
            </Box>

            {/* 1st column */}
                <Stack direction={{ base: 'column', md: 'row' }}>
                        <Flex p={8} flex={1}  align={'center'} justify={'center'}>

                        <Stack w={'full'} maxW={'lg'}>
                        <Center>
                            <Avatar size="xl" 
                                src="https://images.unsplash.com/photo-1493666438817-866a91353ca9?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9"
                                >
                                <AvatarBadge
                                as={IconButton}
                                size="sm"
                                rounded="full"
                                top="-10px"
                                colorScheme="red"
                                aria-label="remove Image"
                                icon={<SmallCloseIcon />}
                                />
                            </Avatar>
                        </Center>
                        <Center w="full">
                            <input type="file" accept="image/*" />
                        </Center>
                        </Stack>
                    </Flex>

                {/* 2nd column */}
                <Flex flex={1}>
                <Stack spacing={4}>
                    <HStack>
                    <Box>
                        <FormControl id="username" >
                        <FormLabel>Username</FormLabel>
                        <Input type="text" />
                        </FormControl>
                    </Box>
                    </HStack>
                    <FormControl id="email" >
                        <FormLabel>Email Address</FormLabel>
                        <Input type="email" />
                    </FormControl>

                    
                    <FormControl id="password">
                        <FormLabel>Password</FormLabel>
                        <InputGroup>
                            <Input type={showPassword ? 'text' : 'password'} />
                            <InputRightElement h={'full'}>
                            <Button
                                variant={'ghost'}
                                onClick={() =>
                                setShowPassword((showPassword) => !showPassword)
                                }>
                                {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                            </Button>
                            </InputRightElement>
                        </InputGroup>
                    </FormControl>
                    <Stack spacing={10} pt={2}>
                        <Button
                            loadingText="Submitting"
                            size="lg"
                            bg={'blue.400'}
                            color={'white'}
                            _hover={{
                            bg: 'blue.500',
                            }}>
                            Update
                        </Button>
                    </Stack>
                </Stack>


                </Flex>
            </Stack>

            
        </Container>
    );
};

export default Settings;
