import { MenuItem } from "@/fer-framework/fe-cores/constants";
import {
  BookOutlined,
  FileTextOutlined,
  HomeOutlined,
  LineChartOutlined,
  UserOutlined,
} from "@ant-design/icons";

export const items: MenuItem[] = [

  {
    key: "skills",
    icon: <UserOutlined />,
    label: "Kĩ năng",
    link: "/skills",
    children: [
      { key: "listening", label: "Listening", link: "/skills/listening" },
      { key: "speaking", label: "Speaking", link: "/skills/speaking" },
      { key: "reading", label: "Reading", link: "/skills/reading" },
      { key: "writing", label: "Writing", link: "/skills/writing" },
    ],
  },
  {
    key: "flashcard",
    icon: <BookOutlined />,
    label: "Flashcard",
    link: "/flashcard",
  },
  {
    key: "test",
    icon: <FileTextOutlined />,
    label: "Thi thử",
    link: "/mock_test",
  },
  {
    key: "user",
    icon: <FileTextOutlined />,
    label: "Người dùng",
    link: "/user",
  },
  {
    key: "account",
    icon: <FileTextOutlined />,
    label: "Tài khoản",
    link: "/account",
  },
];
