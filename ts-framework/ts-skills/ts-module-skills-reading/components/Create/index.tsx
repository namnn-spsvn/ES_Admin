"use client";
import React, { useState } from "react";
import TopicForm from "./TopicForm";
import QuestionForm from "./QuestionForm";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { Card, Button, Spin, message } from "antd";
import { useRouter } from "next/navigation";
import { toast, ToastContainer } from "react-toastify";
export default function ListeningPage() {
  const [step, setStep] = useState<"topic" | "question">("topic");
  const [topic, setTopic] = useState<{
    title: string;
    level: string;
    id: string;
  } | null>(null);
  const router = useRouter();
  const [audioUrl, setAudioUrl] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [bodyText, setBodyText] = useState("");
  const [questionText, setQuestionText] = useState("");
  const [options, setOptions] = useState([
    { label: "A", option_text: "", is_correct: false },
    { label: "B", option_text: "", is_correct: false },
    { label: "C", option_text: "", is_correct: false },
    { label: "D", option_text: "", is_correct: false },
  ]);

  return (
    <div style={{ maxWidth: 900, margin: "auto", padding: 24 }}>
      <ToastContainer position="top-right" autoClose={3000} />
      <Button
        type="text"
        shape="circle"
        icon={<ArrowLeftOutlined />}
        onClick={() => router.push("/skills/reading")}
        style={{
          color: "#555",
          border: "none",
          boxShadow: "none",
        }}
      />
      {step === "topic" ? (
        <TopicForm
          onCreated={(newTopic) => {
            setTopic(newTopic);
            setStep("question");
          }}
        />
      ) : topic ? (
        <QuestionForm
          title={topic.title}
          level={topic.level}
          topicId={topic.id}
          onSave={() =>
            toast.success(`Đã lưu câu hỏi cho topic ${topic.title}`)
          }
          // audioUrl={audioUrl}
          // setAudioUrl={setAudioUrl}
          // imageUrl={imageUrl}
          // setImageUrl={setImageUrl}
          // bodyText={bodyText}
          // setBodyText={setBodyText}
          // questionText={questionText}
          // setQuestionText={setQuestionText}
          // options={options}
          // setOptions={setOptions}
          // onSave={() => alert(`Đã lưu câu hỏi cho topic ${topic.title}`)}
        />
      ) : null}
    </div>
  );
}
