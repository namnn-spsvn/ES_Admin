import LevelCard from "@/ts-framework/ts-component/LevelCard";
import { Tabs } from "antd";
import { TabsProps } from "antd/lib";
import React, { useState } from "react";
import TopicTable from "../Topics";

// const topicsData = [
//   // 🟢 Beginner (Cơ bản)
//   {
//     id: 1,
//     name: "Đồ vật trong ngôi nhà (Household Items)",
//     level: "Beginner",
//     exercises: 10,
//   },
//   {
//     id: 2,
//     name: "Các loại cây và hoa (Plants and Flowers)",
//     level: "Beginner",
//     exercises: 8,
//   },
//   {
//     id: 3,
//     name: "Các phòng trong nhà (Rooms in the House)",
//     level: "Beginner",
//     exercises: 9,
//   },
//   {
//     id: 4,
//     name: "Thời tiết và các mùa trong năm (Weather and Seasons)",
//     level: "Beginner",
//     exercises: 11,
//   },
//   {
//     id: 5,
//     name: "Động vật nuôi trong gia đình (Pets and Animals)",
//     level: "Beginner",
//     exercises: 7,
//   },

//   // 🟠 Intermediate (Trung cấp)
//   {
//     id: 6,
//     name: "Cuộc sống ở nông thôn và thành phố (Life in the Countryside and City)",
//     level: "Intermediate",
//     exercises: 14,
//   },
//   {
//     id: 7,
//     name: "Môi trường và bảo vệ thiên nhiên (Environment Protection)",
//     level: "Intermediate",
//     exercises: 15,
//   },
//   {
//     id: 8,
//     name: "Các hoạt động gia đình hằng ngày (Daily Family Activities)",
//     level: "Intermediate",
//     exercises: 13,
//   },
//   {
//     id: 9,
//     name: "Trang trí và thiết kế nhà ở (Home Decoration and Design)",
//     level: "Intermediate",
//     exercises: 12,
//   },
//   {
//     id: 10,
//     name: "Ẩm thực gia đình và nấu ăn (Home Cooking and Food)",
//     level: "Intermediate",
//     exercises: 16,
//   },

//   // 🔴 Advanced (Nâng cao)
//   {
//     id: 11,
//     name: "Phát triển bền vững trong đời sống hiện đại (Sustainable Living)",
//     level: "Advanced",
//     exercises: 18,
//   },
//   {
//     id: 12,
//     name: "Ảnh hưởng của đô thị hóa đến môi trường sống (Urbanization Impact)",
//     level: "Advanced",
//     exercises: 19,
//   },
//   {
//     id: 13,
//     name: "Kiến trúc xanh và tiết kiệm năng lượng (Green Architecture)",
//     level: "Advanced",
//     exercises: 20,
//   },
//   {
//     id: 14,
//     name: "Phong cách sống tối giản (Minimalist Lifestyle)",
//     level: "Advanced",
//     exercises: 17,
//   },
//   {
//     id: 15,
//     name: "Tác động của biến đổi khí hậu đến đời sống (Climate Change Effects)",
//     level: "Advanced",
//     exercises: 21,
//   },
// ];

function LevelsTabs() {
  const [active, setActive] = useState("Beginner");
  const items: TabsProps["items"] = [
    {
      key: "Beginner",
      label: (
        <LevelCard
          title="Cấp độ cơ bản"
          code="Beginner"
          desc="Dành cho người mới bắt đầu"
          isActive={active === "Beginner"}
        />
      ),
      children: (
        <TopicTable
          skill_id= "68ed254ce5c75afc72ea3c28"
          level_id= '68ed254ce5c75afc72ea3c2f'
        />
      ),
    },
    {
      key: "Intermediate",
      label: (
        <LevelCard
          title="Cấp độ trung cấp"
          code="Intermediate"
          desc="Dành cho người đã có nền tảng"
          isActive={active === "Intermediate"}
        />
      ),
      children: (
        <TopicTable
          level_id="68ed254ce5c75afc72ea3c30"
          skill_id="68ed254ce5c75afc72ea3c28"
        />
      ),
    },
    {
      key: "Advanced",
      label: (
        <LevelCard
          title="Cấp độ nâng cao"
          code="Advanced"
          desc="Dành cho người đã thành thạo"
          isActive={active === "Advanced"}
        />
      ),
      children: (
        <TopicTable
          level_id="68ed254ce5c75afc72ea3c31"
          skill_id="68ed254ce5c75afc72ea3c28"
        />
      ),
    },
  ];
  return (
    <Tabs
      tabPosition="top"
      defaultActiveKey="Beginner"
      items={items}
      onChange={(activeKey) => {
        setActive(activeKey);
      }}
    />
  );
}

export default LevelsTabs;
