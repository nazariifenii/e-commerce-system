import React from "react";
import { Layout, Skeleton } from "antd";

type Props = {
  children: React.ReactNode;
  isLoading?: boolean;
};

const siderStyle: React.CSSProperties = {
  backgroundColor: "#fff",
  marginRight: 16
};

const Sider: React.FC<Props> = ({ children, isLoading = false }) => (
  <Layout.Sider width={250} className='light-bg' breakpoint="md" collapsedWidth="0" style={siderStyle}>
    <Skeleton loading={isLoading} active paragraph={{ rows: 5 }}>
      {children}
    </Skeleton>
  </Layout.Sider>
);

export default Sider;
