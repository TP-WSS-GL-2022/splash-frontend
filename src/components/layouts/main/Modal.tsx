import {
    Button,
    HStack,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Text,
} from "@chakra-ui/react";

interface AuthModalProps {
    isOpen: boolean;
    onClose: () => void;
    authState: boolean;
    setLogin: () => void;
    setSignUp: () => void;
    onToggle: () => void;
}

const AuthModal = ({
    isOpen,
    onClose,
    authState,
    setLogin,
    setSignUp,
    onToggle,
}: AuthModalProps) => {
    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>
                    {authState ? "Log in to Splash" : "Join Splash today"}
                </ModalHeader>
                <ModalCloseButton top={3.5} />

                <ModalBody pb={4}>
                    <Text>Test body</Text>
                </ModalBody>
            </ModalContent>
        </Modal>
    );
};

export default AuthModal;
