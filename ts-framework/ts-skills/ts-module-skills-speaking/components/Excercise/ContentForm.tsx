
"use client";
import React from "react";
import { Card, Input, Image } from "antd";

interface ContentFormProps {
    media_image_url: string;
    body_text: string;
    onChangeField: (field: string, value: string) => void;
}

export default function ContentForm({ media_image_url, body_text, onChangeField }: ContentFormProps) {
    return (
        <div style={{ marginBottom: 16 }}>
            {media_image_url && (
                <Image
                    src={media_image_url}
                    alt="question"
                    width={"100%"}
                    height={250}
                    style={{ objectFit: "cover", borderRadius: 8, marginBottom: 8 }}
                />
            )}
            <Input
                placeholder="URL hình ảnh"
                value={media_image_url}
                onChange={(e) => onChangeField("media_image_url", e.target.value)}
                style={{ marginBottom: 8 }}
            />
            <Input.TextArea
                rows={3}
                placeholder="Nhập đoạn văn"
                value={body_text}
                onChange={(e) => onChangeField("body_text", e.target.value)}
                style={{ marginBottom: 16 }}
            />
        </div>
    );
}
