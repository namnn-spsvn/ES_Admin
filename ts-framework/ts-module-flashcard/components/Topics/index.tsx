import ATable from "@/fer-framework/fe-component/web/ATable";
import React, { useMemo, useState } from "react";
import { Typography, Modal, Form, Input, Select, Button, message, Card } from "antd";
import {
  DeleteFilled,
  EditOutlined,
  PlusOutlined,
  SoundOutlined,
} from "@ant-design/icons";
import { ColumnProps } from "antd/es/table";
import {
  useCreateFlashcardMutation,
  useGetFlashcardByIdQuery,
  useGetFlashCardQuery,
  useUpdateFlashcardMutation,
  useDeleteFlashcardMutation,
} from "../../apis";
import { useHookTable } from "@/fer-framework/fe-cores/common/table";
import { toast, ToastContainer } from "react-toastify";
import ACard from "@/fer-framework/fe-component/web/ACard";
import HeaderOperation from "@/fer-framework/fe-component/web/ATable/HeaderOperation";
import { useRouter } from "next/navigation";
import TableActions from "@/fer-framework/fe-component/web/ATable/TableActions";
import UploadFileBase from "@/fer-framework/fe-module-upload/components/UploadFile";
import UploadVideo from "@/fer-framework/fe-module-upload/components/UploadVideo";
const { Text, Title } = Typography;
const { Option } = Select;

