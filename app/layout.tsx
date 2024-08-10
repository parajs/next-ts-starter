import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import StyledJsxRegistry from "../components/StyledComponentsRegistry";
import { Suspense } from "react";
import NavigationEvents from "@/components/NavigationEvents";
import PageHeader from "@/components/PageHeader";
import { ConfigProvider } from "antd";
import zhCN from "antd/locale/zh_CN";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "钱包与任务管理系统",
  description: "钱包与任务管理系统",
};

type ThemeData = {
  borderRadius: number;
  colorPrimary: string;
};

const defaultData: ThemeData = {
  borderRadius: 8,
  colorPrimary: "#1677ff",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Suspense fallback={null}>
          <NavigationEvents>
            <AntdRegistry>
              <ConfigProvider
                locale={zhCN}
                theme={{
                  token: {
                    colorPrimary: "#5558FF",
                    borderRadius: defaultData.borderRadius,
                  },
                  components: {},
                }}
              >
                <StyledJsxRegistry>
                  <PageHeader />
                  <div className="pt-[60px]">{children}</div>
                </StyledJsxRegistry>
              </ConfigProvider>
            </AntdRegistry>
          </NavigationEvents>
        </Suspense>
      </body>
    </html>
  );
}
