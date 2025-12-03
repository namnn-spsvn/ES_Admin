// AudioPlayer.tsx
"use client";
import React, { useRef, useState } from "react";
import { Button, Tooltip } from "antd";
import { SoundOutlined, PauseOutlined } from "@ant-design/icons";

interface Props {
    url: string;
}

export default function AudioPlayer({ url }: Props) {
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const [isPlaying, setIsPlaying] = useState(false);

    const toggleAudio = () => {
        if (!audioRef.current) return;
        if (isPlaying) {
            audioRef.current.pause();
        } else {
            audioRef.current.play();
        }
        setIsPlaying(!isPlaying);
    };

    return (
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            {url && (
                <Tooltip title={isPlaying ? "Tạm dừng" : "Phát audio"}>
                    <Button
                        shape="circle"
                        icon={isPlaying ? <PauseOutlined /> : <SoundOutlined />}
                        onClick={toggleAudio}
                        type="primary"
                        style={{
                            background: "#6a11cb",
                            border: "none",
                            boxShadow: "0 2px 5px rgba(0,0,0,0.15)",
                        }}
                    />
                </Tooltip>
            )}
            <audio ref={audioRef} src={url} onEnded={() => setIsPlaying(false)} />
        </div>
    );
}
