import React from "react";
import { Layout } from "antd";

type Props = {
  children: React.ReactNode;
};

const headerStyle: React.CSSProperties = {
  color: "#fff",
  height: 64,
  paddingInline: 50,
  lineHeight: "64px",
  backgroundColor: "#fff",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

const Header: React.FC<Props> = ({ children }) => {
  return <Layout.Header style={headerStyle}>{children}</Layout.Header>;
};

export default Header;
