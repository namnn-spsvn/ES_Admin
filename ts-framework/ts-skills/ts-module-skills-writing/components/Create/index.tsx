"use client";
import React, { useState } from "react";
import TopicForm from "./TopicForm";
import QuestionForm from "./QuestionForm";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";

export default function ListeningPage() {
  const [step, setStep] = useState<"topic" | "question">("topic");
  const [topic, setTopic] = useState<{
    title: string;
    level: string;
    id: string;
  } | null>(null);

  const router = useRouter();

  // Các state dùng chung
  const [audioUrl, setAudioUrl] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [bodyText, setBodyText] = useState("");
  const [questionText, setQuestionText] = useState("");

  return (
    <div style={{ maxWidth: 900, margin: "auto", padding: 24 }}>
      <ToastContainer position="top-right" autoClose={3000} />

      <Button
        type="text"
        shape="circle"
        icon={<ArrowLeftOutlined />}
        onClick={() => router.push("/skills/writing")}
        style={{ color: "#555", border: "none", boxShadow: "none" }}
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
          onSave={() => toast.success(`Đã lưu cho topic ${topic.title}`)}
          // audioUrl={audioUrl}
          // setAudioUrl={setAudioUrl}
          // imageUrl={imageUrl}
          // setImageUrl={setImageUrl}
          // bodyText={bodyText}
          // setBodyText={setBodyText}
          // questionText={questionText}
          // setQuestionText={setQuestionText}
        />
      ) : null}
    </div>
  );
}
