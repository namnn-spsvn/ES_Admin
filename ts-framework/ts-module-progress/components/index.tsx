import { Button, Image } from "antd";
import React from "react";
import { ColumnProps } from "antd/es/table";
import { DeleteFilled, EditOutlined } from "@ant-design/icons";

// Components
import TableActions from "@/fer-framework/fe-component/web/ATable/TableActions";
import MultiDeleteAction from "@/fer-framework/fe-component/web/ATable/MultiDeleteAction";
import ATable from "@/fer-framework/fe-component/web/ATable";
import HeaderOperation from "@/fer-framework/fe-component/web/ATable/HeaderOperation";
import ACard from "@/fer-framework/fe-component/web/ACard";
import { useHookTable } from "@/fer-framework/fe-cores/common/table";

// Apis
import { useGetFlashCardQuery } from "../apis";

//Constants

function Progress() {
  const columns: ColumnProps<any>[] = [
    {
      title: "Từ vựng",
      dataIndex: "word",
      width: 100,
      key: "word",
      ellipsis: true,
    },
    {
      title: "Phiên âm",
      dataIndex: "phonetic",
      width: 100,
      key: "phonetic",
      ellipsis: true,
    },
    {
      title: "Từ loại",
      dataIndex: "part_of_speech",
      width: 100,
      key: "part_of_speech",
      ellipsis: true,
    },
    {
      title: "Nghĩa tiếng Việt",
      dataIndex: "meaning_vi",
      width: 100,
      key: "meaning_vi",
      ellipsis: true,
    },
    {
      title: "Ví dụ (EN)",
      dataIndex: "example_en",
      width: 100,
      key: "example_en",
      ellipsis: true,
    },
    {
      title: "Ví dụ (VI)",
      dataIndex: "example_vi",
      width: 100,
      key: "example_vi",
      ellipsis: true,
    },
    {
      title: "Âm thanh",
      dataIndex: "audio_url",
      width: 100,
      key: "audio_url",
      render: (url) =>
        url ? (
          <audio controls style={{ width: "150px" }}>
            <source src={url} type="audio/mpeg" />
            Trình duyệt không hỗ trợ audio
          </audio>
        ) : (
          "-"
        ),
      ellipsis: true,
    },
    {
      title: "Hình ảnh",
      dataIndex: "image_url",
      key: "image_url",
      width: 100,
      render: (url) => (
        <Image
          src={url}
          alt="word image"
          width={70}
          height={70}
          style={{ objectFit: "cover", borderRadius: 8 }}
        />
      ),
      ellipsis: true,
    },
    {
      title: "Ngày tạo",
      dataIndex: "created_at",
      width: 100,
      key: "created_at",
      render: (date) => new Date(date).toLocaleString("vi-VN"),
      ellipsis: true,
    },
    {
      title: "Action",
      key: "operation",
      align: "center",
      fixed: "right",
      width: 100,
      render: (_, record) => {
        return (
          <TableActions
            record={record}
            actions={[
              {
                key: "edit",
                label: "Chỉnh sửa",
                icon: <EditOutlined />,
                action: (record: any) => {},
              },
              {
                key: "delete",
                label: "Xóa",
                icon: <DeleteFilled style={{ color: "red" }} />,
                action: (record: any) => {},
              },
            ]}
          />
        );
      },
    },
  ];

  const {
    dataSource,
    refresh,
    selectedRowKeys,
    setSelectedRowKeys,
    pagination,
  } = useHookTable({
    useHookApi: useGetFlashCardQuery,
    config: ["word", "phonetic", "part_of_speech", "meaning_vi", "example_en"],
    paramsApi: {},
  });

  return (
    <ACard
      title={
        <HeaderOperation
          add={<Button type="primary">Thêm</Button>}
          multiDeleteAdd={
            <MultiDeleteAction
              title="Xóa từ vựng"
              selectedRowKeys={selectedRowKeys}
              useHookMutation={() => {}}
            />
          }
        />
      }
      variant="borderless">
      <ATable
        rowKey={"_id"}
        dataSource={dataSource}
        columns={columns}
        pagination={pagination}
        rowSelection={{
          selectedRowKeys,
          onChange: (keys) => {
            setSelectedRowKeys(keys);
          },
        }}
        size="middle"
      />
    </ACard>
  );
}

export default Progress;
