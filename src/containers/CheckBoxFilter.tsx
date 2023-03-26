import React from "react";
import { Checkbox, Typography } from "antd";
import { CheckboxValueType } from "antd/lib/checkbox/Group";

type Props = {
  title?: string;
  options: Array<string> | undefined;
  checkedValues: CheckboxValueType[];
  titleStyle?: React.CSSProperties;
  containerStyle?: React.CSSProperties;
  onChange: (checkedValues: CheckboxValueType[]) => void;
};

const checkboxGroupStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  height: 310,
  overflow: "auto",
};

const CheckboxFilter: React.FC<Props> = ({
  title,
  options,
  checkedValues,
  onChange,
  titleStyle,
  containerStyle,
}) => (
  <div style={containerStyle}>
    {title && (
      <Typography.Title style={titleStyle} level={5}>
        {title}
      </Typography.Title>
    )}
    <Checkbox.Group
      style={checkboxGroupStyle}
      options={options}
      value={checkedValues}
      onChange={onChange}
    />
  </div>
);

export default CheckboxFilter;
