import { Button, Card, Form, Input, Typography } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { usePostLoginMutation } from "../../apis";
import { setCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import { memo } from "react";
import { useDispatch } from "react-redux";
import { authActions } from "../../reducers";
import { url } from "inspector";

const { Title } = Typography;

function FormLogin() {
  const dispatch = useDispatch();
  const [postLogin, { isLoading }] = usePostLoginMutation();
  const router = useRouter();
  const [form] = Form.useForm();

  const onFinish = async (values: any) => {
    try {
      const data = await postLogin({
        usernameOrEmail: values.email,
        password: values.password,
      }).unwrap();

      setCookie("token", data.token);
      // dispatch(authActions.setLogin(data));
      localStorage.setItem("user", JSON.stringify(data.user));
      router.push("/home");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundImage: 'url("/tienganh6.jpg")',
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}>
      <Card style={{ width: 400, borderRadius: 12 }}>
        <Title level={3} style={{ textAlign: "center" }}>
          Đăng nhập
        </Title>

        <Form
          form={form}
          name="login-form"
          layout="vertical"
          onFinish={onFinish}>
          <Form.Item
            name="email"
            label="Email"
            rules={[{ required: true, message: "Vui lòng nhập email!" }]}>
            <Input
              prefix={<UserOutlined />}
              size="large"
              placeholder="Nhập email"
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
            />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block size="large">
              Đăng nhập
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
}

export default memo(FormLogin);
