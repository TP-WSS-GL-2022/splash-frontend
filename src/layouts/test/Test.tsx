import { useState } from "react";

import { Box, HStack, Input } from "@chakra-ui/react";

import FlvPlayer from "../../components/FlvPlayer";
import { ChatSidebar } from "./components";

const Test = () => {
    const [userId, setUserId] = useState("");

    return (
        <HStack align="space-between">
            {userId !== "" ? (
                <Box>
                    <ChatSidebar />
                    <FlvPlayer userId={userId} />
                </Box>
            ) : (
                <Input onBlur={e => setUserId(e.target.value)} />
            )}
        </HStack>
    );
};

export default Test;
