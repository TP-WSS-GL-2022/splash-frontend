import {
    AuthError,
    AuthErrorCodes,
    GoogleAuthProvider,
    signInWithEmailAndPassword,
    signInWithPopup,
} from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { Field, Form, Formik, FormikHelpers } from "formik";
import { useCallback, useEffect, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { Link } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import * as Yup from "yup";

import {
    Alert,
    AlertIcon,
    AlertTitle,
    Box,
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
    VStack,
} from "@chakra-ui/react";

import { AuthErrorCode, AuthErrorResponse } from "../../../../util/errors";
import { auth, fs } from "../../../../util/firebase";

interface LoginData {
    email: string;
    password: string;
    stay: boolean;
}

interface SignInFormProps {
    onClose: () => void;
}

const SignInForm = ({ onClose }: SignInFormProps) => {
    const [showError, setShowError] = useState({
        open: false,
        text: AuthErrorResponse.Default,
    });
    const [showPW, setShowPW] = useState(false);

    useEffect(() => {
        if (showError.open) {
            setTimeout(() => {
                setShowError({
                    text: showError.text,
                    open: false,
                });
            }, 3000);
        }
    }, [showError.open]);

    const handleDefault = useCallback(async (values: LoginData) => {
        const formData = {
            stay: values.stay,
            email: values.email.trim(),
            password: values.password.trim(),
        };

        await signInWithEmailAndPassword(
            auth,
            formData.email,
            formData.password
        ).catch((e: AuthError) => handleAuthError(e));
        onClose();
    }, []);

    const handleGoogle = useCallback(async () => {
        const provider = new GoogleAuthProvider();

        try {
            const { user } = await signInWithPopup(auth, provider);

            const userDoc = await getDoc(doc(fs, "users", user.uid));
            if (userDoc.exists()) {
                onClose();
                return;
            }

            await setDoc(doc(fs, "keys", user.uid), {
                secret: uuidv4(),
            });
            await setDoc(doc(fs, "users", user.uid), {
                username: user.displayName ?? "Anonymous",
                following: [],
                followerCount: 0,
                bio: "Hi, I'm new here!",
                photo: null,
                social: {},
            });

            onClose();
        } catch (e) {
            handleAuthError(e as AuthError);
        }
    }, []);

    const handleAuthError = (error: AuthError) => {
        const code = error.code as AuthErrorCode;

        switch (code) {
            case AuthErrorCodes.CREDENTIAL_ALREADY_IN_USE:
                setShowError({
                    open: true,
                    text: AuthErrorResponse.CredentialAlreadyInUse,
                });
                break;
            case AuthErrorCodes.USER_DISABLED:
                setShowError({
                    open: true,
                    text: AuthErrorResponse.UserDisabled,
                });
                break;
            default:
                setShowError({
                    open: true,
                    text: AuthErrorResponse.Default,
                });
                break;
        }
    };

    return (
        <>
            <Formik
                initialValues={{
                    email: "",
                    password: "",
                    stay: false,
                }}
                onSubmit={handleDefault}
                validationSchema={SignInSchema}
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
                        <VStack mt="8" spacing="4">
                            <Button
                                mt={4}
                                colorScheme="teal"
                                type="submit"
                                w="full"
                            >
                                Submit
                            </Button>
                            <Flex w="full" alignItems="center">
                                <Divider colorScheme="teal" />
                                <Text mx={4}>OR</Text>
                                <Divider colorScheme="teal" />
                            </Flex>
                            <Button
                                w={"full"}
                                maxW={"md"}
                                variant={"outline"}
                                leftIcon={<FcGoogle />}
                                onClick={handleGoogle}
                            >
                                <Text>Sign in with Google</Text>
                            </Button>
                        </VStack>
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
        </>
    );
};

const SignInSchema = Yup.object({
    email: Yup.string()
        .email("Please enter a valid email.")
        .required("Email is required."),
    password: Yup.string()
        .min(8, "Password is invalid")
        .required("Password is required"),
});

export default SignInForm;
