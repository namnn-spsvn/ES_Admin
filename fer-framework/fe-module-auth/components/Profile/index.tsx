import AModal from "@/fer-framework/fe-component/web/AModal";
import { Avatar, Form, Image, Input, Select, Switch } from "antd";
import React, { useEffect } from "react";

interface IProps {
  open: boolean;
  onCancel: () => void;
}

function ProfileModal(props: IProps) {
  const { open, onCancel } = props;
  const [form] = Form.useForm();
  // const user = useSelector((state: any) => authSelectors.getUser(state));

  const userInfor = JSON.parse(localStorage.getItem("user"));

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
      <Form form={form} initialValues={userInfor} layout="vertical" disabled>
        <Form.Item name={"avatar_url"} label="Ảnh đại diện">
          {/* <Avatar size={64} src={userInfor?.avatar_url} preview={true}/> */}
          <Image
            about="img"
            alt="img"
            width={100}
            height={100}
            style={{
              borderRadius: "50%",
              objectFit: "cover",
              objectPosition: "center",
            }}
            src={userInfor?.avatar_url}
            preview
          />
        </Form.Item>

        <Form.Item label="Họ và tên" name="full_name">
          <Input placeholder="Nhập họ và tên" />
        </Form.Item>

        <Form.Item label="Tên đăng nhập" name="username">
          <Input />
        </Form.Item>

        <Form.Item label="Email" name="email">
          <Input />
        </Form.Item>

        <Form.Item label="Vai trò" name="role">
          <Select
            options={[
              { label: "Người học", value: "LEARNER" },
              { label: "Giáo viên", value: "TEACHER" },
              { label: "Quản trị", value: "ADMIN" },
            ]}
            placeholder="Chọn vai trò"
          />
        </Form.Item>

        <Form.Item label="Trạng thái" name="status">
          <Switch />
        </Form.Item>

        <Form.Item label="Ngày tạo" name="created_at">
          <Input />
        </Form.Item>
      </Form>
    </AModal>
  );
}

export default ProfileModal;
