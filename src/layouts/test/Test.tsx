import { FC, PropsWithChildren, useState } from "react";

import { ReactFlvPlayer } from "@asurraa/react-ts-flv-player";
import { Box, HStack, Input } from "@chakra-ui/react";

import ChatSidebar from "./components/ChatSidebar";

const Test: FC<PropsWithChildren<{}>> = props => {
    const [name, setName] = useState("");

    return (
        <HStack align="space-between">
            {name !== "" ? (
                <Box>
                    <ChatSidebar />
                    <ReactFlvPlayer
                        url={`http://18.143.74.14:6969/api/${name}/live.flv`}
                        isLive={true}
                    />
                </Box>
            ) : (
                <Input onBlur={e => setName(e.target.value)} />
            )}
        </HStack>
    );
};

export default Test;
