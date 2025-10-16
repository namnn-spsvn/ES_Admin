import { Divider, Tabs, TabsProps } from "antd";
import React from "react";
import LevelCard from "./LevelCard";

function Levels() {
  const items: TabsProps["items"] = [
    {
      key: "1",
      label: (
        <LevelCard
          title="Cấp độ cơ bản"
          code="Beginner"
          desc="Dành cho người mới bắt đầu"
          isActive
        />
      ),
      children: `Content of tab 1`,
    },
    {
      key: "2",
      label: (
        <LevelCard
          title="Cấp độ trung cấp"
          code="Intermediate"
          desc="Dành cho người đã có nền tảng"
          isActive = {false}
        />
      ),
      children: `Content of tab 2`,
    },
    {
      key: "3",
      label: (
        <LevelCard
          title="Cấp độ nâng cao"
          code="Advanced"
          desc="Dành cho người đã thành thạo"
          isActive={false}
        />
      ),
      children: `Content of tab 3`,
    },
  ];
  return(
    <div> Chủ đề
      <Tabs tabPosition="top" defaultActiveKey="1" items={items} />
    </div>
  );
}

export default Levels;
