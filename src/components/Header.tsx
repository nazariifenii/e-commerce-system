import React from "react";
import { Layout } from "antd";

type Props = {
  children: React.ReactNode;
};

const headerStyle: React.CSSProperties = {
  backgroundColor: "#fff",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexDirection: "row",
};

const Header: React.FC<Props> = ({ children }) => {
  return <Layout.Header style={headerStyle}>{children}</Layout.Header>;
};

export default Header;
