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

import { ViewIcon, ViewOffIcon, SmallCloseIcon } from "@chakra-ui/icons";
import { FC, useContext, useState } from "react";
import { UserContext } from "../../context/UserContext";

const Settings: FC = () => {
    const user = useContext(UserContext)!;
    const [showPassword, setShowPassword] = useState(false);
    const [value, setValue] = useState();

    return (
        <Container maxW="container.xl">
            <Box mt="5">
                <Heading>Account</Heading>
                <Text
                    mt="2"
                    fontSize={{ base: "md", lg: "lg" }}
                    color={"gray.500"}
                >
                    Customize and update your account details
                </Text>
            </Box>

            {/* 1st column */}
            <Stack direction={{ base: "column", md: "row" }}>
                <Flex p={10} flex={1} align={"center"} justify={"center"}>
                    <Stack w={"full"} maxW={"lg"}>
                        <Center>
                            <Avatar size="2xl" src={user.photo}>
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
                        <Center>
                            <input type="file" accept="image/*" />
                        </Center>
                    </Stack>
                </Flex>

                {/* 2nd column */}
                <Flex flex={1}>
                    <Stack spacing={5}>
                        <HStack>
                            <Box>
                                <FormControl id="username">
                                    <FormLabel>Username</FormLabel>
                                    <Input type="text" />
                                </FormControl>
                            </Box>
                        </HStack>
                        <FormControl id="email">
                            <FormLabel>Email Address</FormLabel>
                            <Input type="email" />
                        </FormControl>

                        <FormControl id="password">
                            <FormLabel>Password</FormLabel>
                            <InputGroup>
                                <Input
                                    type={showPassword ? "text" : "password"}
                                />
                                <InputRightElement h={"full"}>
                                    <Button
                                        variant={"ghost"}
                                        onClick={() =>
                                            setShowPassword(
                                                showPassword => !showPassword
                                            )
                                        }
                                    >
                                        {showPassword ? (
                                            <ViewIcon />
                                        ) : (
                                            <ViewOffIcon />
                                        )}
                                    </Button>
                                </InputRightElement>
                            </InputGroup>
                        </FormControl>
                        <Stack spacing={10} pt={2}>
                            <Button
                                loadingText="Submitting"
                                size="lg"
                                bg={"blue.400"}
                                color={"white"}
                                _hover={{
                                    bg: "blue.500",
                                }}
                            >
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
