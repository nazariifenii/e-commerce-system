import React from "react";
import { Layout, Skeleton } from "antd";

type Props = {
  children: React.ReactNode;
  isLoading?: boolean;
};

const siderStyle: React.CSSProperties = {
  textAlign: "center",
  lineHeight: "120px",
  backgroundColor: "#fff",
  padding: 10,
};

const Sider: React.FC<Props> = ({ children, isLoading = false }) => (
  <Layout.Sider breakpoint="lg" collapsedWidth="0" style={siderStyle}>
    <Skeleton loading={isLoading} active paragraph={{ rows: 5 }}>
      {children}
    </Skeleton>
  </Layout.Sider>
);

export default Sider;
