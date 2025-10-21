import ACard from "@/fer-framework/fe-component/web/ACard";
import ATitle from "@/fer-framework/fe-component/web/ATitle";
import { Flex, Tag, Typography } from "antd";
import React from "react";

const { Text, Title } = Typography;

interface IProps {
  title: string;
  code: string;
  desc: string;
  isActive: boolean;
}

function LevelCard(props: IProps) {
  const { title, code, desc, isActive } = props;
  return (
    <ACard
      style={{
        width: 400,
        borderRadius: 12,
        boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
        backgroundColor: isActive ? "#6b11cb3e" : "#ffffff",
      }}
      styles={{
        body: {
          padding: 24,
        },
      }}>
      <Flex align="start" vertical gap={8}>
        <ATitle level={5}>{title}</ATitle>
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
          {code}
        </Tag>
        <Flex>
          <Text type="secondary">{desc}</Text>
        </Flex>
      </Flex>
    </ACard>
  );
}

export default LevelCard;
