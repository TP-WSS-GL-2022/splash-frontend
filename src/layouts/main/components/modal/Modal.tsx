import { Dispatch, SetStateAction } from "react";
import * as Yup from "yup";

import {
    Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, Tab, TabList,
    TabPanel, TabPanels, Tabs
} from "@chakra-ui/react";

import { SplashLogo } from "../../../../components/SplashLogo";
import SignInForm from "./SignInForm";
import SignUpForm from "./SignUpForm";

interface AuthModalProps {
    state: { index: number; isOpen: boolean };
    setState: Dispatch<SetStateAction<{ index: number; isOpen: boolean }>>;
}

const AuthModal = ({ state, setState }: AuthModalProps) => {
    const handleTabsChange = (index: number) =>
        setState({ ...state, index: index });

    const closeModal = () => setState({ ...state, isOpen: false });

    return (
        <Modal
            isOpen={state.isOpen}
            onClose={() => setState({ ...state, isOpen: false })}
        >
            <ModalOverlay />
            <ModalContent>
                <ModalHeader
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                >
                    <SplashLogo variant="full" />
                </ModalHeader>
                <ModalCloseButton top={3.5} />

                <ModalBody pb={4}>
                    <Tabs
                        isFitted
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
                                <SignInForm onClose={closeModal} />
                            </TabPanel>
                            <TabPanel>
                                <SignUpForm onClose={closeModal} />
                            </TabPanel>
                        </TabPanels>
                    </Tabs>
                </ModalBody>
            </ModalContent>
        </Modal>
    );
};

export default AuthModal;
