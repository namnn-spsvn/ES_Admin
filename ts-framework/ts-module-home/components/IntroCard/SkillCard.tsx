import ACard from "@/fer-framework/fe-component/web/ACard";
import BCard from "@/ts-framework/ts-component/Card/BCard";
import { CustomerServiceOutlined } from "@ant-design/icons";
import { Flex, Progress, Typography } from "antd";
import { icons } from "antd/es/image/PreviewGroup";
import React from "react";

const { Text, Title, Link } = Typography;

interface IProps {
  icon: React.ReactNode;
  title: string;
  desc: string;
  link: string;
}

function SkillCard(props: IProps) {
  const { icon, title, desc, link } = props;
  return (
    <BCard >
      <Flex vertical gap={12} justify="center" align="center">
        {icon}

        <Title level={4} style={{ marginBottom: 8 }}>
          {title}
        </Title>
        <Text type="secondary" style={{ textAlign: "center" }}>
          {desc}
        </Text>

        <Link underline href={link}>
          Học ngay
        </Link>
      </Flex>
    </BCard>
  );
}

export default SkillCard;
