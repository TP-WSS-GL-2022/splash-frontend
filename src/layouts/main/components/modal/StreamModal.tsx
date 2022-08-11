import { doc, query, Timestamp, updateDoc, where } from "firebase/firestore"
import { useContext, useState } from "react"
import { useCollection, useDocumentData } from "react-firebase-hooks/firestore"

import {
    Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay
} from "@chakra-ui/react"

import FlvPlayer from "../../../../components/FlvPlayer"
import { UserContext } from "../../../../context/UserContext"
import { Keys } from "../../../../models/Key"
import { Streams } from "../../../../models/Stream"

const StreamModal = ({
    isOpen,
    onClose,
}: {
    isOpen: boolean;
    onClose: () => void;
}) => {
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
                        onIsStreamingChange={setIsStreaming}
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
                        isDisabled={!isStreaming}
                    >
                        {!!stream?.startedAt ? "Stop" : "Start"} Streaming
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};

export default StreamModal;
