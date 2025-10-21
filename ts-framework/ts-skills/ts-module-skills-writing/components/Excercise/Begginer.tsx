import { useState, CSSProperties } from "react";
import {
  Card,
  Button,
  Input,
  Space,
  Tag,
  message,
  Progress,
  Typography,
} from "antd";
import { CheckCircle, XCircle, RotateCcw, BookOpen } from "lucide-react";

const { Title, Paragraph } = Typography;

interface Question {
  id: number;
  sentence: string;
  answer: string;
  hints: string[];
}

const questions: Question[] = [
  {
    id: 1,
    sentence: "I _____ to the store yesterday.",
    answer: "went",
    hints: ["go", "went", "gone", "going"],
  },
  {
    id: 2,
    sentence: "She _____ studying English for three years.",
    answer: "has been",
    hints: ["has been", "is", "was", "will be"],
  },
  {
    id: 3,
    sentence: "If I _____ rich, I would travel the world.",
    answer: "were",
    hints: ["am", "was", "were", "be"],
  },
  {
    id: 4,
    sentence: "The book _____ by millions of people.",
    answer: "was read",
    hints: ["read", "was read", "is reading", "reads"],
  },
  {
    id: 5,
    sentence: "They _____ their homework before dinner.",
    answer: "had finished",
    hints: ["finish", "finished", "had finished", "have finished"],
  },
];

const styles: { [key: string]: CSSProperties } = {
  container: {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #e0f2fe 0%, #ddd6fe 100%)",
    padding: "32px 16px",
  },
  maxWidth: {
    maxWidth: "768px",
    margin: "0 auto",
  },
  header: {
    textAlign: "center",
    marginBottom: "32px",
  },
  headerIcon: {
    display: "inline-flex",
    alignItems: "center",
    gap: "8px",
    marginBottom: "16px",
  },
  headerText: {
    color: "#4b5563",
  },
  card: {
    boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
    marginBottom: "24px",
  },
  progressContainer: {
    marginBottom: "24px",
  },
  progressInfo: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "8px",
  },
  progressLabel: {
    fontSize: "14px",
    color: "#4b5563",
  },
  progressScore: {
    fontSize: "14px",
    fontWeight: 600,
    color: "#2563eb",
  },
  questionSection: {
    marginBottom: "24px",
  },
  questionCard: {
    background: "#f9fafb",
    border: "2px dashed #d1d5db",
  },
  questionText: {
    fontSize: "18px",
    textAlign: "center",
    marginBottom: 0,
    fontWeight: 500,
  },
  hintsSection: {
    marginBottom: "24px",
  },
  hintTag: {
    fontSize: "15px",
    borderRadius: "8px",
    padding: "8px 16px",
    cursor: "pointer",
    transition: "all 0.3s ease",
  },
  answerSection: {
    marginBottom: "24px",
  },
  answerInput: {
    fontSize: "18px",
    borderRadius: "8px",
  },
  resultCard: {
    marginBottom: "24px",
  },
  resultContent: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
  },
  buttonContainer: {
    width: "100%",
    display: "flex",
    gap: "12px",
  },
  actionButton: {
    height: "48px",
    fontSize: "16px",
    borderRadius: "8px",
    flex: 1,
  },
  iconButton: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
  },
  completionCard: {
    boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
    textAlign: "center",
    background: "linear-gradient(to right, #eff6ff, #ede9fe)",
  },
  scoreText: {
    fontSize: "18px",
  },
  scoreHighlight: {
    color: "#2563eb",
  },
};

