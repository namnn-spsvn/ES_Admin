import ACard from "@/fer-framework/fe-component/web/ACard";
import { HeartOutlined } from "@ant-design/icons";
import { Avatar, CardProps, Image, Tag, Typography } from "antd";
import Meta from "antd/es/card/Meta";
import React from "react";

const { Text, Title } = Typography;

interface IProps extends CardProps {
  children: React.ReactNode;
  key: string;
  width: number
}

function BCard(props: IProps) {
  const { children, key,width, ...other } = props;
  return (
    <ACard
      key={key}
      style={{
        width: width,
        borderRadius: 12,
        boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
      }}
      styles={{
        body: {
          padding: 24,
        },
      }}
      {...other}>
      {children}
    </ACard>
  );
}

export default BCard;
