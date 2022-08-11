import { FC } from "react";

import {
    AspectRatio,
    Box,
    Image,
    Heading,
} from "@chakra-ui/react";

import categoryStream from "./category_placeholder.jpg";

const CategoryThumbnail: FC = () => {
    return (
        <Box
            // use tab key and remove if needed
            tabIndex={0}
            maxW="inherit"
            minW="40"
            bgColor="gray.800"
            borderWidth="thin"
            borderColor="gray.700"
            transition="all 0.2s"
            cursor="pointer"
            pos="relative"
            _hover={{
                transform: "scale(1.02)",
                borderColor: "gray.600",
                bgColor: "gray.700",
            }}
        >
            <AspectRatio ratio={2 / 3}>
                <Image
                    draggable={false}
                    src={categoryStream}
                    w="70%"
                    alt="Video Thumbnail here"
                    roundedTop="lg"
                />

            </AspectRatio>
            <Box p="4">
                <Heading size="sm" noOfLines={1} color={"white"}>
                    APEX GRIND TO MASTER??!! 24/50 TWITCH AFFLIATE GOAL
                </Heading>
            </Box>
        </Box>
    );
};

export default CategoryThumbnail;
