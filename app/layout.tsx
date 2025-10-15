import { AntdRegistry } from "@ant-design/nextjs-registry";
import "./globals.css";
import viVN from "antd/lib/locale/vi_VN";
import { ThemeProvider } from "@/fer-framework/fe-global/themes";
import themeConfig from "./themeConfig";
import { open_sans } from "@/fer-framework/fe-global/assets";
<<<<<<< HEAD
// import { Provider } from "react-redux";
// import { store } from "./stores/store";
=======
>>>>>>> 2ea4307bb2bc828f0b500e0f863a11cfec09ce4c
import { ProviderRedux } from "./stores/providers";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={open_sans.className}>
        <AntdRegistry>
          <ThemeProvider theme={themeConfig} locale={viVN}>
            <ProviderRedux>{children}</ProviderRedux>
          </ThemeProvider>
        </AntdRegistry>
      </body>
    </html>
  );
}
