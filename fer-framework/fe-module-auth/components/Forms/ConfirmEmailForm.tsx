import {
  ExclamationCircleOutlined,
  LockOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Flex, Form, Input, Tooltip, Typography } from "antd";
import React, { forwardRef, useImperativeHandle } from "react";
import {
  usePostConfirmCodeMutation,
  usePostSendCodeMutation,
} from "../../apis";

const { Text, Link } = Typography;

interface IProps {
  next: () => void;
  ref: any;
  onChange?: (value?: any) => void;
}

const ConfirmEmailForm = forwardRef<any, IProps>((props, ref) => {
  const { next, onChange } = props;

  const [postSendCode, { isLoading }] = usePostSendCodeMutation();
  const [postConfirmCode] = usePostConfirmCodeMutation();

  const form = Form.useFormInstance();

  const onSendCode = async () => {
    try {
      const data = await postSendCode(form.getFieldsValue("email")).unwrap();
      alert(data?.message);
    } catch (error) {
      alert(error?.message);
    }
  };

  useImperativeHandle(ref, () => ({
    submit: async () => {
      try {
        const data = await postConfirmCode(form.getFieldsValue());
        alert(data?.data?.message);

        if (data?.data?.message === "Xác minh thành công.") {
          next();
          onChange?.(form.getFieldsValue("email"));
        } else {
          alert(data?.error?.message || data?.data?.message || "Lỗi xác thực");
        }
      } catch (err) {
        console.log(err);
      }
    },
  }));

  return (
    <>
      <Form.Item
        name="email"
        label={
          <Flex
            justify="space-between"
            align="center"
            style={{ width: "100vh" }}>
            <Text>Email</Text>
            <Tooltip title="Nhấn vào đây để xác thực email để lấy code">
              <Link onClick={onSendCode}>Xác thực email</Link>
            </Tooltip>
          </Flex>
        }
        rules={[{ required: true, message: "Vui lòng nhập email!" }]}>
        <Input
          prefix={<UserOutlined />}
          size="large"
          placeholder="Nhập email"
          autoComplete="nope"
        />
      </Form.Item>

      <Form.Item
        name="code"
        label="Code xác thực"
        rules={[{ required: true, message: "Vui lòng nhập Code xác thực!" }]}>
        <Input
          prefix={<LockOutlined />}
          size="large"
          placeholder="Nhập Code xác thực"
        />
      </Form.Item>

      <Form.Item hidden>
        <Input.Password
          prefix={<LockOutlined />}
          size="large"
          placeholder="Nhập mật khẩu"
          autoComplete="new-password"
        />
      </Form.Item>

      <Form.Item>
        <Text type="danger">
          <ExclamationCircleOutlined /> Lưu ý: Hãy xác thực email để lấy code
          xác thực
        </Text>
      </Form.Item>
    </>
  );
});

ConfirmEmailForm.displayName = "ConfirmEmailForm";

export default ConfirmEmailForm;
