"use client";
import React from "react";
import { Card, Input, Button } from "antd";

interface Option {
    label: string;
    option_text: string;
    is_correct?: boolean;
}

interface Props {
    option: Option;
    onChange: (value: string) => void;
    onSelectCorrect: () => void;
}

export default function OptionCard({ option, onChange, onSelectCorrect }: Props) {
    return (
        <Card
            size="small"
            style={{
                background: option.is_correct ? "#f6ffed" : "#fafafa",
                border: option.is_correct ? "2px solid #52c41a" : "1px solid #eee",
                borderRadius: 8,
            }}
        >
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <Input
                    addonBefore={option.label}
                    value={option.option_text}
                    onChange={(e) => onChange(e.target.value)}
                />
                <Button
                    size="small"
                    onClick={onSelectCorrect}
                    style={{
                        padding: "0 8px",
                        background: option.is_correct ? "#52c41a" : "#fff",
                        color: option.is_correct ? "#fff" : "#333",
                    }}
                >
                    {option.is_correct ? "✓" : "✗"}
                </Button>
            </div>
        </Card>
    );hưa p
}
