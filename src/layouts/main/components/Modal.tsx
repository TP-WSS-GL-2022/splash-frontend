import { Field, Form, Formik } from 'formik';
import { Dispatch, SetStateAction, useState } from 'react';
import * as Yup from 'yup';

import {
    Button, FormControl, FormErrorMessage, FormLabel, Input, InputGroup, InputRightElement, Modal,
    ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, Tab, TabList, TabPanel,
    TabPanels, Tabs,
} from '@chakra-ui/react';

interface StateInterface {
    index: number;
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
    const [showPW, setShowPW] = useState(false);
    const [showCPW, setShowCPW] = useState(false);

    const handleTabsChange = (index: number) => {
        setState({ ...state, index: index });
        setShowPW(false);
    };

    const validationSchema = (isReg: boolean) => {
        return isReg
            ? Yup.object({
                  username: Yup.string().max(
                      48,
                      "Must be 48 characters or less"
                  ),
                  email: Yup.string()
                      .email("Please enter a valid email.")
                      .required("Email is required."),
                  password: Yup.string()
                      .min(8, "Password has to be longer than 8 characters.")
                      .matches(
                          RegExp(
                              /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/
                          ),
                          "Password has to follow these rules:\n\nMinimum eight characters,\n\nat least one uppercase letter,\n\none lowercase letter and\n\none number."
                      )
                      .required("Password is required."),
                  confirmPassword: Yup.string().oneOf(
                      [Yup.ref("password")],
                      "Passwords do not match"
                  ),
              })
            : Yup.object({
                  email: Yup.string()
                      .email("Please enter a valid email.")
                      .required("Email is required."),
                  password: Yup.string()
                      .min(8, "Password is invalid")
                      .required("Password is required"),
              });
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
                    {state.index == 0
                        ? "Log in to Splash"
                        : "Join Splash today"}
                </ModalHeader>
                <ModalCloseButton top={3.5} />

                <ModalBody pb={4}>
                    <Tabs
                        index={state.index}
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
                                    validationSchema={validationSchema(false)}
                                >
                                    {({
                                        values,
                                        errors,
                                        touched,
                                        handleChange,
                                        handleBlur,
                                    }) => (
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
                                                <InputGroup>
                                                    <Input
                                                        id="password"
                                                        name="password"
                                                        autoComplete="new-password"
                                                        type={
                                                            showPW
                                                                ? "text"
                                                                : "password"
                                                        }
                                                        value={values.password}
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        variant="filled"
                                                    />
                                                    <InputRightElement width="4.5rem">
                                                        <Button
                                                            h="1.75rem"
                                                            size="sm"
                                                            onClick={() =>
                                                                setShowPW(
                                                                    !showPW
                                                                )
                                                            }
                                                        >
                                                            {showPW
                                                                ? "Hide"
                                                                : "Show"}
                                                        </Button>
                                                    </InputRightElement>
                                                </InputGroup>
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
                                    validationSchema={validationSchema(true)}
                                >
                                    {({
                                        values,
                                        errors,
                                        touched,
                                        handleChange,
                                        handleBlur,
                                    }) => (
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
                                                <InputGroup>
                                                    <Input
                                                        id="registerPassword"
                                                        name="password"
                                                        autoComplete="new-password"
                                                        type={
                                                            showPW
                                                                ? "text"
                                                                : "password"
                                                        }
                                                        value={values.password}
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        variant="filled"
                                                    />
                                                    <InputRightElement width="4.5rem">
                                                        <Button
                                                            h="1.75rem"
                                                            size="sm"
                                                            onClick={() =>
                                                                setShowPW(
                                                                    !showPW
                                                                )
                                                            }
                                                        >
                                                            {showPW
                                                                ? "Hide"
                                                                : "Show"}
                                                        </Button>
                                                    </InputRightElement>
                                                </InputGroup>
                                                <FormErrorMessage>
                                                    {errors.password}
                                                </FormErrorMessage>
                                            </FormControl>
                                            <FormControl
                                                mb={4}
                                                isInvalid={
                                                    touched.confirmPassword &&
                                                    !!errors.confirmPassword
                                                }
                                                isRequired
                                            >
                                                <FormLabel htmlFor="confirmPassword">
                                                    Confirm Password
                                                </FormLabel>

                                                <InputGroup>
                                                    <Input
                                                        id="confirmPassword"
                                                        name="confirmPassword"
                                                        autoComplete="new-password"
                                                        type={
                                                            showCPW
                                                                ? "text"
                                                                : "password"
                                                        }
                                                        value={
                                                            values.confirmPassword
                                                        }
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        variant="filled"
                                                    />
                                                    <InputRightElement width="4.5rem">
                                                        <Button
                                                            h="1.75rem"
                                                            size="sm"
                                                            onClick={() =>
                                                                setShowCPW(
                                                                    !showCPW
                                                                )
                                                            }
                                                        >
                                                            {showCPW
                                                                ? "Hide"
                                                                : "Show"}
                                                        </Button>
                                                    </InputRightElement>
                                                </InputGroup>

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
