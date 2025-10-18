"use client";

import AModal from "@/fer-framework/fe-component/web/AModal";
import UploadFile from "@/fer-framework/fe-module-upload/components/UploadFile";
import { PlusOutlined } from "@ant-design/icons";
import { Button, Form, Input } from "antd";

import React from "react";

interface IProps {
  open: boolean;
  onCancel: () => void;
}

function ChangePassword(props: IProps) {
  const { open, onCancel } = props;

  const [form] = Form.useForm();

  const click = () => {
    console.log("testt>>", form.getFieldsValue());
  };

  return (
    <AModal
      title={"Thông tin tài khoản"}
      open={open}
      onCancel={onCancel}
      fullHeight
      destroyOnHidden
      footer={(_, { OkBtn, CancelBtn }) => (
        <>
          <CancelBtn />
        </>
      )}>
      <Form form={form} layout="vertical">
        <Form.Item name={"avatar_url"} label="Ảnh đại diện">
          <UploadFile
            listType="picture-card"
            // initValues={
            //   "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
            // }
            maxCount={1}
            multiple={false}
            maxSize={50}
            accept="image/*"
            returnObject={true}>
            <button style={{ border: 0, background: "none" }} type="button">
              <PlusOutlined />
              <div style={{ marginTop: 8 }}>Upload</div>
            </button>
          </UploadFile>
        </Form.Item>

        <Form.Item name={"name"} label="Ảnh đại diện">
          <Input />
        </Form.Item>

        <Form.Item>
          <Button onClick={click} type="primary">
            Xây dựng
          </Button>
        </Form.Item>
      </Form>
    </AModal>
  );
}

export default ChangePassword;
