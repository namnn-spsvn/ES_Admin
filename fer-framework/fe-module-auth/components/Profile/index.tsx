import AModal from "@/fer-framework/fe-component/web/AModal";
import {
  Avatar,
  Button,
  Form,
  Image,
  Input,
  InputNumber,
  Radio,
  Select,
  Switch,
} from "antd";
import React, { useEffect, useState } from "react";
import { authSelectors } from "../../reducers";
import { useSelector } from "react-redux";
import { useEditUserMutation, useGetUserQuery } from "../../apis";
import UploadFile from "@/fer-framework/fe-module-upload/components/UploadFile";
import { PlusOutlined, UserOutlined } from "@ant-design/icons";

interface IProps {
  open: boolean;
  onCancel: () => void;
}

function ProfileModal(props: IProps) {
  const { open, onCancel } = props;
  const [form] = Form.useForm();
  // const user = useSelector((state: any) => authSelectors.getUser(state));

  const [isEdit, setIsEdit] = useState(true);

  const onUpdate = () => {
    setIsEdit(false);
  };

  const userInfor = useSelector((state: any) => authSelectors.getUser(state));

  const { data, refetch } = useGetUserQuery({
    id: userInfor?.user?._id as any,
  });

  const [editUser, { isLoading }] = useEditUserMutation();

  useEffect(() => {
    form.setFieldsValue(data?.user);
  }, [data]);

  const handleUpdateInfo = async (values: any) => {
    try {
      await editUser({
        body: {
          full_name: values.full_name,
          gender: values.gender,
          age: values.age,
          occupation: values.occupation,
          avatar_url: values.avatar_url,
        },
        params: { id: userInfor?.user?._id as string },
      }).unwrap();

      refetch();
      setIsEdit(true);
    } catch (error) {}
  };

  return (
    <AModal
      title={"Thông tin tài khoản"}
      open={open}
      onCancel={onCancel}
      fullHeight
      destroyOnHidden
      footer={[
        <>
          <Button key="btn-cancel" onClick={onCancel}>
            Hủy
          </Button>
          ,
          {isEdit ? (
            <Button key="btn-update" type="primary" onClick={onUpdate}>
              Cập nhật
            </Button>
          ) : (
            <>
              <Button
                key="btn-cancel"
                type="dashed"
                onClick={() => {
                  setIsEdit(true);
                }}>
                Hủy cập nhật
              </Button>
              <Button
                key="btn-update-info"
                loading={isLoading}
                type="primary"
                form={"form-update-info"}
                htmlType="submit">
                Cập nhật
              </Button>
            </>
          )}
          ,
        </>,
      ]}>
      <Form
        id={"form-update-info"}
        form={form}
        onFinish={handleUpdateInfo}
        layout="vertical">
        <Form.Item name={"avatar_url"} label="Ảnh đại diện">
          {isEdit ? (
            <Avatar
              size={64}
              src={userInfor?.user?.avatar_url}
              alt="avatar"
              icon={<UserOutlined />}
            />
          ) : (
            <UploadFile
              listType="picture-card"
              initValues={userInfor?.user?.avatar_url}
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
          )}
        </Form.Item>

        {/* full_name, gender, age, occupation, avatar_url */}

        <Form.Item label="Họ và tên" name="full_name">
          <Input placeholder="Nhập họ và tên" disabled={isEdit} />
        </Form.Item>

        <Form.Item label="Giới tính" name="gender">
          <Radio.Group disabled={isEdit}>
            <Radio value={"male"}>Nam</Radio>
            <Radio value={"female"}>Nữ</Radio>
            <Radio value={"other"}>Khác</Radio>
          </Radio.Group>
        </Form.Item>

        <Form.Item label="Tuổi" name="age">
          <InputNumber disabled={isEdit} />
        </Form.Item>

        <Form.Item label="Nghề nghiệp" name="occupation">
          <Input placeholder="Nhập nghề nghiệp" disabled={isEdit} />
        </Form.Item>

        <Form.Item label="Tên đăng nhập" name="username">
          <Input disabled />
        </Form.Item>

        <Form.Item label="Email" name="email">
          <Input disabled />
        </Form.Item>

        <Form.Item label="Vai trò" name="role">
          <Select
            options={[
              { label: "Người học", value: "LEARNER" },
              { label: "Giáo viên", value: "TEACHER" },
              { label: "Quản trị", value: "ADMIN" },
            ]}
            placeholder="Chọn vai trò"
            disabled
          />
        </Form.Item>

        <Form.Item label="Trạng thái" name="status">
          <Switch disabled />
        </Form.Item>

        <Form.Item label="Ngày tạo" name="created_at">
          <Input disabled />
        </Form.Item>
      </Form>
    </AModal>
  );
}

export default ProfileModal;
