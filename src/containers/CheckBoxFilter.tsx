import React from "react";
import { Checkbox, Typography } from "antd";
import { CheckboxValueType } from "antd/lib/checkbox/Group";

type Props = {
  title: string;
  options: Array<string> | undefined;
  checkedValues: CheckboxValueType[];
  onChange: (checkedValues: CheckboxValueType[]) => void;
};

const checkboxGroupStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
};

const CheckboxFilter: React.FC<Props> = ({
  title,
  options,
  checkedValues,
  onChange,
}) =>(
    <>
      <Typography.Title level={5}>{title}</Typography.Title>
      <Checkbox.Group
        style={checkboxGroupStyle}
        options={options}
        value={checkedValues}
        onChange={onChange}
      />
    </>
  );

export default CheckboxFilter;
