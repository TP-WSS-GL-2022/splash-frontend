import {
    Box,
    Flex,
    HStack,
    IconButton,
    useBreakpointValue,
} from "@chakra-ui/react";
import React, { FC, useRef } from "react";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";
import {
    ResponsiveContainer,
    ResponsiveContainerProps,
    StackedCarousel,
} from "react-stacked-center-carousel";
import { SlidableCard } from "./SlidableCard";

export const data = [
    {
        cover: "https://cdn.discordapp.com/attachments/903504946920575048/1006290655535956048/unknown.png",
        title: "Interstaller",
    },
    {
        cover: "https://cdn.discordapp.com/attachments/903504946920575048/1006290655535956048/unknown.png",
        title: "Inception",
    },
    {
        cover: "https://cdn.discordapp.com/attachments/903504946920575048/1006290655535956048/unknown.png",
        title: "Blade Runner 2049",
    },
    {
        cover: "https://cdn.discordapp.com/attachments/903504946920575048/1006290655535956048/unknown.png",
        title: "Icon man 3",
    },
    {
        cover: "https://cdn.discordapp.com/attachments/903504946920575048/1006290655535956048/unknown.png",
        title: "Venom",
    },
    {
        cover: "https://cdn.discordapp.com/attachments/903504946920575048/1006290655535956048/unknown.png",
        title: "Steins Gate",
    },
    {
        cover: "https://cdn.discordapp.com/attachments/903504946920575048/1006290655535956048/unknown.png",
        title: "One Punch Man",
    },
    {
        cover: "https://cdn.discordapp.com/attachments/903504946920575048/1006290655535956048/unknown.png",
        title: "A Silent Voice",
    },
    {
        cover: "https://cdn.discordapp.com/attachments/903504946920575048/1006290655535956048/unknown.png",
        title: "Demon Slayer",
    },
    {
        cover: "https://cdn.discordapp.com/attachments/903504946920575048/1006290655535956048/unknown.png",
        title: "Attack On Titan",
    },
];

const HeroCarousel: FC = props => {
    const ref = useRef<StackedCarousel>();
    // TODO: consider if needed
    // const slideWidth = useBreakpointValue(
    //     {
    //         xs: 120,
    //         sm: 180,
    //         md: 300,
    //         lg: 600,
    //         xl: 600,
    //     },
    //     {
    //         fallback: "md",
    //     }
    // )!;

    return (
        <Box w={["xl", "2xl", "2xl", "4xl", "6xl"]} pos="relative">
            <IconButton
                aria-label="Previous recommended stream"
                h="90%"
                pos="absolute"
                top="50%"
                left="0"
                zIndex="overlay"
                bgColor="transparent"
                transform="translateY(-50%)"
                _hover={{
                    bgColor: "whiteAlpha.50",
                }}
                fontSize="2xl"
                onClick={() => ref.current?.goBack()}
            >
                <FiArrowLeft />
            </IconButton>
            <IconButton
                aria-label="Next recommended stream"
                h="90%"
                pos="absolute"
                top="50%"
                right="0"
                zIndex="overlay"
                bgColor="transparent"
                transform="translateY(-50%)"
                _hover={{
                    bgColor: "whiteAlpha.50",
                }}
                fontSize="2xl"
                onClick={() => ref.current?.goNext()}
            >
                <FiArrowRight />
            </IconButton>
            <ResponsiveContainer
                carouselRef={ref}
                render={(parentWidth, carouselRef) => {
                    let currentVisibleSlide = 5;
                    if (parentWidth <= 1440) currentVisibleSlide = 3;
                    else if (parentWidth <= 1080) currentVisibleSlide = 1;
                    return (
                        <StackedCarousel
                            ref={carouselRef}
                            data={data}
                            carouselWidth={parentWidth}
                            slideWidth={600}
                            slideComponent={SlidableCard}
                            maxVisibleSlide={5}
                            currentVisibleSlide={currentVisibleSlide}
                            customScales={[1, 0.8, 0.7, 0.2]}
                            useGrabCursor={false}
                            disableSwipe
                        />
                    );
                }}
            />
        </Box>
    );
};

export default HeroCarousel;
