import { FC } from "react";

import { Heading, SimpleGrid, Text } from "@chakra-ui/react";

import StreamCard from "../../components/features/streamCard";

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
            <SimpleGrid minChildWidth='240px' spacing='40px'>
                <StreamCard/>
                <StreamCard/>
                <StreamCard/>
                <StreamCard/>
                <StreamCard/>
            </SimpleGrid>
        </div>
    );
};

export default Following;
