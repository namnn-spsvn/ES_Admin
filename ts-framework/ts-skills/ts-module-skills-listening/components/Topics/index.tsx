import ATable from "@/fer-framework/fe-component/web/ATable";
import { Tag, Typography } from "antd";
import { ColumnProps } from "antd/es/table";
import React from "react";
import {useGetTopicsQuery} from "../../apis/index"
import { useHookTable } from "@/fer-framework/fe-cores/common/table";

interface IProps {
  data: any;
}

function TopicTable(props: IProps) {
  const { data } = props;
    const {
      dataSource,
      refresh,
      selectedRowKeys,
      setSelectedRowKeys,
      pagination,
    } = useHookTable({
      useHookApi: useGetTopicsQuery,
      config: ["title", "level", "exercises"],
    });
  
  const columns: ColumnProps<any>[] = [
    {
      title: "Chủ đề",
      dataIndex: "title",
      key: "title",
      ellipsis: true,
    },
    {
      title: "Loại cấp độ",
      dataIndex: "level",
      key: "level",

      align: "center",
      ellipsis: true,
      render: (_) => (
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
          {_}
        </Tag>
      ),
    },
    {
      title: "Số lượng câu hỏi",
      dataIndex: "exercises",
      key: "exercises",
      width: 150,
      align: "center",
      ellipsis: true,
    },
    {
      title: "Hoạt động",
      key: "operation",
      align: "center",
      render: (_, record) => {
        return (
          <Typography.Link
            key={_}
            href={`/skills/listening/${record.title}/${record.level_id}/${record.description}`}>
            Làm bài
          </Typography.Link>
        );
      },
    },
  ];
  return(
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
  ) 
  ;
}

export default TopicTable;
