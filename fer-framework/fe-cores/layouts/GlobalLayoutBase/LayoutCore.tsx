"use client";

import React from "react";
import { Layout, theme } from "antd";
import ChatbotWrapper from "@/ts-module-chatbot/components/ChatbotWrapper";
import { useCollapsed } from "./CollapsedProvider";
import { useTheme } from "@/fer-framework/fe-global/themes";
import GlobalLogo from "../GlobalSider/GlobalLogo";
import MenuBase from "../GlobalSider/MenuBase";
import GlobalHeader from "../GlobalHeader";

const { Content, Footer, Sider } = Layout;

function LayoutCore({ children }: { children: React.ReactNode }) {
  const { collapsed, toggleCollapsed } = useCollapsed();

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const { mode } = useTheme();

  return (
    <Layout style={{ minHeight: "100vh", overflow: "hidden" }}>
      <Sider
        collapsible
        collapsed={collapsed}
        theme={mode === "dark" ? "dark" : "light"}
        onCollapse={toggleCollapsed}>
        <GlobalLogo />
        <MenuBase />
      </Sider>
      <Layout style={{ position: "relative" }}>
        {/* Header */}
        <GlobalHeader />
        {/* Content */}
        <Content style={{ margin: "16px" }}>
          <div
            style={{
              minHeight: 360,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
              padding: "16px",
            }}>
            {children}
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}>
          ES English ©{new Date().getFullYear()} Created by Long Ch1
        </Footer>
        <div
          style={{ position: "fixed", zIndex: 9999999, right: 40, bottom: 40 }}>
          <ChatbotWrapper />
        </div>
      </Layout>
    </Layout>
  );
}

export default LayoutCore;
