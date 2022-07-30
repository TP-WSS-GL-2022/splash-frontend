import {
    Button,
    FormControl,
    FormErrorMessage,
    FormLabel,
    Input,
    TabPanel,
    TabPanels,
} from "@chakra-ui/react";
import { Field, Form, Formik } from "formik";

const Panels = () => {
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
    };
    return (
        <TabPanels>
            <TabPanel>
                <Formik
                    initialValues={{ email: "", password: "" }}
                    onSubmit={values => {
                        const formData = {
                            email: values.email.trim(),
                            password: values.password.trim(),
                        };
                        alert(JSON.stringify(formData, null, 2));
                    }}
                >
                    {({ errors, touched }) => (
                        <Form autoComplete="off">
                            <FormControl
                                mb={4}
                                isInvalid={touched.email && !!errors.email}
                            >
                                <FormLabel htmlFor="loginEmail">
                                    Email Address
                                </FormLabel>
                                <Field
                                    as={Input}
                                    id="loginEmail"
                                    name="loginEmail"
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
                                    touched.password && !!errors.password
                                }
                            >
                                <FormLabel htmlFor="loginPassword">
                                    Password
                                </FormLabel>
                                <Field
                                    as={Input}
                                    id="loginPassword"
                                    name="loginPassword"
                                    type="password"
                                    variant="filled"
                                    validate={validateBriefPassword}
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
            <TabPanel></TabPanel>
        </TabPanels>
    );
};

export default Panels;
