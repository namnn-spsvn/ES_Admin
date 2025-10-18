import React, { useEffect, useState } from "react";
import { Image, Upload } from "antd";
import type { GetProp, UploadFile, UploadProps } from "antd";
import { getToken } from "@/fer-framework/fe-base/uils/getToken";

type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];

const getBase64 = (file: FileType): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

interface Props extends UploadProps {
  maxSize?: number;
  initValues?: any;
  returnObject: boolean;
  children?: any;
  pathUrl?: string;
}

const UploadFileBase = (props: Props) => {
  const {
    onChange: onChangeProps,
    initValues,
    returnObject,
    children,
    pathUrl,
    ...otherProps
  } = props;
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const token = getToken(null);

  useEffect(() => {
    setFileList(
      returnObject
        ? initValues
          ? [
              {
                uid: `1`,
                name: "image.png",
                status: "done",
                url: initValues || "",
                response: initValues || "",
              },
            ]
          : []
        : (initValues || []).map((url: string, index: number) => ({
            uid: `${index}`,
            name: "image.png",
            status: "done",
            url: url,
            response: url,
          }))
    );
  }, [initValues]);

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as FileType);
    }
    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
  };

  const customRequest: UploadProps["customRequest"] = async ({
    file,
    onSuccess,
    onError,
  }: any) => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "longlo2k3");
      formData.append("cloud_name", "dvdlboxy7");

      const res = await fetch(
        `https://api.cloudinary.com/v1_1/dvdlboxy7/image/upload`,
        {
          method: "POST",
          body: formData,
          // headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (!res.ok) throw new Error("Upload failed");

      const data = await res.json();
      onSuccess(data?.url);
    } catch (err) {
      onError(err);
    }
  };

  const handleChange: UploadProps["onChange"] = ({
    file,
    fileList: newFileList,
  }) => {
    setFileList(newFileList);
    if (file && (file?.status === "done" || file?.status === "removed")) {
      returnObject
        ? onChangeProps(file?.status === "removed" ? "" : file?.response)
        : onChangeProps(
            newFileList
              .filter((item: any) => item.status === "done")
              .map((item: any) => item.response)
          );
    }
  };

  return (
    <>
      <Upload
        fileList={fileList}
        customRequest={customRequest}
        onChange={handleChange}
        onPreview={handlePreview}
        {...otherProps}>
        {children}
      </Upload>
      {previewImage && (
        <Image
          wrapperStyle={{ display: "none" }}
          preview={{
            visible: previewOpen,
            onVisibleChange: (visible) => setPreviewOpen(visible),
            afterOpenChange: (visible) => !visible && setPreviewImage(""),
          }}
          src={previewImage}
        />
      )}
    </>
  );
};

export default UploadFileBase;
