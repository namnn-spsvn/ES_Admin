import { Button } from "antd";
import React, { useState } from "react";
import MultiDeleteModal from "./MultiDeleteModal";

interface IProps {
  selectedRowKeys: any;
  title: string;
  useHookMutation: any;
}

function MultiDeleteAction(props: IProps) {
  const [open, setOpen] = useState(false);
  const { selectedRowKeys, title, useHookMutation } = props;
  return (
    <>
      {selectedRowKeys?.length > 0 ? (
        <Button onClick={() => setOpen(true)} danger>
          Xóa
        </Button>
      ) : null}

      <MultiDeleteModal
        useHookMutation={useHookMutation}
        title={title}
        open={open}
        onCancel={() => setOpen(false)}
      />
    </>
  );
}

export default MultiDeleteAction;
