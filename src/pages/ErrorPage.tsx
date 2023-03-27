import React from "react";
import { useRouteError } from "react-router-dom";
import { Result } from "antd";

type RouteError = {
  statusText: string;
  message: string;
};

const contentStyle: React.CSSProperties = {
  width: "100%",
  height: "100%",
  display: "flex",
  justifyContent: "center",
};

export default function ErrorPage() {
  const error = useRouteError() as RouteError;

  return (
    <div style={contentStyle}>
      <Result
        status="error"
        title="Oops! An error occurred"
        subTitle={error.statusText || error.message}
      />
    </div>
  );
}
