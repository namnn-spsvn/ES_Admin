import ATable from "@/fer-framework/fe-component/web/ATable";
import React, { useState } from "react";
import { Typography, Button, Modal, Form, Input, Select } from "antd";
import { DeleteFilled, EditOutlined, PlusOutlined } from "@ant-design/icons";
import { ColumnProps } from "antd/es/table";
import {
  useGetAllUserQuery,
  useDeleteUserMutation,
  useCreateUserMutation,
} from "../../apis";
import { useHookTable } from "@/fer-framework/fe-cores/common/table";
import { toast, ToastContainer } from "react-toastify";
import ACard from "@/fer-framework/fe-component/web/ACard";
import HeaderOperation from "@/fer-framework/fe-component/web/ATable/HeaderOperation";
import TableActions from "@/fer-framework/fe-component/web/ATable/TableActions";

const { Option } = Select;

const UserTable: React.FC = () => {
  const [deleteUser] = useDeleteUserMutation();
  const [createUser, { isLoading: creating }] = useCreateUserMutation();

  const {
    dataSource,
    refresh,
    selectedRowKeys,
    setSelectedRowKeys,
    pagination,
  } = useHookTable({
    useHookApi: (params: any) => {
      const result = useGetAllUserQuery(params);

      return {
        ...result,
        data: {
          items: result.data?.users || [],
          total: result.data?.users?.length || 0,
        },
      };
    },
    config: ["username", "email"],
    paramsApi: {},
  });

  const [isCreateModalVisible, setIsCreateModalVisible] = useState(false);
  const [createForm] = Form.useForm();

  const handleCreateUser = async () => {
    try {
      const values = await createForm.validateFields();

      const payload = {
        username: values.username,
        email: values.email,
        password: values.password,
        gender: values.gender,
        role: values.role,
      };

      await createUser(payload).unwrap();

      toast.success("Tạo người dùng thành công!");

      createForm.resetFields();
      setIsCreateModalVisible(false);
      refresh();
    } catch (err: any) {
      console.error(err);
      toast.error(err?.data?.message || "Không thể tạo người dùng!");
    }
  };

  const columns: ColumnProps<any>[] = [
    {
      title: "Người dùng",
      dataIndex: "username",
      key: "username",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      align: "center",
    },
    {
      title: "Vai trò",
      dataIndex: "role",
      key: "role",
      align: "center",
    },
    // {
    //   title: "Trạng thái",
    //   dataIndex: "status",
    //   key: "status",
    //   align: "center",
    // },
    {
      title: "Giới tính",
      dataIndex: "gender",
      key: "gender",
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
              key: "delete",
              label: "Xóa",
              icon: <DeleteFilled style={{ color: "red" }} />,
              action: async (rec: any) => {
                if (!rec?._id) {
                  toast.error("Không tìm thấy ID để xoá");
                  return;
                }

                const confirmed = window.confirm(
                  "Bạn có chắc chắn muốn xoá người dùng này?"
                );
                if (!confirmed) return;

                try {
                  await deleteUser(rec._id).unwrap();
                  toast.success("Xoá người dùng thành công!");
                  refresh();
                } catch (err: any) {
                  console.error(err);
                  toast.error(
                    err?.data?.message || "Không thể xoá người dùng!"
                  );
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
        Danh sách người dùng
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
          rowSelection={{
            selectedRowKeys,
            onChange: (keys) => setSelectedRowKeys(keys),
          }}
          size="large"
        />
      </ACard>

      <Modal
        title="Tạo người dùng mới"
        open={isCreateModalVisible}
        onCancel={() => {
          setIsCreateModalVisible(false);
          createForm.resetFields();
        }}
        onOk={handleCreateUser}
        okButtonProps={{ loading: creating }}
        okText="Tạo mới"
        cancelText="Hủy">
        <Form layout="vertical" form={createForm}>
          <Form.Item
            name="username"
            label="Tên người dùng"
            rules={[{ required: true }]}>
            <Input placeholder="Nhập username" />
          </Form.Item>

          <Form.Item
            name="email"
            label="Email"
            rules={[{ required: true, type: "email" }]}>
            <Input placeholder="Nhập email" />
          </Form.Item>

          <Form.Item
            name="password"
            label="Mật khẩu"
            rules={[{ required: true }]}>
            <Input.Password placeholder="Nhập mật khẩu" />
          </Form.Item>
          <Form.Item
            name="gender"
            label="Giới tính"
            rules={[{ required: true }]}
            initialValue="MALE">
            <Select>
              <Option value="MALE">MALE</Option>
              <Option value="FEMALE">FEMALE</Option>
              <Option value="OTHER">OTHER</Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="role"
            label="Vai trò"
            rules={[{ required: true }]}
            initialValue="LEARNER">
            <Select>
              <Option value="LEARNER">LEARNER</Option>
              <Option value="ADMIN">ADMIN</Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default UserTable;
