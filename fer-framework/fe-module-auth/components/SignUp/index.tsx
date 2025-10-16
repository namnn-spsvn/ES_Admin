"use client";

import AModal from "@/fer-framework/fe-component/web/AModal";
import { Button, Flex, Form, Steps, Typography } from "antd";
import React, { useRef, useState } from "react";
import ConfirmEmailForm from "../Forms/ConfirmEmailForm";
import RegisterForm from "../Forms/RegisterForm";

const { Text, Link } = Typography;

function SignUp() {
  const [form] = Form.useForm();
  const [open, setOpen] = useState(false);
  const [emai, setEmail] = useState("");

  const onChange = (value: string) => {
    setEmail(value);
  };

  const stepRefs = useRef<{ [key: number]: any }>({});

  const [current, setCurrent] = useState(0);

  const next = () => {
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  const handleSubmit = async () => {
    const currentStepRef = stepRefs.current[current];
    if (currentStepRef && currentStepRef.submit) {
      await currentStepRef.submit();
    }
  };

  const onCancel = () => {
    setOpen(false);
    form.resetFields();
    setCurrent(0);
  };

  const steps = [
    {
      key: "1",
      title: "Xác thực email",
      content: (
        <ConfirmEmailForm
          next={next}
          ref={(ref) => (stepRefs.current[0] = ref)}
          onChange={onChange}
        />
      ),
    },
    {
      key: "2",
      title: "Tạo tài khoản",
      content: (
        <RegisterForm
          ref={(ref) => (stepRefs.current[1] = ref)}
          next={next}
          email={emai}
          onCancel={onCancel}
        />
      ),
    },
  ];

  return (
    <>
      <Button color="cyan" variant="solid" onClick={() => setOpen(true)}>
        Tạo tài khoản mới
      </Button>

      <AModal
        title="Tạo tài khoản mới"
        open={open}
        onCancel={onCancel}
        okText="Tạo"
        destroyOnHidden
        width={500}
        middleHeight
        footer={[
          <Button key="btn-cancel" onClick={onCancel}>
            Hủy
          </Button>,
          current > 0 && (
            <Button
              key="btn-prev"
              style={{ margin: "0 8px" }}
              onClick={() => prev()}>
              Quay lại
            </Button>
          ),
          current < steps.length - 1 && (
            <Button key="btn-next" type="primary" onClick={handleSubmit}>
              Tiếp theo
            </Button>
          ),
          current === steps.length - 1 && (
            <Button
              key="btn-done"
              type="primary"
              form="form-create"
              onClick={handleSubmit}>
              Tạo mới
            </Button>
          ),
        ]}
        centered>
        <Steps
          current={current}
          items={steps.map((item) => ({
            key: item.title,
            title: item.title,
          }))}
          labelPlacement="vertical"
        />
        <Flex flex={1} style={{ overflow: "hidden auto" }}>
          <Form
            id={"form-create"}
            form={form}
            // onFinish={handleSubmit}
            layout="vertical"
            style={{ width: "100%" }}>
            {steps.map((item: any, index: number) => (
              <div
                key={index}
                style={{
                  display: current === index ? "block" : "none",
                  height: "100%",
                }}>
                {item.content}
              </div>
            ))}
          </Form>
        </Flex>
      </AModal>
    </>
  );
}

export default SignUp;
