import React from "react";
import { Layout } from "antd";

type Props = {
  children: React.ReactNode;
};

const contentStyle: React.CSSProperties = {
  padding: 20,
  minHeight: 120,
  backgroundColor: "#fff",
};

const Content: React.FC<Props> = ({ children }) => {
  return <Layout.Content style={contentStyle}>{children}</Layout.Content>;
};

export default Content;
