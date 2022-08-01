import { AuthError, AuthErrorCodes, createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { Field, Form, Formik } from "formik";
import { useCallback, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import * as Yup from "yup";

import {
    Alert, AlertIcon, AlertTitle, Button, FormControl, FormErrorMessage, FormLabel, Input,
    InputGroup, InputRightElement
} from "@chakra-ui/react";

import { AuthErrorCode, AuthErrorResponse } from "../../../../util/errors";
import { auth, fs } from "../../../../util/firebase";

interface SignUpData {
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
}

interface SignInProps {
    onClose: () => void;
}

const SignUpForm = ({ onClose }: SignInProps) => {
    const [showError, setShowError] = useState({
        open: false,
        text: AuthErrorResponse.Default,
    });
    const [showPW, setShowPW] = useState(false);
    const [showCPW, setShowCPW] = useState(false);

    const handleSignUp = useCallback(async (values: SignUpData) => {
        const formData = {
            username:
                values.username.trim().length == 0
                    ? null
                    : values.username.trim(),
            email: values.email.trim(),
            password: values.password.trim(),
            confirmPassword: values.confirmPassword.trim(),
        };

        try {
            const { user } = await createUserWithEmailAndPassword(
                auth,
                formData.email,
                formData.password
            );

            await setDoc(doc(fs, "keys", user.uid), {
                secret: uuidv4(),
            });
            await setDoc(doc(fs, "users", user.uid), {
                username: formData.username ?? "Anonymous",
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
            case AuthErrorCodes.EMAIL_EXISTS:
                setShowError({
                    open: true,
                    text: AuthErrorResponse.EmailExists,
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
        <Formik
            initialValues={{
                username: "",
                email: "",
                password: "",
                confirmPassword: "",
            }}
            onSubmit={handleSignUp}
            validationSchema={SignUpSchema}
        >
            {({ values, errors, touched, handleChange, handleBlur }) => (
                <Form autoComplete="off">
                    <FormControl mb={4}>
                        <FormLabel htmlFor="username">Username</FormLabel>
                        <Field
                            as={Input}
                            id="username"
                            name="username"
                            placeholder="Anonymous"
                            autoComplete="off"
                            variant="filled"
                        />
                    </FormControl>
                    <FormControl
                        mb={4}
                        isInvalid={touched.email && !!errors.email}
                    >
                        <FormLabel htmlFor="email">Email Address</FormLabel>
                        <Field
                            as={Input}
                            id="registerEmail"
                            name="email"
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
                                id="registerPassword"
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
                        <FormErrorMessage>{errors.password}</FormErrorMessage>
                    </FormControl>
                    <FormControl
                        mb={4}
                        isInvalid={
                            touched.confirmPassword && !!errors.confirmPassword
                        }
                    >
                        <FormLabel htmlFor="confirmPassword">
                            Confirm Password
                        </FormLabel>

                        <InputGroup>
                            <Input
                                id="confirmPassword"
                                name="confirmPassword"
                                autoComplete="new-password"
                                type={showCPW ? "text" : "password"}
                                value={values.confirmPassword}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                variant="filled"
                            />
                            <InputRightElement width="4.5rem">
                                <Button
                                    h="1.75rem"
                                    size="sm"
                                    onClick={() => setShowCPW(!showCPW)}
                                >
                                    {showCPW ? "Hide" : "Show"}
                                </Button>
                            </InputRightElement>
                        </InputGroup>

                        <FormErrorMessage>
                            {errors.confirmPassword}
                        </FormErrorMessage>
                    </FormControl>
                    <Button mt="8" colorScheme="teal" type="submit" w="full">
                        Submit
                    </Button>
                    <Alert
                        borderRadius="md"
                        px={6}
                        py="0 !important"
                        mt={4}
                        h={showError.open ? 14 : 0}
                        transition="0.2s ease-in-out"
                        status="error"
                    >
                        <AlertIcon />
                        <AlertTitle>{showError.text}</AlertTitle>
                    </Alert>
                </Form>
            )}
        </Formik>
    );
};

const SignUpSchema = Yup.object({
    username: Yup.string().max(48, "Must be 48 characters or less"),
    email: Yup.string()
        .email("Please enter a valid email.")
        .required("Email is required."),
    password: Yup.string()
        .min(8, "Password has to be longer than 8 characters.")
        .matches(
            RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/),
            "Minimum eight characters,\n\nat least one uppercase letter,\n\none lowercase letter and\n\none number."
        )
        .required("Password is required."),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref("password")], "Passwords do not match")
        .required("Please confirm your password."),
});

export default SignUpForm;
