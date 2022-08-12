import { doc, query, Timestamp, updateDoc, where } from "firebase/firestore";
import { FocusEvent, useContext, useRef, useState } from "react";
import { useCollection, useDocumentData } from "react-firebase-hooks/firestore";

import {
    Button,
    Input,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
} from "@chakra-ui/react";

import FlvPlayer from "../../../../components/FlvPlayer";
import { UserContext } from "../../../../context/UserContext";
import { Keys } from "../../../../models/Key";
import { Streams } from "../../../../models/Stream";

const StreamModal = ({
    isOpen,
    onClose,
}: {
    isOpen: boolean;
    onClose: () => void;
}) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const user = useContext(UserContext);

    const key = useDocumentData(doc(Keys, user?.ref.id ?? "-"))[0];
    const streamSnap = useCollection(
        query(
            Streams,
            where("streamer", "==", user?.ref),
            where("endedAt", "==", null)
        )
    )[0]?.docs[0];
    const stream = streamSnap?.data();

    const [isStreaming, setIsStreaming] = useState(false);

    return (
        <Modal size="xl" isOpen={isOpen || !!stream} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader textAlign="center">Start your stream</ModalHeader>
                <ModalCloseButton />

                <ModalBody>
                    <FlvPlayer
                        userId={user!.ref.id}
                        secret={key?.secret}
                        width="100%"
                        height="300px"
                        onIsStreamingChange={isStreaming => {
                            setIsStreaming(isStreaming);
                            if (!isStreaming && inputRef.current) {
                                inputRef.current.value = "";
                            }
                        }}
                    />
                    <Input
                        ref={inputRef}
                        mt={2}
                        placeholder="Title"
                        onBlur={(e: FocusEvent<HTMLInputElement>) =>
                            updateDoc(streamSnap!.ref, {
                                title: e.target.value,
                            })
                        }
                        isDisabled={!isStreaming}
                    />
                </ModalBody>

                <ModalFooter>
                    <Button
                        colorScheme={!!stream?.startedAt ? "red" : "teal"}
                        mr={3}
                        onClick={() => {
                            if (!!stream?.startedAt) {
                                updateDoc(streamSnap!.ref, {
                                    endedAt: Timestamp.now(),
                                });
                            } else {
                                updateDoc(streamSnap!.ref, {
                                    startedAt: Timestamp.now(),
                                });
                            }
                        }}
                        isDisabled={!isStreaming || !inputRef.current?.value}
                    >
                        {!!stream?.startedAt ? "Stop" : "Start"} Streaming
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};

export default StreamModal;
