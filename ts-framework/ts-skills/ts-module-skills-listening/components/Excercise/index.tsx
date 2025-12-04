"use client";

import { useParams, useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import {
    Card,
    Button,
    Spin,
    Input,
    Row,
    Col,
    Image,
    Space,
    Typography,
} from "antd";
import { ArrowLeftOutlined, CaretRightOutlined, PauseOutlined, PictureOutlined, PlusOutlined } from "@ant-design/icons";
import {
    useGetContentQuery,
    useGetContentDetailQuery,
    useUpdateContentMutation,
    useUpdateQuestionMutation,
    useUpdateOptionMutation,
    useCreateContentMutation,
    useCreateQuestionMutation,
    useCreateQuestionOptionsMutation,
    useDeleteContentMutation,
    useDeleteQuestionMutation,
} from "../../apis/index";

import ContentProgress from "./ContentProgress";
import OptionCard from "../OptionCard";
import UploadVideo from "@/fer-framework/fe-module-upload/components/UploadVideo";
import { toast, ToastContainer } from "react-toastify";
import UploadFileBase from "@/fer-framework/fe-module-upload/components/UploadFile";
const { Text, Title } = Typography;
export default function TopicDetailPage() {
    const { id, topic } = useParams();
    const router = useRouter();
    const topic_id = id as string;
    const topic_name = topic as string;


    const [currentIndex, setCurrentIndex] = useState(0);
    const [detail, setDetail] = useState<any>(null);
    const [isNew, setIsNew] = useState(false);

    // CREATE FORM
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

    const handleSaveVideo = (url: any) => {
        setAudioUrl(url);
        setDetail((prev: any) => ({
            ...prev,
            item: {
                ...prev.item,
                media_audio_url: url,
            }
        }));
    };
    const handleSaveImage = (url: any) => {
        setImageUrl(url);
        setDetail((prev: any) => ({
            ...prev,
            item: {
                ...prev.item,
                media_image_url: url,
            }
        }));
    };


    const {
        data: contentData,
        isLoading: loadingList,
        refetch: refetchContent,
    } = useGetContentQuery({ topic_id });

    const contents = contentData?.items || [];

    const contentId = !isNew && contents[currentIndex]?._id;

    const {
        data: contentDetail,
        isLoading: loadingDetail,
        refetch: refetchDetail,
    } = useGetContentDetailQuery(contentId!, {
        skip: !contentId || isNew,
    });

    // Mutations
    const [updateContent, { isLoading: isUpdatingContent }] = useUpdateContentMutation();
    const [updateQuestion, { isLoading: isUpdatingQuestion }] = useUpdateQuestionMutation();
    const [updateOption, { isLoading: isUpdatingOption }] = useUpdateOptionMutation();

    const [deleteContent, { isLoading: isDeletingContent }] = useDeleteContentMutation();
    const [deleteQuestion, { isLoading: isDeletingQuestion }] = useDeleteQuestionMutation();


    const [createContent, { isLoading: isCreatingContent }] = useCreateContentMutation();
    const [createQuestion, { isLoading: isCreatingQuestion }] = useCreateQuestionMutation();
    const [createQuestionOptions, { isLoading: isCreatingOptions }] =
        useCreateQuestionOptionsMutation();
    const [audioPlayer, setAudioPlayer] = useState<HTMLAudioElement | null>(null);

    const isSaving =
        isUpdatingContent ||
        isUpdatingQuestion ||
        isUpdatingOption ||
        isCreatingContent ||
        isCreatingQuestion ||
        isCreatingOptions||
        isDeletingContent ||
        isDeletingQuestion
        ;

    useEffect(() => {
        if (loadingList) return;

        if (!contents || contents.length === 0) {
            setIsNew(true);
            setCurrentIndex(0);
        } else {
            setIsNew(false);
        }
    }, [loadingList]);

    useEffect(() => {
        if (isNew) {
            const topicLevel = contentData?.topic?.level;
            setDetail({
                item: {
                    topic_id,
                    type: "LISTENING_AUDIO",
                    title: topic_name ,
                    body_text: "",
                    media_image_url: "",
                    media_audio_url: "",
                    meta: { level: topicLevel, skill: "LISTENING" },
                    is_published: false,
                },
                questions: [
                    {
                        question_text: "",
                        options: [
                            { label: "A", option_text: "" },
                            { label: "B", option_text: "" },
                            { label: "C", option_text: "" },
                            { label: "D", option_text: "" },
                        ],
                    },
                ],
            });
        } else if (contentDetail) {
            setDetail(contentDetail);
        }
    }, [isNew, contentDetail, topic_id]);

    const handleChangeField = (field: string, value: string) => {
        setDetail((prev: any) => ({
            ...prev,
            item: { ...prev.item, [field]: value },
        }));
    };

    const handleChangeQuestion = (field: string, value: string) => {
        setDetail((prev: any) => ({
            ...prev,
            questions: [{ ...prev.questions[0], [field]: value }],
        }));
    };

    const handleChangeOption = (index: number, value: string) => {
        setDetail((prev: any) => {
            const updated = [...prev.questions[0].options];
            updated[index] = { ...updated[index], option_text: value };
            return {
                ...prev,
                questions: [{ ...prev.questions[0], options: updated }],
            };
        });
    };

    const handleSelectCorrect = (index: number) => {
        setDetail((prev: any) => {
            const updated = prev.questions[0].options.map((opt: any, i: number) => ({
                ...opt,
                is_correct: i === index,
            }));
            return {
                ...prev,
                questions: [{ ...prev.questions[0], options: updated }],
            };
        });
    };

    const handlePlayAudio = () => {
        const url = detail?.item?.media_audio_url;
        if (!url) return;

        if (audioPlayer) {
            audioPlayer.pause();
            audioPlayer.currentTime = 0;
            setAudioPlayer(null);
            return;
        }

        const player = new Audio(url);
        setAudioPlayer(player);
        player.play();

        player.onended = () => setAudioPlayer(null);
    };
    const handleNext = () => {
        if (currentIndex < contents.length - 1) {
            setCurrentIndex((prev) => prev + 1);
            setIsNew(false);
        } else {
            setIsNew(true);
            resetCreateForm();
        }
    };

    const handlePrev = () => {
        if (isNew) {
            setIsNew(false);
            setCurrentIndex(contents.length - 1);
        } else if (currentIndex > 0) {
            setCurrentIndex((prev) => prev - 1);
        }
    };

    const handleSaveEdit = async () => {
        const { item, questions } = detail;
        const question = questions[0];

        if (!item.body_text?.trim())
            return toast.error("Nội dung đoạn văn không được để trống!");

        if (!question.question_text?.trim())
            return toast.error("Câu hỏi không được để trống!");

        if (!item.media_image_url?.trim())
            return toast.error("Vui lòng tải lên hình ảnh!");

        if (!item.media_audio_url?.trim())
            return toast.error("Vui lòng tải lên audio!");
        if (question.options.some((o: any) => !o.option_text.trim()))
            return toast.error("Tất cả lựa chọn phải được nhập!");
        if (!question.options.some((o: any) => o.is_correct))
            return toast.error("Phải chọn đáp án đúng!");

        try {
            const contentPayload: any = {
                // title: item.body_text,
                type: item.type,
                topic_id: item.topic_id,
                body_text: item.body_text,
                is_published: item.is_published,
                meta: item.meta,
            };

            if (item.media_image_url)
                contentPayload.media_image_url = item.media_image_url;
            if (item.media_audio_url)
                contentPayload.media_audio_url = item.media_audio_url;

            await updateContent({ id: item._id, data: contentPayload }).unwrap();

            await updateQuestion({
                id: question._id,
                data: {
                    content_item_id: question.content_item_id,
                    question_type: question.question_type,
                    question_text: question.question_text,
                    points: question.points,
                    order_in_item: question.order_in_item,
                },
            }).unwrap();

            for (const option of question.options) {
                await updateOption({
                    id: option._id,
                    data: {
                        option_text: option.option_text,
                        label: option.label,
                        is_correct: option.is_correct,
                    },
                }).unwrap();
            }

            await refetchContent();
            await refetchDetail();
            toast.success("Đã lưu thay đổi!");
        } catch (error) {
            toast.error("Lưu thất bại");
        }
    };

    const handleDelete = async () => {
        if (!detail?.item?._id) return;

        const confirmDelete = confirm("Bạn có chắc muốn xóa câu hỏi này?");
        if (!confirmDelete) return;
        
        try {
            const contentId = detail.item._id;
            await deleteContent(contentId).unwrap();
            toast.success("Đã xóa thành công!");
            await refetchContent();
            if (currentIndex > 0) {
                setCurrentIndex(currentIndex - 1);
            } else {
                setIsNew(true);
                resetCreateForm();
            }
        } catch (err) {
            console.error(err);
            toast.error("Xóa thất bại!");
        }
    };


    const handleSaveNew = async () => {
        if (!bodyText.trim())
            return toast.error("Nội dung đoạn văn không được để trống!");

        if (!questionText.trim())
            return toast.error("Câu hỏi không được để trống!");

        if (!imageUrl?.trim())
            return toast.error("Vui lòng tải lên hình ảnh!");

        if (!audioUrl?.trim())
            return toast.error("Vui lòng tải lên audio!");

        if (options.some((o) => !o.option_text.trim()))
            return toast.error("Nhập đầy đủ A, B, C, D!");
        if (!options.some((o) => o.is_correct))
            return toast.error("Chọn đáp án đúng!");

        try {
            const contentPayload: any = {
                title: topic_name,
                type: "LISTENING_AUDIO",
                topic_id,
                is_published: true,
                body_text: bodyText,
                meta: {
                    level: detail?.item?.meta?.level,
                    skill: "LISTENING",
                },
            };

            if (imageUrl) contentPayload.media_image_url = imageUrl;
            if (audioUrl) contentPayload.media_audio_url = audioUrl;

            const contentResponse = await createContent(contentPayload).unwrap();
            const contentItemId = contentResponse._id;

            const questionResponse = await createQuestion({
                contentItemId,
                data: {
                    content_item_id: contentItemId,
                    question_text: questionText,
                    question_type: "OPEN_ENDED",
                    points: 5,
                    order_in_item: contents.length + 1,
                },
            }).unwrap();

            await createQuestionOptions({
                questionId: questionResponse._id,
                data: {
                    options: options.map((o) => ({
                        label: o.label,
                        option_text: o.option_text,
                        is_correct: o.is_correct,
                    })),
                },
            }).unwrap();

            toast.success("Tạo câu hỏi thành công!");

            resetCreateForm();
            refetchContent();
            setIsNew(false);
            setCurrentIndex(contents.length);
        } catch (error) {
            console.error(error);
            toast.error("Có lỗi xảy ra khi tạo câu hỏi!");
        }
    };

    const resetCreateForm = () => {
        setQuestionText("");
        setBodyText("");
        setOptions([
            { label: "A", option_text: "", is_correct: false },
            { label: "B", option_text: "", is_correct: false },
            { label: "C", option_text: "", is_correct: false },
            { label: "D", option_text: "", is_correct: false },
        ]);
        setAudioUrl("");
        setImageUrl("");
    };

    if (loadingList || loadingDetail || !detail)
        return <Spin size="large" style={{ marginTop: 100, display: "block" }} />;

    const { item, questions } = detail;
    const question = questions[0];

    return (
        <div style={{ maxWidth: 860, margin: "auto", padding: 20 }}>
            <ToastContainer position="top-right" autoClose={3000} />

            {/* BACK BUTTON */}
            <Button
                type="text"
                icon={<ArrowLeftOutlined />}
                onClick={() => router.push("/skills/listening")}
                style={{ marginBottom: 8, fontSize: 15, color: "#555" }}
            />

            {/* PROGRESS */}
            {!isNew && (
                <ContentProgress currentIndex={currentIndex} total={contents.length} />
            )}

            <Card
                title={
                    <span style={{ fontSize: 16, fontWeight: 600 }}>
                        {isNew ? "Tạo câu hỏi mới" : "Chỉnh sửa nội dung"}
                    </span>
                }
                style={{
                    borderRadius: 10,
                    padding: 12,
                    boxShadow: "0 2px 12px rgba(0,0,0,0.04)",
                }}

            >
                {/* ============================
                EDIT MODE
            =============================== */}
                {!isNew ? (
                    <>
                        {/* AUDIO */}
                        <Card
                            size="small"
                            style={{ borderRadius: 8, marginBottom: 14 }}
                            title={<Text strong>Audio</Text>}
                        >
                            <Space align="center" style={{ marginBottom: 8 }}>
                                <Button
                                    type="primary"
                                    shape="circle"
                                    size="middle"
                                    disabled={!detail?.item?.media_audio_url}
                                    onClick={handlePlayAudio}
                                >
                                    {audioPlayer ? <PauseOutlined /> : <CaretRightOutlined />}

                                </Button>
                                <Text style={{ fontSize: 13 }}>Nghe thử</Text>
                            </Space>

                            <UploadVideo
                                listType="picture-card"
                                maxCount={1}
                                initValues={detail?.item?.media_audio_url}
                                accept="audio/*"
                                handleSaveVideo={handleSaveVideo}
                                returnObject
                            >
                                <button style={{ border: 0, background: "none" }} type="button">
                                    <PlusOutlined />
                                    <div style={{ marginTop: 4, fontSize: 12 }}>Upload</div>
                                </button>
                            </UploadVideo>
                        </Card>

                        {/* IMAGE */}
                        <Card
                            size="small"
                            style={{ borderRadius: 8, marginBottom: 14 }}
                            title={<Text strong>Ảnh minh họa</Text>}
                        >
                            <UploadFileBase
                                initValues={detail?.item?.media_image_url}
                                listType="picture-card"
                                maxCount={1}
                                accept="image/*"
                                handleSaveImage={handleSaveImage}
                                returnObject
                            >
                                <button style={{ border: 0, background: "none" }} type="button">
                                    <PlusOutlined />
                                    <div style={{ marginTop: 4, fontSize: 12 }}>Upload</div>
                                </button>
                            </UploadFileBase>
                        </Card>

                        {/* BODY */}
                        <Card
                            size="small"
                            style={{ borderRadius: 8, marginBottom: 14 }}
                            title={<Text strong>Nội dung đoạn văn</Text>}

                        >
                            <Input.TextArea
                                rows={3}
                                placeholder="Nhập nội dung..."
                                value={item.body_text}
                                onChange={(e) =>
                                    handleChangeField("body_text", e.target.value)
                                }
                                style={{ borderRadius: 6, fontSize: 14 }}
                            />
                        </Card>

                        {/* QUESTION */}
                        <Card
                            size="small"
                            style={{ borderRadius: 8, marginBottom: 14 }}
                            title={<Text strong>Câu hỏi</Text>}

                        >
                            <Input
                                size="small"
                                placeholder="Nhập câu hỏi..."
                                value={question.question_text}
                                onChange={(e) =>
                                    handleChangeQuestion("question_text", e.target.value)
                                }
                                style={{
                                    marginBottom: 12,
                                    borderRadius: 6,
                                    fontSize: 14,
                                    padding: "6px 10px",
                                }}
                            />

                            <Row gutter={[12, 12]}>
                                {question.options.map((opt: any, idx: number) => (
                                    <Col span={12} key={idx}>
                                        <OptionCard
                                            option={opt}
                                            onChange={(val) => handleChangeOption(idx, val)}
                                            onSelectCorrect={() =>
                                                handleSelectCorrect(idx)
                                            }
                                        />
                                    </Col>
                                ))}
                            </Row>
                        </Card>
                    </>
                ) : (
                    <>
                        {/* ============================
                        CREATE MODE
                    =============================== */}



                        {/* BODY */}
                        <Card
                            size="small"
                            style={{ borderRadius: 8, marginBottom: 14 }}
                            title={<Text strong>Nội dung đoạn văn</Text>}

                        >
                            <Input.TextArea
                                rows={3}
                                placeholder="Nhập đoạn văn..."
                                value={bodyText}
                                onChange={(e) => setBodyText(e.target.value)}
                                style={{ borderRadius: 6, fontSize: 14 }}
                            />
                        </Card>

                        {/* AUDIO */}
                        <Card
                            size="small"
                            style={{ borderRadius: 8, marginBottom: 14 }}
                            title={<Text strong>Audio</Text>}
                        >
                            <Space align="center" style={{ marginBottom: 8 }}>
                                <Button
                                    type="primary"
                                    shape="circle"
                                    size="middle"
                                    disabled={!detail?.item?.media_audio_url}
                                    onClick={handlePlayAudio}
                                >
                                    {audioPlayer ? <PauseOutlined /> : <CaretRightOutlined />}
                                </Button>
                                <Text style={{ fontSize: 13 }}>Nghe thử</Text>
                            </Space>

                            <UploadVideo
                                listType="picture-card"
                                maxCount={1}
                                accept="audio/*"
                                handleSaveVideo={handleSaveVideo}
                                returnObject
                            >
                                <button style={{ border: 0, background: "none" }} type="button">
                                    <PlusOutlined />
                                    <div style={{ marginTop: 4, fontSize: 12 }}>Upload</div>
                                </button>
                            </UploadVideo>
                        </Card>

                        {/* IMAGE */}
                        <Card
                            size="small"
                            style={{ borderRadius: 8, marginBottom: 14 }}
                            title={<Text strong>Ảnh minh họa</Text>}
                        >
                            <UploadFileBase
                                listType="picture-card"
                                maxCount={1}
                                accept="image/*"
                                handleSaveImage={handleSaveImage}
                                returnObject
                            >
                                <button style={{ border: 0, background: "none" }} type="button">
                                    <PlusOutlined />
                                    <div style={{ marginTop: 4, fontSize: 12 }}>Upload</div>
                                </button>
                            </UploadFileBase>
                        </Card>

                        {/* QUESTION */}
                        <Card
                            size="small"
                            style={{ borderRadius: 8, marginBottom: 14 }}
                            title={<Text strong>Câu hỏi</Text>}
                        >
                            <Input.TextArea
                                rows={2}
                                placeholder="Nhập câu hỏi..."
                                value={questionText}
                                onChange={(e) => setQuestionText(e.target.value)}
                                style={{ borderRadius: 6, fontSize: 14 }}
                            />
                        </Card>
                        {/* OPTIONS */}
                        <Card
                            size="small"
                            style={{ borderRadius: 8, marginBottom: 14 }}
                            title={<Text strong>Đáp án</Text>}

                        >
                            <Row gutter={[12, 12]}>
                                {options.map((opt, idx) => (
                                    <Col span={12} key={idx}>
                                        <OptionCard
                                            option={opt}
                                            onChange={(val) =>
                                                setOptions((prev) => {
                                                    const u = [...prev];
                                                    u[idx].option_text = val;
                                                    return u;
                                                })
                                            }
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
                        </Card>
                    </>
                )}

                {/* BUTTONS */}
                <div
                    style={{
                        marginTop: 18,
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        gap: 12,
                    }}
                >
                    {/* LEFT SIDE BUTTONS */}
                    <div style={{ display: "flex", gap: 12 }}>
                        <Button
                            onClick={handlePrev}
                            disabled={currentIndex === 0 && !isNew}
                            style={{
                                padding: "0 20px",
                                height: 34,
                                fontSize: 14,
                            }}
                        >
                            Câu trước
                        </Button>

                        {!isNew && (
                            <Button
                                danger
                                style={{
                                    padding: "0 20px",
                                    height: 34,
                                    fontSize: 14,
                                    fontWeight: 600,
                                }}
                                onClick={handleDelete}
                            >
                                Xóa
                            </Button>
                        )}
                    </div>

                    {/* RIGHT SIDE BUTTONS */}
                    <div style={{ display: "flex", gap: 12 }}>
                        <Button
                            type="default"
                            loading={isSaving}
                            onClick={isNew ? handleSaveNew : handleSaveEdit}
                            style={{
                                padding: "0 20px",
                                height: 34,
                                fontSize: 14,
                            }}
                        >
                            {isNew ? "Tạo mới" : "Lưu"}
                        </Button>

                        {!isNew && (
                            <Button
                                type="primary"
                                style={{
                                    background: "#6a11cb",
                                    padding: "0 20px",
                                    height: 34,
                                    fontSize: 14,
                                    fontWeight: 600,
                                }}
                                onClick={handleNext}
                            >
                                {currentIndex === contents.length - 1 ? "Thêm mới" : "Tiếp theo"}
                            </Button>
                        )}
                    </div>
                </div>

            </Card>
        </div>
    );


}
