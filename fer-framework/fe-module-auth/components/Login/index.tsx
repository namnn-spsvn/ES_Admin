import { Button, Card, Divider, Flex, Form, Input, Typography } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { setCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import { memo } from "react";

// Components
import SignUp from "../SignUp";
import ForgetPassword from "../ForgetPassword";

// Apis
import { useLazyGetUserQuery, usePostLoginMutation } from "../../apis";
import { useDispatch } from "react-redux";
import { userAgentFromString } from "next/server";
import { toast, ToastContainer } from "react-toastify";

const { Title } = Typography;

function FormLogin() {
  const [postLogin, { isLoading }] = usePostLoginMutation();
  const [
    triggerGetUser,
    { data: userData, error: userError, isLoading: isUserLoading },
  ] = useLazyGetUserQuery();
  const router = useRouter();
  const [form] = Form.useForm();

  const onFinish = async (values: any) => {
    try {
      const data = await postLogin({
        usernameOrEmail: values.email,
        password: values.password,
      }).unwrap();

      setCookie("token", data.token);
      const user = await triggerGetUser(data.user.id).unwrap();

      localStorage.setItem("userId", JSON.stringify(data.user.id));
      toast.success("Đăng nhập thành công");
      router.push("/home");
    } catch (error) {
      console.log(error);
      toast.error((error as any)?.message || "Lỗi xác thực");
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
        <ToastContainer position="top-right" autoClose={3000} />

        <Form
          form={form}
          name="login-form"
          layout="vertical"
          onFinish={onFinish}>
          <Form.Item
            name="email"
            label="Email / Tài khoản"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập email hoặc tài khoản!",
              },
            ]}>
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

          <Form.Item style={{ margin: 0 }}>
            {/* <Flex justify="center" align="center">
              <ForgetPassword />
            </Flex> */}
          </Form.Item>

          <Divider size="middle" style={{ borderWidth: 2 }} />

          {/* <Flex justify="center" align="center">
            <SignUp />
          </Flex> */}
        </Form>
      </Card>
    </div>
  );
}

export default memo(FormLogin);
