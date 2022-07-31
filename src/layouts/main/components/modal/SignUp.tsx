import {
    Alert,
    AlertIcon,
    AlertTitle,
    Button,
    FormControl,
    FormErrorMessage,
    FormLabel,
    Input,
    InputGroup,
    InputRightElement,
} from "@chakra-ui/react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { Field, Form, Formik } from "formik";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { auth, fs } from "../../../../util/firebase";

export enum ErrorResponse {
    default = "Sign up attempt was unsuccessful",
    email_exists = "The email is already in use",
    user_disabled = "Email has been disabled",
}

interface signUpData {
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
}

interface SignInProps {
    onClose: () => void;
    yupSchema: any;
}

const SignUp = ({ yupSchema, onClose }: SignInProps) => {
    const [showError, setShowError] = useState({
        open: false,
        text: ErrorResponse.default,
    });
    const [showPW, setShowPW] = useState(false);
    const [showCPW, setShowCPW] = useState(false);

    const signUpSubmit = (values: signUpData) => {
        const formData = {
            username:
                values.username.trim().length == 0
                    ? null
                    : values.username.trim(),
            email: values.email.trim(),
            password: values.password.trim(),
            confirmPassword: values.confirmPassword.trim(),
        };

        createUserWithEmailAndPassword(auth, formData.email, formData.password)
            .then(({ user }) => {
                setDoc(doc(fs, "keys", user.uid), {
                    secret: uuidv4(),
                });
                setDoc(doc(fs, "users", user.uid), {
                    username: formData.username ?? "Anonymouse",
                    following: [],
                    followerCount: 0,
                    bio: "Hi, I'm new here!",
                    photo: null,
                    social: {},
                }).then(onClose);
            })
            .catch(({ code }) => {
                switch (code) {
                    case "auth/email_exists":
                        setShowError({
                            open: true,
                            text: ErrorResponse.email_exists,
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
        <Formik
            initialValues={{
                username: "",
                email: "",
                password: "",
                confirmPassword: "",
            }}
            onSubmit={signUpSubmit}
            validationSchema={yupSchema}
        >
            {({ values, errors, touched, handleChange, handleBlur }) => (
                <Form autoComplete="off">
                    <FormControl mb={4}>
                        <FormLabel htmlFor="username">Username</FormLabel>
                        <Field
                            as={Input}
                            id="username"
                            name="username"
                            placeholder="Anonymouse"
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
                    <Button mt={4} colorScheme="teal" type="submit" w="full">
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

export default SignUp;
