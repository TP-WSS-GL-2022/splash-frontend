import {
    Button,
    FormControl,
    FormErrorMessage,
    FormLabel,
    Input,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalHeader,
    ModalOverlay,
    Tab,
    TabList,
    TabPanel,
    TabPanels,
    Tabs,
} from "@chakra-ui/react";
import { Field, Form, Formik } from "formik";
import { Dispatch, SetStateAction } from "react";

interface StateInterface {
    selector: number;
    isOpen: boolean;
}

interface AuthModalProps {
    state: StateInterface;
    setState: Dispatch<SetStateAction<StateInterface>>;
}

interface loginData {
    email: string;
    password: string;
}

interface signUpData {
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
}

const AuthModal = ({ state, setState }: AuthModalProps) => {
    const handleTabsChange = (index: number) =>
        setState({ ...state, selector: index });
    const validateEmail = (value: string) => {
        let error = "";

        console.log();

        if (!value || value.trim() == "") {
            error = "Email is required.";
        } else if (
            !RegExp(
                /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-]+$/
            ).test(value.trim())
        ) {
            error = "Please enter a valid email.";
        }
        return error;
    };

    const validateBriefPassword = (value: string) => {
        let error = "";

        if (!value || value.trim() == "") {
            error = "Password is required.";
        }
        return error;
    };

    const validateDetailedPassword = (value: string) => {
        let error = "";
        if (!value || value.trim() == "") {
            error = "Password is required.";
        } else if (
            !RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/).test(
                value.trim()
            )
        ) {
            error =
                "Password has to follow these rules: minimum eight characters, at least one uppercase letter, one lowercase letter and one number.";
        } else if (value.trim().length < 8) {
            error = "Password has to be longer than 8 characters.";
        }

        return error;
    };

    const validateConfirmPassword = (value: string, password: string) => {
        let error = "";
        if (value != password) {
            error = "Passwords do not match";
        }

        return error;
    };

    const loginSubmit = (values: loginData) => {
        const formData = {
            email: values.email.trim(),
            password: values.password.trim(),
        };
        alert(JSON.stringify(formData, null, 2));
    };

    const signUpSubmit = (values: signUpData) => {
        const formData = {
            username: values.username.trim(),
            email: values.email.trim(),
            password: values.password.trim(),
            confirmPassword: values.confirmPassword.trim(),
        };

        alert(JSON.stringify(formData, null, 2));
    };

    return (
        <Modal
            isOpen={state.isOpen}
            onClose={() => setState({ ...state, isOpen: false })}
        >
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>
                    {state.selector == 0
                        ? "Log in to Splash"
                        : "Join Splash today"}
                </ModalHeader>
                <ModalCloseButton top={3.5} />

                <ModalBody pb={4}>
                    <Tabs
                        index={state.selector}
                        onChange={handleTabsChange}
                        colorScheme="teal"
                    >
                        <TabList>
                            <Tab>Log in</Tab>
                            <Tab>Sign Up</Tab>
                        </TabList>
                        <TabPanels>
                            <TabPanel>
                                <Formik
                                    initialValues={{ email: "", password: "" }}
                                    onSubmit={loginSubmit}
                                >
                                    {({ errors, touched }) => (
                                        <Form autoComplete="off">
                                            <FormControl
                                                mb={4}
                                                isInvalid={
                                                    touched.email &&
                                                    !!errors.email
                                                }
                                                isRequired
                                            >
                                                <FormLabel htmlFor="email">
                                                    Email Address
                                                </FormLabel>
                                                <Field
                                                    as={Input}
                                                    id="email"
                                                    name="email"
                                                    autoComplete="email"
                                                    variant="filled"
                                                    validate={validateEmail}
                                                />
                                                <FormErrorMessage>
                                                    {errors.email}
                                                </FormErrorMessage>
                                            </FormControl>
                                            <FormControl
                                                mb={8}
                                                isInvalid={
                                                    touched.password &&
                                                    !!errors.password
                                                }
                                                isRequired
                                            >
                                                <FormLabel htmlFor="password">
                                                    Password
                                                </FormLabel>
                                                <Field
                                                    as={Input}
                                                    id="password"
                                                    name="password"
                                                    type="password"
                                                    autoComplete="password"
                                                    variant="filled"
                                                    validate={
                                                        validateBriefPassword
                                                    }
                                                />
                                                <FormErrorMessage>
                                                    {errors.password}
                                                </FormErrorMessage>
                                            </FormControl>
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
                            </TabPanel>
                            <TabPanel>
                                <Formik
                                    initialValues={{
                                        username: "",
                                        email: "",
                                        password: "",
                                        confirmPassword: "",
                                    }}
                                    onSubmit={signUpSubmit}
                                >
                                    {({ values, errors, touched }) => (
                                        <Form autoComplete="off">
                                            <FormControl mb={4}>
                                                <FormLabel htmlFor="username">
                                                    Username
                                                </FormLabel>
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
                                                isInvalid={
                                                    touched.email &&
                                                    !!errors.email
                                                }
                                                isRequired
                                            >
                                                <FormLabel htmlFor="email">
                                                    Email Address
                                                </FormLabel>
                                                <Field
                                                    as={Input}
                                                    id="registerEmail"
                                                    name="email"
                                                    variant="filled"
                                                    validate={validateEmail}
                                                />
                                                <FormErrorMessage>
                                                    {errors.email}
                                                </FormErrorMessage>
                                            </FormControl>
                                            <FormControl
                                                mb={4}
                                                isInvalid={
                                                    touched.password &&
                                                    !!errors.password
                                                }
                                                isRequired
                                            >
                                                <FormLabel htmlFor="password">
                                                    Password
                                                </FormLabel>
                                                <Field
                                                    as={Input}
                                                    id="registerPassword"
                                                    name="password"
                                                    autoComplete="new-password"
                                                    type="password"
                                                    variant="filled"
                                                    validate={
                                                        validateDetailedPassword
                                                    }
                                                />
                                                <FormErrorMessage>
                                                    {errors.password}
                                                </FormErrorMessage>
                                            </FormControl>
                                            <FormControl
                                                mb={8}
                                                isInvalid={
                                                    touched.confirmPassword &&
                                                    !!errors.confirmPassword
                                                }
                                                isRequired
                                            >
                                                <FormLabel htmlFor="confirmPassword">
                                                    Confirm Password
                                                </FormLabel>
                                                <Field
                                                    as={Input}
                                                    id="confirmPassword"
                                                    name="confirmPassword"
                                                    autoComplete="new-password"
                                                    type="password"
                                                    variant="filled"
                                                    validate={(value: string) =>
                                                        validateConfirmPassword(
                                                            value,
                                                            values.password
                                                        )
                                                    }
                                                />
                                                <FormErrorMessage>
                                                    {errors.confirmPassword}
                                                </FormErrorMessage>
                                            </FormControl>
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
                            </TabPanel>
                        </TabPanels>
                    </Tabs>
                </ModalBody>
            </ModalContent>
        </Modal>
    );
};

export default AuthModal;
