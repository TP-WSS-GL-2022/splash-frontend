import {
    Alert,
    AlertIcon,
    AlertTitle,
    Button,
    Center,
    Checkbox,
    Divider,
    Flex,
    FormControl,
    FormErrorMessage,
    FormLabel,
    Input,
    InputGroup,
    InputRightElement,
    Stack,
    Text,
} from "@chakra-ui/react";
import {
    GoogleAuthProvider,
    signInWithEmailAndPassword,
    signInWithPopup,
} from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { Field, Form, Formik } from "formik";
import { useEffect, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { Link } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { auth, fs } from "../../../../util/firebase";

export enum ErrorResponse {
    default = "Login attempt was unsuccessful",
    credential_already_in_use = "This email is connected to another service",
    user_disabled = "Email has been disabled",
}

interface LoginData {
    email: string;
    password: string;
    stay: boolean;
}

interface SignInProps {
    onClose: () => void;
    yupSchema: any;
}

const SignIn = ({ onClose, yupSchema }: SignInProps) => {
    const [showError, setShowError] = useState({
        open: false,
        text: ErrorResponse.default,
    });
    const [showPW, setShowPW] = useState(false);

    useEffect(() => {
        if (showError.open) {
            setTimeout(() => {
                setShowError({
                    ...showError,
                    open: false,
                });
            }, 3000);
        }
    }, [showError.open]);

    const loginSubmit = (values: LoginData) => {
        const formData = {
            stay: values.stay,
            email: values.email.trim(),
            password: values.password.trim(),
        };
        signInWithEmailAndPassword(auth, formData.email, formData.password)
            .then(onClose)
            .catch(({ code }) => {
                switch (code) {
                    case "auth/credential-already-in-use":
                        setShowError({
                            open: true,
                            text: ErrorResponse.credential_already_in_use,
                        });
                        break;
                    case "auth/user-disabled":
                        setShowError({
                            open: true,
                            text: ErrorResponse.user_disabled,
                        });
                        break;
                    default:
                        setShowError({
                            open: true,
                            text: ErrorResponse.default,
                        });
                        break;
                }
            });
    };

    const handleGoogle = async () => {
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider)
            .then(async ({ user }) => {
                const userDoc = await getDoc(doc(fs, "users", user.uid));
                if (userDoc.exists()) {
                    onClose();
                } else {
                    setDoc(doc(fs, "keys", user.uid), {
                        secret: uuidv4(),
                    });
                    setDoc(doc(fs, "users", user.uid), {
                        username: user.displayName ?? "Anonymouse",
                        following: [],
                        followerCount: 0,
                        bio: "Hi, I'm new here!",
                        photo: null,
                        social: {},
                    }).then(onClose);
                }
            })
            .catch(({ code }) => {
                switch (code) {
                    case "auth/credential-already-in-use":
                        setShowError({
                            open: true,
                            text: ErrorResponse.credential_already_in_use,
                        });
                        break;
                    case "auth/user-disabled":
                        setShowError({
                            open: true,
                            text: ErrorResponse.user_disabled,
                        });
                        break;
                    default:
                        setShowError({
                            open: true,
                            text: ErrorResponse.default,
                        });
                        break;
                }
            });
    };
    return (
        <>
            <Formik
                initialValues={{
                    email: "",
                    password: "",
                    stay: false,
                }}
                onSubmit={loginSubmit}
                validationSchema={yupSchema}
            >
                {({ values, errors, touched, handleChange, handleBlur }) => (
                    <Form autoComplete="off">
                        <FormControl
                            mb={4}
                            isInvalid={touched.email && !!errors.email}
                        >
                            <FormLabel htmlFor="email">Email Address</FormLabel>
                            <Field
                                as={Input}
                                id="email"
                                name="email"
                                autoComplete="email"
                                variant="filled"
                            />
                            <FormErrorMessage>{errors.email}</FormErrorMessage>
                        </FormControl>
                        <FormControl
                            mb={4}
                            isInvalid={touched.password && !!errors.password}
                        >
                            <FormLabel htmlFor="password">Password</FormLabel>
                            <InputGroup>
                                <Input
                                    id="password"
                                    name="password"
                                    autoComplete="new-password"
                                    type={showPW ? "text" : "password"}
                                    value={values.password}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    variant="filled"
                                />
                                <InputRightElement width="4.5rem">
                                    <Button
                                        h="1.75rem"
                                        size="sm"
                                        onClick={() => setShowPW(!showPW)}
                                    >
                                        {showPW ? "Hide" : "Show"}
                                    </Button>
                                </InputRightElement>
                            </InputGroup>

                            <FormErrorMessage>
                                {errors.password}
                            </FormErrorMessage>
                        </FormControl>
                        <Stack
                            direction={{
                                base: "column",
                                sm: "row",
                            }}
                            align={"start"}
                            justify={"space-between"}
                        >
                            <Checkbox name="stay" onChange={handleChange}>
                                Remember me
                            </Checkbox>
                            <Link to="#" color={"blue.400"}>
                                Forgot password?
                            </Link>
                        </Stack>
                        <Button
                            mt={4}
                            colorScheme="teal"
                            type="submit"
                            w="full"
                        >
                            Submit
                        </Button>
                    </Form>
                )}
            </Formik>
            <Alert
                borderRadius="md"
                px={6}
                py="0 !important"
                mt={showError.open ? 4 : 0}
                h={showError.open ? 14 : 0}
                transition="0.2s ease-in-out"
                status="error"
            >
                <AlertIcon />
                <AlertTitle>{showError.text}</AlertTitle>
            </Alert>
            <Flex my={6} alignItems="center">
                <Divider colorScheme="teal" />
                <Text mx={4}>Or</Text>
                <Divider colorScheme="teal" />
            </Flex>
            <Button
                w={"full"}
                maxW={"md"}
                variant={"outline"}
                leftIcon={<FcGoogle />}
                onClick={handleGoogle}
            >
                <Center>
                    <Text>Sign in with Google</Text>
                </Center>
            </Button>
        </>
    );
};

export default SignIn;
