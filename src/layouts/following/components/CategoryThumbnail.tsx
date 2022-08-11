import { FC } from "react";

import { AspectRatio, Box, Image, Heading } from "@chakra-ui/react";

import categoryPlaceholder from "./category_placeholder.jpg";

const CategoryThumbnail: FC = () => {
    return (
        <Box
            // use tab key and remove if needed
            tabIndex={0}
            maxW="inherit"
            minW="52"
            minH="64"
            borderWidth="thin"
            borderColor="gray.700"
            transition="all 0.2s"
            cursor="pointer"
            pos="relative"
            rounded="xl"
            bgSize="cover"
            overflow="hidden"
            __css={{
                backgroundImage: `
                    linear-gradient(to top, rgba(0,0,0) 0%, rgba(0,0,0,0.0) 50%),
                    url(${categoryPlaceholder})
                `,
            }}
            _hover={{
                transform: "scale(1.02)",
                borderColor: "gray.600",
                bgColor: "gray.700",
            }}
        >
            <Heading size="md" pos="absolute" bottom="4" left="4">
                Gaming
            </Heading>
        </Box>
    );
};

export default CategoryThumbnail;
