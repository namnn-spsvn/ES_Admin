"use client";
import { useParams } from "next/navigation";
import React, { useState, useEffect } from "react";
import { Card, Button, Spin, message } from "antd";
import {
    useGetContentQuery,
    useGetContentDetailQuery,
} from "../../apis/index";

import ContentProgress from "./ContentProgress";
import ContentForm from "./ContentForm";
import QuestionForm from "./QuestionForm";

export default function TopicDetailPage() {
    const { id } = useParams();
    const topic_id = id as string;

    const [currentIndex, setCurrentIndex] = useState(0);
    const [detail, setDetail] = useState<any>(null);
    const [isNew, setIsNew] = useState(false);

    const { data: contentData, isLoading: loadingList } = useGetContentQuery({ topic_id });
    const contents = contentData?.items || [];

    const contentId = !isNew && contents[currentIndex]?._id;
    const { data: contentDetail, isLoading: loadingDetail } = useGetContentDetailQuery(contentId!, {
        skip: !contentId || isNew,
    });

    useEffect(() => {
        if (isNew) {
            setDetail({
                item: { topic_id, type: "WRITING_PROMPT", title: "", body_text: "", media_image_url: "", meta: { level: "", skill: "WRITING" }, is_published: false },
                questions: [{ question_text: "", options: [{ label: "A", option_text: "" }, { label: "B", option_text: "" }, { label: "C", option_text: "" }, { label: "D", option_text: "" }] }],
            });
        } else if (contentDetail) setDetail(contentDetail);
    }, [contentDetail, isNew]);

    const handleChangeField = (field: string, value: string) => {
        setDetail((prev: any) => ({ ...prev, item: { ...prev.item, [field]: value } }));
    };
    const handleChangeQuestion = (field: string, value: string) => {
        setDetail((prev: any) => ({ ...prev, questions: [{ ...prev.questions[0], [field]: value }] }));
    };
    const handleChangeOption = (index: number, value: string) => {
        setDetail((prev: any) => {
            const updated = [...prev.questions[0].options];
            updated[index] = { ...updated[index], option_text: value };
            return { ...prev, questions: [{ ...prev.questions[0], options: updated }] };
        });
    };
    const handleSelectCorrect = (index: number) => {
        setDetail((prev: any) => {
            const updated = prev.questions[0].options.map((opt: any, i: number) => ({ ...opt, is_correct: i === index }));
            return { ...prev, questions: [{ ...prev.questions[0], options: updated }] };
        });
    };

    const handleNext = () => {
        if (currentIndex < contents.length - 1) {
            setCurrentIndex(prev => prev + 1);
            setIsNew(false);
        } else setIsNew(true);
    };
    const handlePrev = () => {
        if (isNew) {
            setIsNew(false);
            setCurrentIndex(contents.length - 1);
        } else if (currentIndex > 0) setCurrentIndex(prev => prev - 1);
    };

    const handleSave = async () => {
        try {
            message.success("Đã lưu!");
        } catch {
            message.error("Không thể lưu thay đổi!");
        }
    };

    if (loadingList || loadingDetail || !detail) return <Spin size="large" style={{ marginTop: 100 }} />;

    const { item, questions } = detail;
    const question = questions[0];

    return (
        <div style={{ maxWidth: 900, margin: "auto", padding: 24 }}>
            {!isNew && <ContentProgress currentIndex={currentIndex} total={contents.length} />}
            <Card title={isNew ? "Thêm câu hỏi mới" : "Chỉnh sửa nội dung"}>
                <ContentForm media_image_url={item.media_image_url} body_text={item.body_text} onChangeField={handleChangeField} />
                <QuestionForm question={question} onChangeQuestion={handleChangeQuestion} onChangeOption={handleChangeOption} onSelectCorrect={handleSelectCorrect} />

                <div style={{ marginTop: 24, display: "flex", justifyContent: "space-between" }}>
                    <Button onClick={handlePrev} disabled={currentIndex === 0 && !isNew}>Câu trước</Button>
                    <Button type="default" onClick={handleSave}>{isNew ? "Tạo mới" : "Lưu thay đổi"}</Button>
                    {!isNew && <Button type="primary" onClick={handleNext} style={{ background: "#6a11cb" }}>{currentIndex === contents.length - 1 ? "Thêm câu hỏi mới" : "Câu tiếp theo"}</Button>}
                </div>
            </Card>
        </div>
    );
}
