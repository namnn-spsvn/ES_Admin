"use client";

import {
  useGetMockTestQuestionsQuery,
  useUpdateMockTestQuestionMutation,
  useDeleteMockTestQuestionMutation,
  useCreateMockTestQuestionMutation,
} from "../../apis";

import { Card, Typography, Button, Input, Modal, Row, Col } from "antd";

import { toast, ToastContainer } from "react-toastify";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const { Title, Text } = Typography;

/* ===========================================================
   OPTION CARD — UI giống user 100%
=========================================================== */
function OptionCard({ option, onChange, onSelectCorrect }: any) {
  return (
    <Card
      size="small"
      style={{
        background: option.is_correct ? "#f6ffed" : "#fafafa",
        border: option.is_correct ? "2px solid #52c41a" : "1px solid #eee",
        borderRadius: 8,
      }}>
      <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
        <Input
          addonBefore={option.label}
          value={option.text}
          onChange={(e) => onChange(e.target.value)}
        />

        <Button
          size="small"
          onClick={onSelectCorrect}
          style={{
            padding: "0 8px",
            background: option.is_correct ? "#52c41a" : "#fff",
            color: option.is_correct ? "#fff" : "#333",
          }}>
          {option.is_correct ? "✓" : "✗"}
        </Button>
      </div>
    </Card>
  );
}

