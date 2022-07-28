import { PropsWithChildren, useState } from "react";

import { ReactFlvPlayer } from "@asurraa/react-ts-flv-player";
import { Input } from "@chakra-ui/react";

const Test = (props: PropsWithChildren<{}>) => {
    const [name, setName] = useState("");

    return name !== "" ? (
        <ReactFlvPlayer url={`http://localhost:3490/live/${name}.flv`} isLive={true} />
    ) : (
        <Input onBlur={(e) => setName(e.target.value)} />
    );
};

export default Test;
