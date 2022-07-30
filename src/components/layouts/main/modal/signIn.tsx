import {
    Button,
    FormControl,
    FormErrorMessage,
    FormLabel,
    Input,
    TabPanel,
} from "@chakra-ui/react";
import { Field, Form, Formik } from "formik";
import { FC } from "react";

const SignIn: FC = () => {
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

    return (
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
                    <Form>
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
                                validate={validateEmail}
                            />
                            <FormErrorMessage>{errors.email}</FormErrorMessage>
                        </FormControl>
                        <FormControl
                            mb={8}
                            isInvalid={touched.password && !!errors.password}
                        >
                            <FormLabel htmlFor="password">Password</FormLabel>
                            <Field
                                as={Input}
                                id="password"
                                name="password"
                                type="password"
                                autoComplete="password"
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
    );
};

export default SignIn;
