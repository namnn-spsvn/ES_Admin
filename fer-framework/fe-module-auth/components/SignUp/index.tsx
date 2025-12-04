"use client";

import AModal from "@/fer-framework/fe-component/web/AModal";
import { Button, Form, Input } from "antd";
import React, { useState } from "react";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { usePostSendCodeMutation } from "../../apis";
import { toast, ToastContainer } from "react-toastify";
import { VerifyCode } from "./VerifyCode";

function SignUp() {
  const [form] = Form.useForm();
  const [open, setOpen] = useState(false);
  const [openVerify, setOpenVerify] = useState(false);

  // call apis
  const [postSendCode, { isLoading }] = usePostSendCodeMutation();

  const handleSubmit = async (values: any) => {
    try {
      const data = await postSendCode({ email: values.email }).unwrap();
      setOpenVerify(true);
      toast.success(data?.message || "Đã gửi code về email của bạn!");
    } catch (error) {
      toast.success((error as any)?.message || "Lỗi xác thực");
    }
  };

  const onCancel = () => {
    setOpen(false);
    form.resetFields();
  };

  return (
    <>
      <Button color="cyan" variant="solid" onClick={() => setOpen(true)}>
        Tạo tài khoản mới
      </Button>

      <AModal
        title="Tạo tài khoản mới"
        open={open}
        onCancel={onCancel}
        onOk={handleSubmit}
        okText="Tạo"
        destroyOnHidden
        width={500}
        footer={[
          <Button key="btn-cancel" onClick={onCancel}>
            Hủy
          </Button>,
          <Button
            key="btn-create"
            loading={isLoading}
            type="primary"
            form={"form-create"}
            htmlType="submit">
            Tạo mới
          </Button>,
        ]}
        centered>
        <ToastContainer position="top-right" autoClose={3000} />
        <Form
          id={"form-create"}
          form={form}
          onFinish={handleSubmit}
          layout="vertical"
          style={{ width: "100%" }}>
          <Form.Item
            name="email"
            label="Email"
            rules={[{ required: true, message: "Vui lòng nhập email!" }]}>
            <Input
              prefix={<UserOutlined />}
              size="large"
              placeholder="Nhập email"
              autoComplete="nope"
            />
          </Form.Item>

          <Form.Item
            name="username"
            label="Tài khoản"
            rules={[{ required: true, message: "Vui lòng nhập tài khoản!" }]}>
            <Input
              prefix={<UserOutlined />}
              size="large"
              placeholder="Nhập tài khoản"
            />
          </Form.Item>

          <Form.Item
            name="password"
            label="Mật khẩu"
            rules={[{ required: true, message: "Vui lòng nhập mật khẩu!" }]}>
            <Input.Password
              prefix={<LockOutlined />}
              size="large"
              placeholder="Nhập mật khẩu"
              autoComplete="new-password"
            />
          </Form.Item>
        </Form>
      </AModal>

      <VerifyCode
        open={openVerify}
        onCancel={() => {
          setOpenVerify(false);
          onCancel();
        }}
        item={form.getFieldsValue()}
      />
    </>
  );
}

export default SignUp;
