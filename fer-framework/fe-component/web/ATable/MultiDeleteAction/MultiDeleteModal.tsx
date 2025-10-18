import React from "react";
import AModal from "../../AModal";
import { Typography } from "antd";

interface IProps {
  open: boolean;
  onCancel: () => void;
  title: string;
  useHookMutation: any;
}

function MultiDeleteModal(props: IProps) {
  const { open, onCancel, title, useHookMutation } = props;

  return (
    <AModal
      title={title}
      open={open}
      onCancel={onCancel}
      okText="Xóa"
      cancelText="Hủy">
      <Typography.Text>Bạn có muốn {title} đã chọn?</Typography.Text>
    </AModal>
  );
}

export default MultiDeleteModal;
