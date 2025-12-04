import ATable from "@/fer-framework/fe-component/web/ATable";
import React, { useState } from "react";
import { Typography, Modal, Form, Input, Button, InputNumber } from "antd";
import { DeleteFilled, EditOutlined, PlusOutlined } from "@ant-design/icons";
import { ColumnProps } from "antd/es/table";

import {
  useGetMockTestsQuery,
  useCreateMockTestMutation,
  useUpdateMockTestMutation,
  useDeleteMockTestMutation,
} from "../../apis";

import { useRouter } from "next/navigation";
import { useHookTable } from "@/fer-framework/fe-cores/common/table";
import { toast, ToastContainer } from "react-toastify";

import ACard from "@/fer-framework/fe-component/web/ACard";
import HeaderOperation from "@/fer-framework/fe-component/web/ATable/HeaderOperation";
import TableActions from "@/fer-framework/fe-component/web/ATable/TableActions";

const MockTestTable: React.FC = () => {
  const router = useRouter();
  // ================= API HOOKS =================
  const { data: testData } = useGetMockTestsQuery({});
  const tests = testData?.items || [];

  const [createMockTest, { isLoading: creating }] = useCreateMockTestMutation();
  const [updateMockTest, { isLoading: updating }] = useUpdateMockTestMutation();
  const [deleteMockTest] = useDeleteMockTestMutation();

  // ================= TABLE HOOK =================
  const {
    dataSource,
    refresh,
    selectedRowKeys,
    setSelectedRowKeys,
    pagination,
  } = useHookTable({
    useHookApi: useGetMockTestsQuery,
    config: ["title"],
    paramsApi: {},
  });

  // ================= STATE =================
  const [isCreateModalVisible, setIsCreateModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);

  const [selectedRecord, setSelectedRecord] = useState<any>(null);

  const [createForm] = Form.useForm();
  const [editForm] = Form.useForm();

  // ================= CREATE =================
  const handleCreate = async () => {
    try {
      const values = await createForm.validateFields();

      const res = await createMockTest(values).unwrap();

      toast.success("Tạo đề thi thành công!");

      // Lấy ID để chuyển sang trang chi tiết
      const newId = res?.item?._id || res?._id;
      if (newId) {
        router.push(`/mock_test/${newId}`);
      }

      createForm.resetFields();
      setIsCreateModalVisible(false);
      refresh();
    } catch (err: any) {
      toast.error(err?.data?.message || "Không thể tạo đề thi!");
    }
  };
  // ================= EDIT =================
  const handleEdit = (record: any) => {
    setSelectedRecord(record);

    editForm.setFieldsValue({
      title: record.title,
      description: record.description,
      duration_minutes: record.duration_minutes,
    });

    setIsEditModalVisible(true);
  };

  const handleSaveEdit = async () => {
    try {
      const values = await editForm.validateFields();

      await updateMockTest({
        id: selectedRecord._id,
        data: values,
      }).unwrap();

      toast.success("Cập nhật đề thi thành công!");
      setIsEditModalVisible(false);
      refresh();
    } catch (err: any) {
      toast.error("Không thể cập nhật đề thi!");
    }
  };

  // ================= DELETE =================
  const handleDelete = async (rec: any) => {
    if (!rec?._id) {
      toast.error("Không tìm thấy ID để xoá");
      return;
    }

    const confirm = window.confirm("Bạn có chắc muốn xoá đề thi này?");
    if (!confirm) return;

    try {
      await deleteMockTest(rec._id).unwrap();
      toast.success("Xoá đề thi thành công!");
      refresh();
    } catch (err) {
      toast.error("Không thể xoá đề thi!");
    }
  };

  // ================= COLUMNS =================
  const columns: ColumnProps<any>[] = [
    {
      title: "Tên bài thi",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Thời lượng (phút)",
      dataIndex: "duration_minutes",
      key: "duration_minutes",
      align: "center",
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
              icon: <EditOutlined />,
              action: () => handleEdit(record),
            },
            {
              key: "delete",
              label: "Xóa",
              icon: <DeleteFilled style={{ color: "red" }} />,
              action: () => handleDelete(record),
            },
            {
              key: "edit_questions",
              label: "Chỉnh sửa câu hỏi",
              icon: <EditOutlined />,
              action: () => router.push(`/mock_test/${record._id}`),
            },
          ]}
        />
      ),
    },
  ];

  return (
    <div style={{ padding: 24 }}>
      <ToastContainer />

      <Typography.Title level={3} style={{ color: "#6a11cb" }}>
        Quản lý đề thi thử (Mock Test)
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
          rowKey="_id"
          dataSource={dataSource}
          columns={columns}
          pagination={pagination}
          rowSelection={{
            selectedRowKeys,
            onChange: setSelectedRowKeys,
          }}
        />
      </ACard>

      {/* ====================== CREATE MODAL ====================== */}
      <Modal
        title="Tạo đề thi mới"
        open={isCreateModalVisible}
        onCancel={() => {
          setIsCreateModalVisible(false);
          createForm.resetFields();
        }}
        onOk={handleCreate}
        okButtonProps={{ loading: creating }}
        width={600}>
        <Form layout="vertical" form={createForm}>
          <Form.Item
            name="title"
            label="Tên đề thi"
            rules={[{ required: true }]}>
            <Input />
          </Form.Item>

          <Form.Item
            name="description"
            label="Mô tả"
            rules={[{ required: true }]}>
            <Input.TextArea rows={3} />
          </Form.Item>

          <Form.Item
            name="duration_minutes"
            label="Thời lượng (phút)"
            rules={[{ required: true }]}>
            <InputNumber min={1} style={{ width: "100%" }} />
          </Form.Item>
        </Form>
      </Modal>

      {/* ====================== EDIT MODAL ====================== */}
      <Modal
        title="Chỉnh sửa đề thi"
        open={isEditModalVisible}
        onCancel={() => setIsEditModalVisible(false)}
        onOk={handleSaveEdit}
        okButtonProps={{ loading: updating }}
        width={600}>
        <Form layout="vertical" form={editForm}>
          <Form.Item
            name="title"
            label="Tên đề thi"
            rules={[{ required: true }]}>
            <Input />
          </Form.Item>

          <Form.Item
            name="duration_minutes"
            label="Thời lượng (phút)"
            rules={[{ required: true }]}>
            <InputNumber min={1} style={{ width: "100%" }} />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default MockTestTable;
