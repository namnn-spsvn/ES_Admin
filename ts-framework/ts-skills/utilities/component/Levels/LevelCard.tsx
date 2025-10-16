import ATitle from "@/fer-framework/fe-component/web/ATitle";
import BCard from "@/ts-framework/ts-component/Card/BCard";
import { StarOutlined } from "@ant-design/icons";
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
    <BCard width={400} key="">
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
    </BCard>
  );
}

export default LevelCard;