function BegginerExcercise() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userAnswer, setUserAnswer] = useState("");
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [answeredQuestions, setAnsweredQuestions] = useState<number[]>([]);

  const question = questions[currentQuestion];
  const progress = (answeredQuestions.length / questions.length) * 100;

  const checkAnswer = () => {
    if (!userAnswer.trim()) {
      message.warning("Vui lòng nhập câu trả lời");
      return;
    }

    const isCorrect =
      userAnswer.trim().toLowerCase() === question.answer.toLowerCase();

    if (isCorrect) {
      message.success("Chính xác!");
      setScore(score + 1);
    } else {
      message.error(`Sai rồi! Đáp án đúng là: "${question.answer}"`);
    }

    setShowResult(true);
    setAnsweredQuestions([...answeredQuestions, question.id]);
  };

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setUserAnswer("");
      setShowResult(false);
    } else {
      message.info("Bạn đã hoàn thành tất cả câu hỏi!");
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setUserAnswer("");
    setShowResult(false);
    setScore(0);
    setAnsweredQuestions([]);
  };

  const selectHint = (hint: string) => {
    if (!showResult) {
      setUserAnswer(hint);
    }
  };

  const isCorrect =
    userAnswer.trim().toLowerCase() === question.answer.toLowerCase();

  return (
    <div style={styles.container}>
      <div style={styles.maxWidth}>
        <div style={styles.header}>
          <div style={styles.headerIcon}>
            <BookOpen
              style={{ width: "32px", height: "32px", color: "#2563eb" }}
            />
            <Title level={2} style={{ marginBottom: 0 }}>
              English Writing Practice
            </Title>
          </div>
          <Paragraph style={styles.headerText}>
            Luyện tập điền từ vào chỗ trống
          </Paragraph>
        </div>

        <Card style={styles.card}>
          <div style={styles.progressContainer}>
            <div style={styles.progressInfo}>
              <span style={styles.progressLabel}>
                Câu {currentQuestion + 1} / {questions.length}
              </span>
              <span style={styles.progressScore}>
                Điểm: {score} / {answeredQuestions.length}
              </span>
            </div>
            <Progress
              percent={progress}
              strokeColor={{
                "0%": "#3b82f6",
                "100%": "#8b5cf6",
              }}
              showInfo={false}
            />
          </div>

          <div style={styles.questionSection}>
            <Title level={4} style={{ marginBottom: "16px" }}>
              Điền từ thích hợp vào chỗ trống:
            </Title>
            <Card style={styles.questionCard} bodyStyle={{ padding: "24px" }}>
              <Paragraph style={styles.questionText}>
                {question.sentence}
              </Paragraph>
            </Card>
          </div>

          <div style={styles.hintsSection}>
            <Title level={5} style={{ marginBottom: "12px" }}>
              Gợi ý từ:
            </Title>
            <Space wrap size="middle">
              {question.hints.map((hint, index) => (
                <Tag
                  key={index}
                  color={userAnswer === hint ? "blue" : "default"}
                  onClick={() => selectHint(hint)}
                  style={styles.hintTag}>
                  {hint}
                </Tag>
              ))}
            </Space>
          </div>

          <div style={styles.answerSection}>
            <Title level={5} style={{ marginBottom: "12px" }}>
              Câu trả lời của bạn:
            </Title>
            <Input
              size="large"
              placeholder="Nhập hoặc chọn từ gợi ý..."
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
              disabled={showResult}
              onPressEnter={checkAnswer}
              style={styles.answerInput}
            />
          </div>

          {showResult && (
            <Card
              style={{
                ...styles.resultCard,
                background: isCorrect ? "#f0fdf4" : "#fef2f2",
                borderColor: isCorrect ? "#bbf7d0" : "#fecaca",
              }}
              bodyStyle={{ padding: "16px" }}>
              <div style={styles.resultContent}>
                {isCorrect ? (
                  <>
                    <CheckCircle
                      style={{
                        width: "24px",
                        height: "24px",
                        color: "#16a34a",
                      }}
                    />
                    <div>
                      <div style={{ fontWeight: 600, color: "#166534" }}>
                        Chính xác!
                      </div>
                      <div style={{ fontSize: "14px", color: "#15803d" }}>
                        Bạn đã trả lời đúng.
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <XCircle
                      style={{
                        width: "24px",
                        height: "24px",
                        color: "#dc2626",
                      }}
                    />
                    <div>
                      <div style={{ fontWeight: 600, color: "#991b1b" }}>
                        Chưa chính xác
                      </div>
                      <div style={{ fontSize: "14px", color: "#b91c1c" }}>
                        Đáp án đúng: <strong>{question.answer}</strong>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </Card>
          )}

          <div style={styles.buttonContainer}>
            {!showResult ? (
              <Button
                type="primary"
                size="large"
                onClick={checkAnswer}
                style={styles.actionButton}>
                Kiểm tra
              </Button>
            ) : (
              <>
                {currentQuestion < questions.length - 1 ? (
                  <Button
                    type="primary"
                    size="large"
                    onClick={nextQuestion}
                    style={styles.actionButton}>
                    Câu tiếp theo
                  </Button>
                ) : (
                  <Button
                    type="primary"
                    size="large"
                    onClick={resetQuiz}
                    style={{ ...styles.actionButton, ...styles.iconButton }}>
                    <RotateCcw style={{ width: "20px", height: "20px" }} />
                    Làm lại
                  </Button>
                )}
              </>
            )}
          </div>
        </Card>

        {answeredQuestions.length === questions.length && (
          <Card style={styles.completionCard}>
            <Title level={3}>Hoàn thành! 🎉</Title>
            <Paragraph style={styles.scoreText}>
              Điểm của bạn:{" "}
              <strong style={styles.scoreHighlight}>
                {score}/{questions.length}
              </strong>
            </Paragraph>
            <Paragraph>
              Tỷ lệ chính xác:{" "}
              <strong>{Math.round((score / questions.length) * 100)}%</strong>
            </Paragraph>
          </Card>
        )}
      </div>
    </div>
  );
}

export default BegginerExcercise;