const FlashcardTable: React.FC = () => {
  // ================= GET DATA =================
  const router = useRouter();
  const { data: flashData } = useGetFlashcardByIdQuery({});
  const flashcards = flashData?.items || [];

  const { data: topicData } = useGetFlashCardQuery({});
  const topics = topicData?.items || [];

  // Map topicId → topicTitle
  const topicMap = useMemo(() => {
    const map = new Map();
    topics.forEach((t: any) => map.set(t._id, t.title));
    return map;
  }, [topics]);
  // 👉 Options cho filter theo chủ đề
  const topicOptions = topics.map((t: any) => ({
    text: t.title,
    value: t._id,
  }));
  // ================= TABLE HOOK =================
  const {
    dataSource,
    refresh,
    selectedRowKeys,
    setSelectedRowKeys,
    pagination,
  } = useHookTable({
    useHookApi: useGetFlashcardByIdQuery,
    config: ["word", "meaning_vi"],
    paramsApi: {},
  });

  // ================= STATE =================
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedFlashcard, setSelectedFlashcard] = useState<any>(null);

  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [previewAudio, setPreviewAudio] = useState<string | null>(null);

  const [form] = Form.useForm();

  //state tạo mới
  const [isCreateModalVisible, setIsCreateModalVisible] = useState(false);
  const [createForm] = Form.useForm();
  const [createPreviewImage, setCreatePreviewImage] = useState<string | null>(
    null
  );
  const [createPreviewAudio, setCreatePreviewAudio] = useState<string | null>(
    null
  );

  // API
  const [updateFlashcard, { isLoading: updating }] =
    useUpdateFlashcardMutation();
  const [createFlashcard, { isLoading: creating }] =
    useCreateFlashcardMutation();
  const [deleteFlashcard] = useDeleteFlashcardMutation();
  // chỉnh sauwr
  const handleEdit = (record: any) => {
    setSelectedFlashcard(record);
    setPreviewImage(record.image_url || null);
    setPreviewAudio(record.audio_url || null);

    form.setFieldsValue(record);
    setIsModalVisible(true);
  };
  // tạo mới
  const handleCreateFlashcard = async () => {
    try {
      const values = await createForm.validateFields();

      const payload = {
        ...values,
        topic_id: values.topic_id,
      };

      await createFlashcard(payload).unwrap();

      toast.success("Tạo flashcard thành công!");

      createForm.resetFields();
      setIsCreateModalVisible(false);
      setCreatePreviewImage(null);
      setCreatePreviewAudio(null);
      refresh();
    } catch (err) {
      console.error(err);
      toast.error("Không thể tạo flashcard!");
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setSelectedFlashcard(null);
    form.resetFields();
    setPreviewImage(null);
    setPreviewAudio(null);
  };

  const handleSave = () => {
    if (!selectedFlashcard?._id) {
      toast.error("Không tìm thấy ID flashcard để cập nhật");
      return;
    }

    form.validateFields().then(async (values) => {
      try {
        const payload = {
          ...values,
          topic_id: values.topic_id,
        };

        await updateFlashcard({
          id: selectedFlashcard._id,
          data: payload,
        }).unwrap();

        toast.success("Cập nhật flashcard thành công!");

        setIsModalVisible(false);
        refresh();
      } catch (err) {
        console.error(err);
        toast.error("Không thể cập nhật flashcard!");
      }
    });
  };

  const columns: ColumnProps<any>[] = [
    {
      title: "Từ vựng",
      dataIndex: "word",
      key: "word",
    },
    {
      title: "Ý nghĩa",
      dataIndex: "meaning_vi",
      key: "meaning_vi",
      align: "center",
    },
    {
      title: "Chủ đề",
      dataIndex: "topic_id",
      key: "topic_id",
      align: "center",
      filters: topicOptions,
      onFilter: (value, record) => record.topic_id === value,
      render: (topicId: string) => (
        <span>{topicMap.get(topicId) || "Không xác định"}</span>
      ),
    },

    {
      title: "Hoạt động",
      key: "action",
      align: "center",
      render: (_, record) => (
        <TableActions
          record={record}
          actions={[
            {
              key: "edit",
              label: "Chỉnh sửa",
              icon: <EditOutlined></EditOutlined>,
              action: (record: any) => {
                handleEdit(record);
              },
            },
            {
              key: "delete",
              label: "Xóa",
              icon: <DeleteFilled style={{ color: "red" }} />,
              action: async (rec: any) => {
                if (!rec?._id) {
                  toast.error("Không tìm thấy ID flashcard để xoá");
                  return;
                }

                const confirmed = window.confirm(
                  "Bạn có chắc chắn muốn xoá flashcard này?"
                );
                if (!confirmed) return;

                try {
                  await deleteFlashcard(rec._id).unwrap();
                  toast.success("Xoá flashcard thành công!");
                  refresh();
                } catch (err) {
                  console.error(err);
                  toast.error("Không thể xoá flashcard!");
                }
              },
            },
          ]}
        />
      ),
    },
  ];

  return (
    <div style={{ padding: 24, background: "#fff", borderRadius: 12 }}>
      <ToastContainer position="top-right" autoClose={3000} />
      <Typography.Title level={3} style={{ color: "#6a11cb" }}>
        Danh sách Flashcard
      </Typography.Title>

      <ACard>
        <HeaderOperation
          add={
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={() => setIsCreateModalVisible(true)}>
              Thêm mới
            </Button>
          }
        />
        <ATable
          rowKey={"_id"}
          dataSource={dataSource}
          columns={columns}
          pagination={pagination}
          // rowSelection={{
          //   selectedRowKeys,
          //   onChange: (keys) => setSelectedRowKeys(keys),
          // }}
          size="large"
        />
      </ACard>

      <Modal
        title="Chỉnh sửa Flashcard"
        open={isModalVisible}
        onCancel={handleCancel}
        onOk={handleSave}
        okButtonProps={{ loading: updating }}
        width={750}
        okText="Lưu thay đổi"
        cancelText="Hủy"
      >
        <Form form={form} layout="vertical">
          <Form.Item name="word" label="Từ vựng" rules={[{ required: true }]}>
            <Input />
          </Form.Item>

          <Form.Item name="phonetic" label="Phiên âm">
            <Input />
          </Form.Item>

          <Form.Item name="part_of_speech" label="Từ loại">
            <Select placeholder="Chọn từ loại">
              <Option value="noun">Noun (Danh từ)</Option>
              <Option value="verb">Verb (Động từ)</Option>
              <Option value="adjective">Adjective (Tính từ)</Option>
              <Option value="adverb">Adverb (Trạng từ)</Option>
            </Select>
          </Form.Item>



          <Form.Item name="meaning_vi" label="Nghĩa tiếng Việt">
            <Input />
          </Form.Item>

          <Form.Item name="example_en" label="Ví dụ tiếng Anh">
            <Input.TextArea rows={2} />
          </Form.Item>

          <Form.Item name="example_vi" label="Ví dụ tiếng Việt">
            <Input.TextArea rows={2} />
          </Form.Item>
          <Form.Item name="image_url" label="Ảnh minh họa">
            <Card
              size="small"
              style={{ borderRadius: 8, marginBottom: 14 }}
              title="Ảnh minh họa"
            >
              <UploadFileBase
                initValues={previewImage}
                listType="picture-card"
                maxCount={1}
                accept="image/*"
                handleSaveImage={(url) => {
                  setPreviewImage(url);
                  form.setFieldsValue({ image_url: url });
                }}
                returnObject
              >
                <button style={{ border: 0, background: "none" }} type="button">
                  <PlusOutlined />
                  <div style={{ marginTop: 4, fontSize: 12 }}>Upload</div>
                </button>
              </UploadFileBase>

              {previewImage && (
                <img
                  src={previewImage}
                  style={{
                    width: 140,
                    height: 140,
                    marginTop: 10,
                    borderRadius: 8,
                    objectFit: "cover",
                  }}
                />
              )}
            </Card>
          </Form.Item>
          <Form.Item name="audio_url" label="Audio">
            <Card
              size="small"
              style={{ borderRadius: 8, marginBottom: 14 }}
              title="Audio"
            >
              {previewAudio && (
                <Button
                  type="primary"
                  icon={<SoundOutlined />}
                  onClick={() => new Audio(previewAudio).play()}
                  style={{ marginBottom: 8 }}
                >
                  Nghe thử
                </Button>
              )}

              <UploadVideo
                listType="picture-card"
                maxCount={1}
                initValues={previewAudio}
                accept="audio/*"
                handleSaveVideo={(url) => {
                  setPreviewAudio(url);
                  form.setFieldsValue({ audio_url: url });
                }}
                returnObject
              >
                <button style={{ border: 0, background: "none" }} type="button">
                  <PlusOutlined />
                  <div style={{ marginTop: 4, fontSize: 12 }}>Upload</div>
                </button>
              </UploadVideo>
            </Card>
          </Form.Item>

          <Form.Item name="topic_id" label="Chủ đề">
            <Select placeholder="Chọn chủ đề">
              {topics.map((t: any) => (
                <Option key={t._id} value={t._id}>
                  {t.title}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </Form>
      </Modal>


      {/* ====================== CREATE MODAL ====================== */}
      <Modal
        title="Tạo flashcard mới"
        open={isCreateModalVisible}
        onCancel={() => {
          setIsCreateModalVisible(false);
          createForm.resetFields();
          setCreatePreviewImage(null);
          setCreatePreviewAudio(null);
        }}
        onOk={handleCreateFlashcard}
        okButtonProps={{ loading: creating }}
        width={750}
        okText="Tạo mới"
        cancelText="Hủy"
      >
        <Form layout="vertical" form={createForm}>
          <Form.Item name="word" label="Từ vựng" rules={[{ required: true }]}>
            <Input />
          </Form.Item>

          <Form.Item name="phonetic" label="Phiên âm">
            <Input />
          </Form.Item>

          <Form.Item name="part_of_speech" label="Từ loại" rules={[{ required: true }]}>
            <Select placeholder="Chọn từ loại">
              <Option value="noun">Noun (Danh từ)</Option>
              <Option value="verb">Verb (Động từ)</Option>
              <Option value="adjective">Adjective (Tính từ)</Option>
              <Option value="adverb">Adverb (Trạng từ)</Option>
            </Select>
          </Form.Item>



          <Form.Item name="meaning_vi" label="Nghĩa tiếng Việt">
            <Input />
          </Form.Item>

          <Form.Item name="example_en" label="Ví dụ tiếng Anh">
            <Input.TextArea rows={2} />
          </Form.Item>

          <Form.Item name="example_vi" label="Ví dụ tiếng Việt">
            <Input.TextArea rows={2} />
          </Form.Item>
          <Form.Item name="image_url" label="Ảnh minh họa">
            <Card
              size="small"
              title="Ảnh minh họa"
              style={{ borderRadius: 8 }}
            >
              <UploadFileBase
                listType="picture-card"
                maxCount={1}
                accept="image/*"
                initValues={createPreviewImage}
                handleSaveImage={(url) => {
                  setCreatePreviewImage(url);
                  createForm.setFieldsValue({ image_url: url });
                }}
                returnObject
              >
                <button style={{ border: 0, background: "none" }} type="button">
                  <PlusOutlined />
                  <div style={{ marginTop: 4, fontSize: 12 }}>Upload</div>
                </button>
              </UploadFileBase>

              {createPreviewImage && (
                <img
                  src={createPreviewImage}
                  style={{
                    width: 140,
                    height: 140,
                    marginTop: 10,
                    borderRadius: 8,
                    objectFit: "cover",
                  }}
                />
              )}
            </Card>
          </Form.Item>

          <Form.Item name="audio_url" label="Audio">
            <Card size="small" title="Audio">
              {createPreviewAudio && (
                <Button
                  icon={<SoundOutlined />}
                  onClick={() => new Audio(createPreviewAudio).play()}
                  style={{ marginBottom: 8 }}
                >
                  Nghe thử
                </Button>
              )}

              <UploadVideo
                listType="picture-card"
                maxCount={1}
                accept="audio/*"
                initValues={createPreviewAudio}
                handleSaveVideo={(url) => {
                  setCreatePreviewAudio(url);
                  createForm.setFieldsValue({ audio_url: url });
                }}
                returnObject
              >
                <button style={{ border: 0, background: "none" }} type="button">
                  <PlusOutlined />
                  <div style={{ marginTop: 4, fontSize: 12 }}>Upload</div>
                </button>
              </UploadVideo>
            </Card>
          </Form.Item>

          <Form.Item name="topic_id" label="Chủ đề" rules={[{ required: true }]}>
            <Select placeholder="Chọn chủ đề">
              {topics.map((t: any) => (
                <Option key={t._id} value={t._id}>
                  {t.title}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </Form>
      </Modal>

    </div>
  );
};

export default FlashcardTable;
