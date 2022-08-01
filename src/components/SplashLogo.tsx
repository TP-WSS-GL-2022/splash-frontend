import { FC } from "react";

import { HStack, Image, Text } from "@chakra-ui/react";

export const SplashLogo: FC<{ variant: "full" | "text" | "logo" }> = ({
    variant,
}) => {
    const logo = (
        <Image
            draggable={false}
            boxSize={14}
            objectFit="cover"
            src="/assets/splash.png"
        />
    );

    const text = (
        <Text fontSize="2xl" fontWeight="bold" userSelect="none">
            Splash
        </Text>
    );

    if (variant === "logo") {
        return logo;
    }

    if (variant === "text") {
        return text;
    }

    return (
        <>
            <HStack>
                {logo}
                {text}
            </HStack>
        </>
    );
};
