import ATable from "@/fer-framework/fe-component/web/ATable";
import { Tag, Typography } from "antd";
import { ColumnProps } from "antd/es/table";
import React from "react";

interface IProps {
  data: any;
}

function TopicTable(props: IProps) {
  const { data } = props;

  const columns: ColumnProps<any>[] = [
    {
      title: "Chủ đề",
      dataIndex: "name",
      key: "name",
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
      title: "Số lượng bài",
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
            href={`/skills/writing/${record.name}/${record.level}/${record.id}`}>
            Làm bài
          </Typography.Link>
        );
      },
    },
  ];
  return <ATable dataSource={data} columns={columns} size="small" />;
}

export default TopicTable;
