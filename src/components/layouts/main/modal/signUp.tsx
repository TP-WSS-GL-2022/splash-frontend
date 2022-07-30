import {
    Button,
    FormControl,
    FormErrorMessage,
    FormLabel,
    Input,
    TabPanel,
} from "@chakra-ui/react";
import { Field, Form, Formik } from "formik";

const SignUp = () => {
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

    return <TabPanel></TabPanel>;
};

export default SignUp;
