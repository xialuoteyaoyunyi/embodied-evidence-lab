import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "具身证据台 | 精细操作产业研究",
  description: "连接机器人执行与感知产业链、跨市场比较和可追溯证据。",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body className="antialiased">{children}</body>
    </html>
  );
}