/* ===========================================================
   MAIN
=========================================================== */
export default function Excercise() {
  const params = useParams();
  const testId = params.id as string;

  const { data: apiData, refetch } = useGetMockTestQuestionsQuery(testId);
  console.log("apidata", apiData);
  const questions =
    apiData?.items?.map((item: any) => {
      const q = item.question;
      return {
        mapping_id: item.mapping_id,
        question_id: q._id,
        question_text: q.question_text,
        order_in_test: item.order_in_test,
        options: q.options.map((op: any) => ({
          label: op.label,
          text: op.option_text,
          is_correct: op.is_correct,
        })),
      };
    }) || [];

  const [current, setCurrent] = useState(0);

  const [questionText, setQuestionText] = useState("");
  const [options, setOptions] = useState<any[]>([]);

  const [isCreateModal, setIsCreateModal] = useState(false);
  const [newText, setNewText] = useState("");
  const [newOptions, setNewOptions] = useState([
    { label: "A", text: "", is_correct: false },
    { label: "B", text: "", is_correct: false },
    { label: "C", text: "", is_correct: false },
    { label: "D", text: "", is_correct: false },
  ]);

  const q = questions[current];

  useEffect(() => {
    if (!q) return;
    setQuestionText(q.question_text);
    setOptions(q.options.map((o: any) => ({ ...o })));
  }, [current, apiData]);

  const [updateQuestion] = useUpdateMockTestQuestionMutation();
  const [deleteQuestion] = useDeleteMockTestQuestionMutation();
  const [createQuestion] = useCreateMockTestQuestionMutation();

  const handleSave = async () => {
    if (!questionText.trim()) {
      return toast.error("Câu hỏi không được để trống!");
    }

    if (options.some((o) => !o.text.trim())) {
      return toast.error("Nhập đầy đủ 4 đáp án A, B, C, D!");
    }

    if (!options.some((o) => o.is_correct)) {
      return toast.error("Vui lòng chọn đáp án đúng!");
    }

    const correct = options.find((o) => o.is_correct)?.label;

    try {
      await updateQuestion({
        id: q.question_id,
        data: {
          question_text: questionText,
          points: 1,
          options: options.map((o) => ({
            label: o.label,
            option_text: o.text,
            is_correct: o.is_correct,
          })),
          correct_answer: correct,
        },
      }).unwrap();

      toast.success("Đã lưu thay đổi!");
      refetch();
    } catch (err) {
      toast.error("Lưu thất bại, vui lòng thử lại!");
    }
  };

  const handleDelete = async () => {
    try {
      await deleteQuestion(q.question_id).unwrap();
      toast.success("Đã xoá câu hỏi!");

      setCurrent((prev) => Math.max(0, prev - 1));
      refetch();
    } catch (err) {
      toast.error("Xoá thất bại, vui lòng thử lại!");
    }
  };

  const handleCreate = async () => {
    if (!newText.trim()) {
      return toast.error("Câu hỏi không được để trống!");
    }

    if (newOptions.some((o) => !o.text.trim())) {
      return toast.error("Nhập đầy đủ 4 đáp án A, B, C, D!");
    }

    if (!newOptions.some((o) => o.is_correct)) {
      return toast.error("Vui lòng chọn đáp án đúng!");
    }

    const correct = newOptions.find((o) => o.is_correct)?.label;

    const payload = {
      question_text: newText,
      points: 1,
      order_in_test: questions.length + 1,
      options: newOptions.map((o) => ({
        label: o.label,
        option_text: o.text,
        is_correct: o.is_correct,
      })),
      mock_test_id: testId,
      correct_answer: correct,
    };

    try {
      await createQuestion(payload).unwrap();

      toast.success("Tạo câu hỏi thành công!");

      setIsCreateModal(false);
      setNewText("");
      setNewOptions([
        { label: "A", text: "", is_correct: false },
        { label: "B", text: "", is_correct: false },
        { label: "C", text: "", is_correct: false },
        { label: "D", text: "", is_correct: false },
      ]);

      refetch();
    } catch (err) {
      toast.error("Tạo câu hỏi thất bại, thử lại!");
    }
  };

  /* ===========================================================
     UI
  ============================================================ */
  return (
    <div style={{ padding: 20, maxWidth: 860, margin: "auto" }}>
      <ToastContainer position="top-right" autoClose={3000} />

      <Row gutter={20}>
        {/* LEFT */}
        <Col span={17}>
          {q && (
            <Card
              title={<Title level={4}>Câu {current + 1}</Title>}
              style={{ borderRadius: 12 }}>
              {/* Question */}
              <Card size="small" style={{ marginBottom: 16 }}>
                <Input.TextArea
                  rows={2}
                  value={questionText}
                  placeholder="Nhập câu hỏi..."
                  onChange={(e) => setQuestionText(e.target.value)}
                />
              </Card>

              {/* OPTIONS */}
              <Card size="small">
                <Row gutter={[12, 12]}>
                  {options.map((opt, idx) => (
                    <Col span={12} key={idx}>
                      <OptionCard
                        option={opt}
                        onChange={(v: any) => {
                          const u = [...options];
                          u[idx].text = v;
                          setOptions(u);
                        }}
                        onSelectCorrect={() =>
                          setOptions((prev) =>
                            prev.map((o, i) => ({
                              ...o,
                              is_correct: i === idx,
                            }))
                          )
                        }
                      />
                    </Col>
                  ))}
                </Row>

                <div
                  style={{
                    marginTop: 20,
                    display: "flex",
                    justifyContent: "space-between",
                  }}>
                  <Button danger onClick={handleDelete}>
                    Xóa
                  </Button>
                  <Button type="primary" onClick={handleSave}>
                    Lưu
                  </Button>
                </div>
              </Card>
            </Card>
          )}
        </Col>

        {/* RIGHT */}
        <Col span={7}>
          <Card title="Danh sách câu hỏi">
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(5, 1fr)",
                gap: 10,
              }}>
              {questions.map((_: any, i: any) => (
                <Button
                  key={i}
                  type={i === current ? "primary" : "default"}
                  shape="circle"
                  onClick={() => setCurrent(i)}>
                  {i + 1}
                </Button>
              ))}
            </div>

            <Button
              type="dashed"
              block
              style={{ marginTop: 16 }}
              onClick={() => setIsCreateModal(true)}>
              + Thêm câu hỏi
            </Button>
          </Card>
        </Col>
      </Row>

      {/* ======================================
           CREATE MODAL
      ====================================== */}
      <Modal
        title="Thêm câu hỏi mới"
        open={isCreateModal}
        onCancel={() => setIsCreateModal(false)}
        onOk={handleCreate}>
        <Input.TextArea
          rows={2}
          placeholder="Nhập câu hỏi..."
          value={newText}
          onChange={(e) => setNewText(e.target.value)}
          style={{ marginBottom: 12 }}
        />

        <Row gutter={[12, 12]}>
          {newOptions.map((opt, idx) => (
            <Col span={12} key={idx}>
              <OptionCard
                option={opt}
                onChange={(v: any) => {
                  const u = [...newOptions];
                  u[idx].text = v;
                  setNewOptions(u);
                }}
                onSelectCorrect={() =>
                  setNewOptions((prev) =>
                    prev.map((o, i) => ({
                      ...o,
                      is_correct: i === idx,
                    }))
                  )
                }
              />
            </Col>
          ))}
        </Row>
      </Modal>
    </div>
  );
}
