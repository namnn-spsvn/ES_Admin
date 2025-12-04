"use client";
import React, { useState } from "react";
import {
  Card,
  Input,
  Row,
  Col,
  Button,
  Typography,
  Space,
  Divider,
} from "antd";
import OptionCard from "../OptionCard";
import {
  useCreateContentMutation,
  useCreateQuestionMutation,
  useCreateQuestionOptionsMutation,
} from "../../apis/index";
import { toast, ToastContainer } from "react-toastify";
import UploadVideo from "@/fer-framework/fe-module-upload/components/UploadVideo";
import {
  PlusOutlined,
  SoundOutlined,
  PictureOutlined,
} from "@ant-design/icons";
import UploadFileBase from "@/fer-framework/fe-module-upload/components/UploadFile";

const { Text, Title } = Typography;

interface Props {
  title: string;
  level: string;
  topicId: string;
  onSave: () => void;
}

export default function QuestionForm({ title, level, topicId, onSave }: Props) {
  const [audioUrl, setAudioUrl] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [bodyText, setBodyText] = useState("");
  const [questionText, setQuestionText] = useState("");
  const [questionNumber, setQuestionNumber] = useState(1);

  const [options, setOptions] = useState([
    { label: "A", option_text: "", is_correct: false },
    { label: "B", option_text: "", is_correct: false },
    { label: "C", option_text: "", is_correct: false },
    { label: "D", option_text: "", is_correct: false },
  ]);

  const handleSaveVideo = (url: any) => setAudioUrl(url);
  const handleSaveImage = (url: any) => setImageUrl(url);
  const [createContent, { isLoading: isCreatingContent }] =
    useCreateContentMutation();
  const [createQuestion, { isLoading: isCreatingQuestion }] =
    useCreateQuestionMutation();
  const [createQuestionOptions, { isLoading: isCreatingOptions }] =
    useCreateQuestionOptionsMutation();

  const isSaving = isCreatingContent || isCreatingQuestion || isCreatingOptions;

  const handleSave = async () => {
    try {
      if (!questionText.trim()) return toast.warning("Vui lòng nhập câu hỏi!");
      if (!imageUrl.trim()) return toast.warning("Vui lòng nhập hình ảnh!");

      if (!bodyText.trim())
        return toast.warning("Vui lòng nhập nội dung đoạn văn!");
      if (!options.every((o) => o.option_text.trim()))
        return toast.warning("Nhập đầy đủ 4 lựa chọn!");
      if (!options.some((o) => o.is_correct))
        return toast.warning("Vui lòng chọn đáp án đúng!");

      const contentPayload: any = {
        title: questionText,
        type: "READING_PASSAGE",
        topic_id: topicId,
        is_published: true,
        body_text: bodyText,
        meta: { level, skill: "READING" },
        media_audio_url: audioUrl,
      };

      if (imageUrl) contentPayload.media_image_url = imageUrl;

      const contentRes = await createContent(contentPayload).unwrap();
      const contentItemId = contentRes._id;

      const questionPayload = {
        content_item_id: contentItemId,
        question_type: "OPEN_ENDED",
        question_text: questionText,
        points: 5,
        order_in_item: questionNumber,
      };

      const qRes = await createQuestion({
        contentItemId,
        data: questionPayload,
      }).unwrap();
      const qId = qRes._id;

      await createQuestionOptions({
        questionId: qId,
        data: {
          options: options.map((o) => ({
            label: o.label,
            option_text: o.option_text,
            is_correct: o.is_correct,
          })),
        },
      }).unwrap();

      onSave();
      resetForm();
    } catch {
      toast.error("Đã xảy ra lỗi!");
    }
  };

  const resetForm = () => {
    setQuestionText("");
    setBodyText("");
    setAudioUrl("");
    setImageUrl("");
    setOptions([
      { label: "A", option_text: "", is_correct: false },
      { label: "B", option_text: "", is_correct: false },
      { label: "C", option_text: "", is_correct: false },
      { label: "D", option_text: "", is_correct: false },
    ]);
    setQuestionNumber(questionNumber + 1);
  };

  const handleSelectCorrect = (i: number) => {
    setOptions(options.map((o, idx) => ({ ...o, is_correct: idx === i })));
  };

  return (
    <Card style={{ borderRadius: 12 }}>
      <ToastContainer />

      <Title level={4} style={{ marginBottom: 24 }}>
        {title} – Câu hỏi {questionNumber}
      </Title>

      {/* --- QUESTION TEXT --- */}
      <Card size="small" style={{ borderRadius: 10, marginBottom: 20 }}>
        <Text strong>Câu hỏi</Text>
        <Input.TextArea
          rows={3}
          placeholder="Nhập câu hỏi…"
          value={questionText}
          onChange={(e) => setQuestionText(e.target.value)}
          style={{ marginTop: 10 }}
        />
      </Card>

      {/* --- BODY TEXT --- */}
      <Card size="small" style={{ borderRadius: 10, marginBottom: 20 }}>
        <Text strong>Đoạn văn / Nội dung</Text>
        <Input.TextArea
          rows={4}
          placeholder="Nhập nội dung đoạn văn…"
          value={bodyText}
          onChange={(e) => setBodyText(e.target.value)}
          style={{ marginTop: 10 }}
        />
      </Card>

      {/* --- IMAGE --- */}
      <Card size="small" style={{ borderRadius: 10, marginBottom: 20 }}>
        <Space direction="vertical" style={{ width: "100%" }}>
          <Space>
            <PictureOutlined style={{ fontSize: 20 }} />
            <Text strong>Ảnh minh họa (tuỳ chọn)</Text>
          </Space>

          <UploadFileBase
            listType="picture-card"
            maxCount={1}
            accept="image/*"
            handleSaveImage={handleSaveImage}
            returnObject>
            <button style={{ border: 0, background: "none" }} type="button">
              <PlusOutlined />
              <div style={{ marginTop: 8 }}>Upload audio</div>
            </button>
          </UploadFileBase>
        </Space>
      </Card>

      {/* --- OPTIONS --- */}
      <Card size="small" style={{ borderRadius: 10, marginBottom: 20 }}>
        <Text strong>Đáp án</Text>
        <Divider />

        <Row gutter={[16, 16]}>
          {options.map((opt, idx) => (
            <Col span={12} key={idx}>
              <OptionCard
                option={opt}
                onChange={(val) => {
                  const updated = [...options];
                  updated[idx].option_text = val;
                  setOptions(updated);
                }}
                onSelectCorrect={() => handleSelectCorrect(idx)}
              />
            </Col>
          ))}
        </Row>
      </Card>

      <div style={{ textAlign: "right", marginTop: 24 }}>
        <Button
          type="primary"
          size="large"
          loading={isSaving}
          onClick={handleSave}
          style={{
            paddingInline: 32,
            borderRadius: 8,
            fontWeight: 600,
          }}>
          Lưu câu hỏi
        </Button>
      </div>
    </Card>
  );
}
