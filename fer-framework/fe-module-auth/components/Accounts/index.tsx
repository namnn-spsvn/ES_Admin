"use client";

import {
  InfoCircleOutlined,
  LockOutlined,
  LogoutOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Avatar, Dropdown } from "antd";
import { MenuProps } from "antd/lib";
import React, { useState } from "react";
import { deleteCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import ProfileModal from "../Profile";

function Account() {
  const router = useRouter();

  const [open, setOpen] = useState<string>("");
  const onCancel = () => setOpen("");

  const userInfor = JSON.parse(localStorage.getItem("user"));

  const items: MenuProps["items"] = [
    {
      key: "1",
      label: "Profile",
      icon: <InfoCircleOutlined />,
      onClick: () => setOpen("profile"),
    },
    {
      key: "2",
      label: "Change password",
      icon: <LockOutlined />,
      onClick: () => setOpen("change-password"),
    },
    {
      key: "3",
      label: "Logout",
      icon: <LogoutOutlined />,
      onClick: () => {
        localStorage.removeItem("token");
        deleteCookie("token");
        router.refresh();
      },
    },
  ];
  return (
    <>
      <Dropdown trigger={["click"]} menu={{ items }}>
        <a onClick={(e) => e.preventDefault()}>
          <Avatar size={46} src={userInfor?.avatar_url} />
        </a>
      </Dropdown>
      <ProfileModal open={open === "profile"} onCancel={onCancel} />
    </>
  );
}

export default Account;
