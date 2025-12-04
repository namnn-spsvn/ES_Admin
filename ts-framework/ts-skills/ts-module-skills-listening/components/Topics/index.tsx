import ATable from "@/fer-framework/fe-component/web/ATable";
import { Button, Tag, message, Typography } from "antd";
import { ColumnProps } from "antd/es/table";
import React, { useEffect } from "react";
import HeaderOperation from "@/fer-framework/fe-component/web/ATable/HeaderOperation";
import { useDeleteTopicMutation, useGetTopicsQuery } from "../../apis/index";
import { useHookTable } from "@/fer-framework/fe-cores/common/table";
import TableActions from "@/fer-framework/fe-component/web/ATable/TableActions";
import { DeleteFilled, EditOutlined, PlusOutlined } from "@ant-design/icons";
import { useRouter } from "next/navigation";
import axios from "axios";
import Cookies from "js-cookie";
import ACard from "@/fer-framework/fe-component/web/ACard";
import { usePostMutation } from "@/fer-framework/fe-cores/hooks/useApiMutaton";
import { toast, ToastContainer } from "react-toastify";
import { useGetContentQuery } from "../../apis/index";
interface IProps {
  skill_id: string;
  level_id: string;
}
function TopicExerciseCount({ topicId }: { topicId: string }) {
  const { data, isLoading } = useGetContentQuery({ topic_id: topicId });

  if (isLoading) return <>...</>;

  return <>{data?.total || 0}</>;
}
function TopicTable(props: IProps) {
  const router = useRouter();
  const { skill_id, level_id } = props;

  const {
    dataSource,
    refresh,
    selectedRowKeys,
    setSelectedRowKeys,
    pagination,
  } = useHookTable({
    useHookApi: useGetTopicsQuery,
    config: ["title", "level", "exercises"],
    paramsApi: {
      skill_id: skill_id,
      level_id: level_id,
    },
  });
  const [deleteTopic, { isLoading }] = useDeleteTopicMutation();
  // Tự động refresh khi component mount
  useEffect(() => {
    refresh();
  }, [refresh]);

  const levelOptions = Array.from(
    new Map(
      (dataSource || []).map((item: any) => [
        item.level_id?._id,
        item.level_id?.name,
      ])
    )
  )
    .filter(([id, name]) => id && name)
    .map(([id, name]) => ({ text: name, value: id }));

  const columns: ColumnProps<any>[] = [
    {
      title: "Chủ đề",
      dataIndex: "title",
      key: "title",
      ellipsis: true,
    },
    {
      title: "Loại cấp độ",
      key: "level",
      align: "center",
      ellipsis: true,
      filters: levelOptions,
      onFilter: (value, record) => record.level_id._id === value,
      render: (record) => (
        <Tag
          style={{
            textAlign: "center",
            lineHeight: "25px",
            color: "#6a11cb",
            fontWeight: 500,
            border: `1px solid #6a11cb`,
            width: 100,
          }}
          color="#6b11cb53">
          {record.level_id.name}
        </Tag>
      ),
    },
    {
      title: "Số lượng câu hỏi",
      key: "total",
      align: "center",
      width: 150,
      render: (_, record) => <TopicExerciseCount topicId={record._id} />,
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
                action: (record: any) => {
                  router.push(
                    `/skills/listening/${record.title}/${record.level_id._id}/${record._id}`
                  );
                },
              },
              {
                key: "delete",
                label: "Xóa",
                icon: <DeleteFilled style={{ color: "red" }} />,
                action: async (record: any) => {
                  const topicId = record._id;

                  const isConfirmed = window.confirm(
                    "Bạn có chắc chắn muốn xóa topic này?"
                  );

                  if (!isConfirmed) {
                    return;
                  }

                  const token = Cookies.get("token");

                  if (!token) {
                    message.error("Vui lòng đăng nhập lại.");
                    return;
                  }

                  try {
                    const response = await deleteTopic(topicId).unwrap();

                    if (response.message === "Xoá topic thành công") {
                      toast.success(response.message);
                      refresh();
                    } else {
                      toast.error("Lỗi khi xóa topic");
                    }
                  } catch (error) {
                    toast.error("Lỗi khi xóa topic");
                  }
                },
              },
            ]}
          />
        );
      },
    },
  ];

  return (
    <div>
      <ToastContainer position="top-right" autoClose={3000} />
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 12,
        }}>
        <Typography.Title
          level={4}
          style={{ margin: 0, color: "#6a11cb", fontWeight: 600 }}>
          Danh sách Topic
        </Typography.Title>
      </div>
      <ACard>
        <HeaderOperation
          add={
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={() => router.push(`/skills/listening/create/`)}>
              Thêm mới
            </Button>
          }
        />
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
    </div>
  );
}

export default TopicTable;
