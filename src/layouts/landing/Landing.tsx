import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import Particles from "react-tsparticles";
import { 
        Button,
        Flex,
        Heading,
        Image,
        Stack,
        Text,
        useBreakpointValue, 
        } from '@chakra-ui/react';
import { SplashLogo } from "public/assets/splash.png";

const Landing: FC = () => {
    const navigate = useNavigate();
    
    return (
        <div>
            <Stack minH={'100vh'} direction={{ base: 'column', md: 'row' }}>
            <Flex p={8} flex={1}  align={'center'} justify={'center'}>
                <Stack spacing={6} w={'full'} maxW={'lg'}>
                <Heading fontSize={{ base: '3xl', sm: '4xl', md: '9xl' }}>
                    <Text fontSize={{ md: '4xl', lg: '5xl' }} color={'white'} as={'sub'}>
                        WELCOME TO
                    </Text>{' '}
                    <Text
                    as={'span'}
                    position={'relative'}
                    _after={{
                        content: "''",
                        width: 'full',
                        height: useBreakpointValue({ base: '20%', md: '30%' }),
                        position: 'absolute',
                        bottom: 1,
                        left: 0,
                        bg: 'blue.400',
                        zIndex: -1,
                    }}>
                        Splash
                    </Text>
                    
                    <br />{' '}
                    <Text fontSize={{ md: '2xl', lg: '3xl' }} color={'white'} >
                        Live streaming video platform
                    </Text>{' '}
                </Heading>
                <Text fontSize={{ base: 'md', lg: 'lg' }} color={'gray.500'}>
                Uses can stream their screen and/or webcam in real-time from a streaming service like OBS, 
                It will be accompanied with a live text in which viewers can send messages.
                </Text>
                <Stack direction={{ base: 'column', md: 'row' }} spacing={4}>
                    <Button backgroundColor={'#6E91AD'} rounded={'full'} onClick={() => navigate("/home")}>Go to Home</Button>
                </Stack>
                </Stack>
            </Flex>
            <Flex flex={1}>
                <Image
                alt={'Login Image'}
                objectFit={'cover'}
                src="/assets/splash.png"
                />
            </Flex>
            </Stack>

        </div>
    );
};

export default Landing;
