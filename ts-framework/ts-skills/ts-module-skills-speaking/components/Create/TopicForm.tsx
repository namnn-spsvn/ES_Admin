"use client";
import React, { useState } from "react";
import { Card, Input, Select, Button, message } from "antd";
import { useCreateTopicMutation } from "../../apis/index";
import { toast, ToastContainer } from "react-toastify";
const { Option } = Select;

interface Props {
  onCreated: (topic: { title: string; level: string; id: string }) => void;
}

export default function TopicForm({ onCreated }: Props) {
  const [title, setTitle] = useState("");
  const [level, setLevel] = useState("BEGINNER");
  const [description, setDescription] = useState("");

  const [createTopic, { isLoading }] = useCreateTopicMutation();

  const levelMap: Record<string, string> = {
    BEGINNER: "68ed254ce5c75afc72ea3c2f",
    INTERMEDIATE: "68ed254ce5c75afc72ea3c30",
    ADVANCED: "68ed254ce5c75afc72ea3c31",
  };

  const onCreate = async () => {
    if (!title.trim() || !level.trim() || !description.trim()) {
      toast.warning("Vui lòng nhập đầy đủ thông tin!");
      return;
    }

    try {
      const payload = {
        skill_id: "68ed254ce5c75afc72ea3c2b",
        level_id: levelMap[level],
        title,
        description,
      };

      const res = await createTopic(payload).unwrap();
      toast.success("Tạo Topic thành công");

      onCreated({ title, level, id: res.topic._id });
      setTitle("");
      setLevel("");
      setDescription("");
    } catch (err: any) {
      console.error("❌ Lỗi tạo topic:", err);
      toast.error("Tạo Topic thất bại!");
    }
  };

  return (
    <div style={{ display: "flex", justifyContent: "center", marginTop: 30 }}>
      <ToastContainer position="top-right" autoClose={3000} />
      <Card
        style={{
          width: 500,
          borderRadius: 12,
          boxShadow: "0 4px 16px rgba(106,17,203,0.15)",
        }}
        title={
          <span style={{ color: "#6a11cb", fontWeight: 600, fontSize: 18 }}>
            Tạo mới Topic Speaking
          </span>
        }>
        <div style={{ marginBottom: 16 }}>
          <label style={{ display: "block", marginBottom: 8, fontWeight: 500 }}>
            Tiêu đề Topic
          </label>
          <Input
            placeholder="Nhập tiêu đề topic..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            style={{ borderColor: "#6a11cb", borderRadius: 6 }}
          />
        </div>
        <div style={{ marginBottom: 16 }}>
          <label style={{ display: "block", marginBottom: 8, fontWeight: 500 }}>
            Mức độ
          </label>
          <Select
            placeholder="Chọn mức độ"
            value={level}
            onChange={(v) => setLevel(v)}
            style={{ width: "100%" }}>
            <Option value="BEGINNER">Dễ</Option>
            <Option value="INTERMEDIATE">Trung bình</Option>
            <Option value="ADVANCED">Khó</Option>
          </Select>
        </div>
        <div style={{ marginBottom: 24 }}>
          <label style={{ display: "block", marginBottom: 8, fontWeight: 500 }}>
            Mô tả
          </label>
          <Input.TextArea
            rows={3}
            placeholder="Nhập mô tả về topic..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <Button
          type="primary"
          onClick={onCreate}
          loading={isLoading}
          style={{
            borderRadius: 8,
            width: "100%",
            fontWeight: 500,
          }}>
          Tạo Topic
        </Button>
      </Card>
    </div>
  );
}
