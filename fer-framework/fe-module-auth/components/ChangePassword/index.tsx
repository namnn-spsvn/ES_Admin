// import AModal from "@/fer-framework/fe-component/web/AModal";
// import BaseUploadImage from "@/fer-framework/fe-component/web/BaseUploadImage";
// import { Button, Form, Upload } from "antd";
// import { UploadFile } from "antd/lib";
// import React, { useState } from "react";

// interface IProps {
//   open: boolean;
//   onCancel: () => void;
// }

// function ChangePassword(props: IProps) {
//   const { open, onCancel } = props;

//   const [form] = Form.useForm();

//   const click = () => {
//     console.log("testt>>", form.getFieldsValue());
//   };
//   return (
//     <AModal
//       title={"Thông tin tài khoản"}
//       open={open}
//       onCancel={onCancel}
//       fullHeight
//       destroyOnHidden
//       footer={(_, { OkBtn, CancelBtn }) => (
//         <>
//           <CancelBtn />
//         </>
//       )}>
//       <Form layout="vertical">
//         <Form.Item
//           name={"avatar_url"}
//           label="Ảnh đại diện"
//           valuePropName="value">
//           <BaseUploadImage />
//         </Form.Item>

//         <Form.Item>
//           <Button onClick={click} type="primary">
//             Xây dựng
//           </Button>
//         </Form.Item>
//       </Form>
//     </AModal>
//   );
// }

// export default ChangePassword;
