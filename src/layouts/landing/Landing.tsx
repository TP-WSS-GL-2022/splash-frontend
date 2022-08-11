import { FC } from "react";
import { useNavigate } from "react-router-dom";
import FlexView from "react-flexview";

import {
    Button,
    Flex,
    Heading,
    Image,
    Stack,
    Divider,
    Text,
    useBreakpointValue,
    AspectRatio,
    Box,
} from "@chakra-ui/react";

const Landing: FC = () => {
    const navigate = useNavigate();

    return (
        <div>
            <Stack minH={"100vh"} direction={{ base: "column", md: "row" }}>
                <Flex p={8} flex={1} align={"center"} justify={"center"}>
                    <Stack spacing={6} w={"full"} maxW={"lg"}>
                        <Heading
                            fontSize={{ base: "3xl", sm: "4xl", md: "9xl" }}
                        >
                            <Text
                                fontSize={{ md: "4xl", lg: "5xl" }}
                                color={"white"}
                                as={"sub"}
                            >
                                WELCOME TO
                            </Text>{" "}
                            <Text
                                as={"span"}
                                position={"relative"}
                                _after={{
                                    content: "''",
                                    width: "full",
                                    height: useBreakpointValue({
                                        base: "20%",
                                        md: "30%",
                                    }),
                                    position: "absolute",
                                    bottom: 1,
                                    left: 0,
                                    bg: "blue.400",
                                    zIndex: -1,
                                }}
                            >
                                Splash
                            </Text>
                            <br />{" "}
                            <Text
                                fontSize={{ md: "2xl", lg: "3xl" }}
                                color={"white"}
                            >
                                Live streaming video platform
                            </Text>{" "}
                        </Heading>
                        <Text
                            fontSize={{ base: "md", lg: "lg" }}
                            color={"gray.500"}
                        >
                            Uses can stream their screen and/or webcam in
                            real-time from a streaming service like OBS, It will
                            be accompanied with a live text in which viewers can
                            send messages.
                        </Text>
                        <Stack
                            direction={{ base: "column", md: "row" }}
                            spacing={4}
                        >
                            <Button
                                backgroundColor={"#6E91AD"}
                                rounded={"full"}
                                onClick={() => navigate("/home")}
                            >
                                Go to Home
                            </Button>
                        </Stack>
                    </Stack>
                </Flex>
                <Flex flex={1}>
                    <Image
                        alt={"Login Image"}
                        objectFit={"cover"}
                        src="/assets/splash.png"
                    />
                </Flex>
            </Stack>

            {/* Bottom half of Landing Page */}
            <Divider marginTop="5" />

            <FlexView
                height={600}
                hAlignContent="center"
                vAlignContent="center"
                marginTop="5%"
            >
                <FlexView height={600} column>
                    <div
                        style={{
                            width: 150,
                            height: 300,
                        }}
                    >
                        <Text
                            fontSize={{
                                base: "md",
                                lg: "lg",
                            }}
                            color={"white.500"}
                        >
                            Splash
                        </Text>{" "}
                    </div>
                    <div
                        style={{
                            width: 150,
                            height: 300,
                        }}
                    >
                        <Text
                            fontSize={{
                                base: "md",
                                lg: "lg",
                            }}
                            color={"white.500"}
                        >
                            Splash
                        </Text>{" "}
                    </div>
                </FlexView>
                <FlexView>
                    {/* Particles API */}

                    <div
                        style={{
                            width: 400,
                            height: 600,
                        }}
                    >
                        <Box
                            tabIndex={0}
                            maxW="inherit"
                            minW="72"
                            bgColor="gray.800"
                            transition="all 0.2s"
                            cursor="pointer"
                            pos="relative"
                            _hover={{
                                transform: "scale(1.02)",
                                borderColor: "gray.600",
                                bgColor: "gray.700",
                            }}
                        >
                            <AspectRatio ratio={7 / 10}>
                                <Image
                                    draggable={false}
                                    src={"/assets/character.png"}
                                    w="100%"
                                    alt="Video Thumbnail here"
                                />
                            </AspectRatio>
                        </Box>
                    </div>
                </FlexView>
                <FlexView height={610} column marginLeft={80}>
                    <div
                        style={{
                            width: 400,
                            height: 305,
                        }}
                    >
                        <Heading as="h2">What is Splash about?</Heading>
                        <Text
                            fontSize={{
                                base: "md",
                                lg: "lg",
                            }}
                            color={"gray.500"}
                        >
                            Splash will be a live-streaming web app. Users can
                            stream their screen and/or a webcam in real-time
                            from a streaming service such as OBS. It will be
                            paired with a live text chat for viewers to send
                            messages in. Users may follow streamers and receive
                            notifications whenever they go live. Stream viewers
                            can accumulate channel points for watching streams
                            and claim them for special rewards.
                            {/* We might implement a payment system for users (viewers) to subscribe to other users (streamers) using Stripe API or by cryptocurrency (using a test network). */}
                        </Text>{" "}
                    </div>
                    <div
                        style={{
                            width: 400,
                            height: 305,
                        }}
                    >
                        <Heading as="h2" style={{ marginTop: 30 }}>
                            Technologies used
                        </Heading>
                        <Text
                            fontSize={{
                                base: "md",
                                lg: "lg",
                            }}
                            color={"gray.500"}
                        >
                            <FlexView>
                                <div style={{ width: 200, height: 200 }}>
                                    <Text
                                        fontSize={{ md: "2xl", lg: "3xl" }}
                                        color={"gray.400"}
                                    >
                                        Front-end
                                    </Text>
                                    <Text
                                        fontSize={{
                                            base: "md",
                                            lg: "lg",
                                        }}
                                        color={"gray.500"}
                                    >
                                        - React (Typescript)
                                    </Text>{" "}
                                    <Text
                                        fontSize={{
                                            base: "md",
                                            lg: "lg",
                                        }}
                                        color={"gray.500"}
                                    >
                                        - Chakra
                                    </Text>{" "}
                                    <Text
                                        fontSize={{
                                            base: "md",
                                            lg: "lg",
                                        }}
                                        color={"gray.500"}
                                    >
                                        - Firebase authentication
                                    </Text>{" "}
                                </div>

                                <div
                                    style={{
                                        width: 200,
                                        height: 200,
                                        marginRight: "0px",
                                    }}
                                >
                                    <Text
                                        fontSize={{ md: "2xl", lg: "3xl" }}
                                        color={"gray.400"}
                                    >
                                        Back-end
                                    </Text>
                                    <Text
                                        fontSize={{
                                            base: "md",
                                            lg: "lg",
                                        }}
                                        color={"gray.500"}
                                    >
                                        - Node-Media-Server
                                    </Text>{" "}
                                    <Text
                                        fontSize={{
                                            base: "md",
                                            lg: "lg",
                                        }}
                                        color={"gray.500"}
                                    >
                                        - Express
                                    </Text>{" "}
                                    <Text
                                        fontSize={{
                                            base: "md",
                                            lg: "lg",
                                        }}
                                        color={"gray.500"}
                                    >
                                        - Node
                                    </Text>{" "}
                                    <Text
                                        fontSize={{
                                            base: "md",
                                            lg: "lg",
                                        }}
                                        color={"gray.500"}
                                    >
                                        - Firebase Firestore
                                    </Text>{" "}
                                </div>
                            </FlexView>
                        </Text>{" "}
                    </div>
                </FlexView>
            </FlexView>
        </div>
    );
};

export default Landing;
