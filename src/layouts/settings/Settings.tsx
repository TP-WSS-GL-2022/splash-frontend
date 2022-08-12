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
    useColorModeValue,
    Image,
} from "@chakra-ui/react";

import { ViewIcon, ViewOffIcon, SmallCloseIcon } from "@chakra-ui/icons";
import { FC, useContext, useState, useRef } from "react";
import { UserContext } from "../../context/UserContext";
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { storage } from "../../util/firebase";
import { ref, uploadBytes , getStorage, getDownloadURL } from "firebase/storage";
import { v4 as uuidv4 } from "uuid";

interface SettingsData {
    photo: string | null;
    bio: string;
    username: string;
}

const Settings: FC = () => {
    const user = useContext(UserContext)!;
    const inputRef = useRef<HTMLInputElement>(null);
    const [imageUpload, setImageUpload] = useState<File | null>(null);
    const [showPassword, setShowPassword] = useState(false);
    const [value, setValue] = useState();

    const storage = getStorage();

    const handleSubmit = async  (values: SettingsData) => {
        const photoref = ref(storage, `images/${imageUpload?.name + uuidv4()}`);
        uploadBytes(photoref, imageUpload!).then(() => {
            alert("Image Uploaded");
        });

        const photourl = await getDownloadURL(photoref);


        
        const formData = {
            photo: photourl,
            username:
                values.username.trim().length == 0
                    ? null
                    : values.username.trim(),
            bio: values.bio.trim(),
        };

        

        
    };
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
                <Formik
                    initialValues={{
                        photo: user.photo ?? null,
                        username: user.username,
                        bio: user.bio,
                    }}
                    validationSchema={EditProfileSchema}
                    onSubmit={handleSubmit}
                >
                    {({
                        values,
                        errors,
                        handleChange,
                        handleBlur,
                        setFieldValue,
                    }) => {
                        return (
                            <Form>
                                <Flex
                                    p={10}
                                    flex={1}
                                    align={"center"}
                                    justify={"center"}
                                >
                                    <Stack w={"full"} maxW={"lg"}>
                                        <Center>
                                            {values.photo ? (
                                                <Avatar
                                                    border={useColorModeValue(
                                                        "4px solid white",
                                                        "4px solid var(--chakra-colors-gray-700)"
                                                    )}
                                                    size={"2xl"}
                                                >
                                                    <Image
                                                        borderRadius="full"
                                                        boxSize="full"
                                                        src={values.photo}
                                                    />
                                                </Avatar>
                                            ) : (
                                                <Avatar
                                                    border={useColorModeValue(
                                                        "4px solid white",
                                                        "4px solid var(--chakra-colors-gray-700)"
                                                    )}
                                                    size={"2xl"}
                                                />
                                            )}
                                        </Center>
                                        <Center>
                                            <input
                                                type="file"
                                                accept="image/png, image/jpeg, image/jpg"
                                                name={"photo"}
                                                ref={inputRef}
                                                style={{ display: "none" }}
                                                onChange={e => {
                                                    let fileList =
                                                        e.target.files!;

                                                    setImageUpload(
                                                        fileList[0]!
                                                    );
                                                    if (fileList) {
                                                        var reader =
                                                            new FileReader();

                                                        reader.addEventListener(
                                                            "load",
                                                            event => {
                                                                setFieldValue(
                                                                    "photo",
                                                                    event.target
                                                                        ?.result
                                                                );
                                                            }
                                                        );

                                                        reader.readAsDataURL(
                                                            fileList[0]!
                                                        );
                                                    } else {
                                                        setFieldValue(
                                                            "photo",
                                                            null
                                                        );
                                                    }
                                                }}
                                            />
                                            <Button
                                                mt={4}
                                                w="32"
                                                onClick={() =>
                                                    inputRef.current?.click()
                                                }
                                            >
                                                Select Picture
                                            </Button>
                                        </Center>
                                    </Stack>
                                </Flex>

                                {/* 2nd column */}
                                <Flex flex={1}>
                                    <Stack spacing={5}>
                                        <HStack>
                                            <Box>
                                                <FormControl id="username">
                                                    <FormLabel>
                                                        Username
                                                    </FormLabel>
                                                    <Field
                                                        as={Input}
                                                        id="username"
                                                        name="username"
                                                        variant="filled"
                                                        autoComplete="none"
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                    />
                                                </FormControl>
                                            </Box>
                                        </HStack>
                                        <FormControl id="bio">
                                            <FormLabel htmlFor="bio">
                                                Bio
                                            </FormLabel>
                                            <Field
                                                as={Input}
                                                id="bio"
                                                name="bio"
                                                variant="filled"
                                                autoComplete="none"
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                            />
                                        </FormControl>

                                        <Stack spacing={10} pt={2}>
                                            <Button
                                                type="submit"
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
                            </Form>
                        );
                    }}
                </Formik>
            </Stack>
        </Container>
    );
};

const EditProfileSchema = Yup.object({
    username: Yup.string()
        .max(48, "Must be 48 characters or less")
        .required("Username is required"),
    bio: Yup.string().required("Bio is required"),
});

export default Settings;
