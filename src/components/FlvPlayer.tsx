import FlvJs from "flv.js"
import { useEffect, useRef, useState } from "react"

import { chakra, Image, usePrevious } from "@chakra-ui/react"

const FlvPlayer = ({
    userId,
    secret,
    width,
    height,
    onIsStreamingChange,
}: {
    userId: string;
    secret?: string;
    width?: string | number;
    height?: string | number;
    onIsStreamingChange?: (streaming: boolean) => void;
}) => {
    const videoRef = useRef<HTMLVideoElement>(null);

    const [timer, setTimer] = useState(0);
    const [isStreaming, setIsStreaming] = useState(false);
    const __isStreaming = usePrevious(isStreaming);

    useEffect(() => {
        if (isStreaming !== __isStreaming) {
            onIsStreamingChange?.(isStreaming);
        }
    }, [isStreaming]);

    useEffect(() => {
        if (isStreaming) return;

        const interval = setInterval(() => {
            setTimer(timer => timer + 1);
        }, 1000);

        return () => {
            clearInterval(interval);
        };
    }, [isStreaming]);

    useEffect(() => {
        if (!userId || !secret || isStreaming) return;

        fetch(
            `http://18.143.74.14:6969/api/${userId}/live.flv`,
            secret
                ? {
                      headers: {
                          Authorization: `Bearer ${secret}`,
                      },
                  }
                : {}
        ).then(res => setIsStreaming(res.status === 200));
    }, [timer, isStreaming, userId, secret]);

    useEffect(() => {
        if (!FlvJs.isSupported() || !videoRef.current) return;
        console.log("FlvJs is loading:", { userId, secret });

        const player = FlvJs.createPlayer(
            {
                type: "flv",
                url: `http://18.143.74.14:6969/api/${userId}/live.flv`,
                isLive: true,
                hasAudio: true,
                hasVideo: true,
            },
            secret
                ? {
                      headers: {
                          Authorization: `Bearer ${secret}`,
                      },
                  }
                : {}
        );

        player.attachMediaElement(videoRef.current);
        player.load();
        player.play();
        setIsStreaming(true);

        const listener = (type: string, log: string) => {
            if (log === "[MSEController] > MediaSource onSourceEnded") {
                setIsStreaming(false);
                try {
                    player.detachMediaElement();
                    player.destroy();
                } catch {}
            }
        };

        FlvJs.LoggingControl.addLogListener(listener);
        return () => {
            FlvJs.LoggingControl.removeLogListener(listener);
            setIsStreaming(false);
            try {
                player.detachMediaElement();
                player.destroy();
            } catch {}
        };
    }, [userId, videoRef]);

    return isStreaming ? (
        <chakra.video
            ref={videoRef}
            controls={false}
            style={{ width, height }}
        />
    ) : (
        <Image
            src="https://filestore.community.support.microsoft.com/api/images/857d91c4-3174-47e1-ac65-fb319ae97773?upload=true"
            style={{ width, height }}
        />
    );
};

export default FlvPlayer;
