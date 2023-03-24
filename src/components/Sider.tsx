import React from "react";
import { Layout } from "antd";

type Props = {
  children: React.ReactNode;
};

const siderStyle: React.CSSProperties = {
  textAlign: "center",
  lineHeight: "120px",
  backgroundColor: "#fff",
  padding: 10,
};

const Sider: React.FC<Props> = ({ children }) => {
  return (
    <Layout.Sider breakpoint="lg" collapsedWidth="0" style={siderStyle}>
      {children}
    </Layout.Sider>
  );
};

export default Sider;
