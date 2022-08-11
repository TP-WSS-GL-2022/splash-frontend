import { Box, useColorModeValue } from "@chakra-ui/react";
import { FC } from "react";
import { User } from "../models";

const ProfileThumbnail: FC = () => {
    return (
        <Box
            p={8}
            rounded={"lg"}
            boxShadow={"lg"}
            bg={useColorModeValue("white", "gray.700")}
        >
            asdasd
        </Box>
    );
};

export default ProfileThumbnail;
