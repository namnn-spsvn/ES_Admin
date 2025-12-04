import AModal from "@/fer-framework/fe-component/web/AModal";
import { BarcodeOutlined } from "@ant-design/icons";
import { Button, Form, Input, message } from "antd";
import React from "react";
import {
  usePostConfirmCodeMutation,
  usePostRegisterMutation,
} from "../../apis";
import { toast, ToastContainer } from "react-toastify";

interface IProps {
  open: boolean;
  onCancel: () => void;
  item: any;
}

export const VerifyCode = (props: IProps) => {
  const { open, onCancel, item } = props;
  const [form] = Form.useForm();

  const [postConfirmCode] = usePostConfirmCodeMutation();
  const [postRegister, { isLoading }] = usePostRegisterMutation();

  const handleSubmit = async (values: any) => {
    try {
      const data = await postConfirmCode({
        code: values.code,
        email: item.email,
      }).unwrap();

      const register = await postRegister({
        username: item.username,
        password: item.password,
        email: item.email,
      }).unwrap();

      onCancelModal();
      toast.success(register?.data?.message || "Tạo tài khoản mới thanh cong");
    } catch (error) {
      toast.error((error as any).error?.message || "Lỗi xác thực");
    }
  };

  const onCancelModal = () => {
    onCancel();
    form.resetFields();
  };

  return (
    <AModal
      title="Xác thực email"
      open={open}
      onCancel={onCancelModal}
      onOk={handleSubmit}
      okText="Tạo"
      destroyOnHidden
      width={500}
      footer={[
        <Button key="btn-cancel" onClick={onCancelModal}>
          Hủy
        </Button>,
        <Button
          key="btn-verify"
          loading={isLoading}
          type="primary"
          form={"form-verify"}
          htmlType="submit">
          Tạo mới
        </Button>,
      ]}
      centered>
      <ToastContainer position="top-right" autoClose={3000} />
      <Form
        id={"form-verify"}
        form={form}
        onFinish={handleSubmit}
        layout="vertical"
        style={{ width: "100%" }}>
        <Form.Item
          name="code"
          label="Code xác thực"
          rules={[{ required: true, message: "Vui lòng nhập Code xác thực!" }]}>
          <Input
            prefix={<BarcodeOutlined />}
            size="large"
            placeholder="Nhập Code xác thực"
          />
        </Form.Item>
      </Form>
    </AModal>
  );
};
