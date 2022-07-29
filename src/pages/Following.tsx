import { FC } from "react";
import { Heading, Text, Divider, Wrap, WrapItem } from "@chakra-ui/react";
import StreamCard from "../components/features/streamCard";

const Following: FC = () => {
    return (
        <div>
            <Heading fontSize="4xl" color="white">
                FOLLOWING
            </Heading>
            {/* <Divider orientation='horizontal' /> */}
            <Text fontSize="2xl" color="white">
                Live channels
            </Text>
            <Wrap>
                <WrapItem w={500}>
                    <StreamCard />
                </WrapItem>
                <WrapItem w={500}>
                    <StreamCard />
                </WrapItem>
                <WrapItem w={500}>
                    <StreamCard />
                </WrapItem>
                <WrapItem w={500}>
                    <StreamCard />
                </WrapItem>
                <WrapItem w={500}>
                    <StreamCard />
                </WrapItem>
            </Wrap>
        </div>
    );
};

export default Following;
