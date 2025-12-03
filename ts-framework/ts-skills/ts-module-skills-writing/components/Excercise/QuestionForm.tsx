"use client";
import React from "react";
import { Input, Row, Col, Typography } from "antd";
import OptionCard from "../OptionCard";

const { Title } = Typography;

interface Option {
    label: string;
    option_text: string;
    is_correct?: boolean;
}

interface QuestionFormProps {
    question: {
        question_text: string;
        options: Option[];
    } | null;
    onChangeQuestion: (field: string, value: string) => void;
    onChangeOption: (index: number, value: string) => void;
    onSelectCorrect: (index: number) => void;
}

export default function QuestionForm({
    question,
    onChangeQuestion,
    onChangeOption,
    onSelectCorrect,
}: QuestionFormProps) {

    // Nếu không có question -> không render
    if (!question) return null;

    const safeOptions = question.options ?? [];

    return (
        <div style={{ marginTop: 24 }}>
            <Title level={5}>Câu hỏi</Title>

            <Input
                placeholder="Nhập nội dung câu hỏi..."
                value={question.question_text || ""}
                onChange={(e) => onChangeQuestion("question_text", e.target.value)}
                style={{ marginBottom: 16 }}
            />

            <Row gutter={[16, 16]}>
                {safeOptions.map((opt, idx) => (
                    <Col span={12} key={idx}>
                        <OptionCard
                            option={opt}
                            onChange={(val) => onChangeOption(idx, val)}
                            onSelectCorrect={() => onSelectCorrect(idx)}
                        />
                    </Col>
                ))}
            </Row>
        </div>
    );
}
