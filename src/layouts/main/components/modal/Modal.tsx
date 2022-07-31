import { Dispatch, SetStateAction } from "react";
import * as Yup from "yup";

import {
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

import SignIn from "./SignIn";
import SignUp from "./SignUp";

interface AuthModalProps {
    state: { index: number; isOpen: boolean };
    setState: Dispatch<SetStateAction<{ index: number; isOpen: boolean }>>;
}

const AuthModal = ({ state, setState }: AuthModalProps) => {
    const handleTabsChange = (index: number) =>
        setState({ ...state, index: index });

    const closeModal = () => setState({ ...state, isOpen: false });

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
                  confirmPassword: Yup.string()
                      .oneOf([Yup.ref("password")], "Passwords do not match")
                      .required("Confirm Password is required."),
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
                                <SignIn
                                    yupSchema={validationSchema(false)}
                                    onClose={closeModal}
                                />
                            </TabPanel>
                            <TabPanel>
                                <SignUp
                                    yupSchema={validationSchema(true)}
                                    onClose={closeModal}
                                />
                            </TabPanel>
                        </TabPanels>
                    </Tabs>
                </ModalBody>
            </ModalContent>
        </Modal>
    );
};

export default AuthModal;
