import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Form, Input } from "antd";
import React, { forwardRef, useImperativeHandle } from "react";
import { usePostRegisterMutation } from "../../apis";

interface IProps {
  next: () => void;
  ref: any;
  email: string;
  onCancel?: () => void;
}

const RegisterForm = forwardRef<any, IProps>((props, ref) => {
  const { next, email, onCancel } = props;

  const form = Form.useFormInstance();
  const [postRegister, { isLoading }] = usePostRegisterMutation();

  console.log("email>>", email);

  useImperativeHandle(ref, () => ({
    submit: async () => {
      try {
        const values = form.getFieldsValue();
        const data = await postRegister({
          username: values.username,
          password: values.password,
          email: email.email,
        });

        if (data?.data?.message === "Đăng ký thành công") {
          onCancel?.();
          alert(data?.data?.message);
        } else {
          form.resetFields();
          alert(data?.error?.message);
        }
      } catch (err) {
        console.log(err.error?.message);
      }
    },
  }));

  return (
    <>
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
    </>
  );
});

RegisterForm.displayName = "RegisterForm";

export default RegisterForm;
