import React, { useState } from "react";
import { Checkbox, Typography } from "antd";
import { CheckboxValueType } from "antd/lib/checkbox/Group";

type Props = {
  title: string;
  options: string[];
  onChange: (checkedValues: CheckboxValueType[]) => void;
};

const checkboxGroupStyle: React.CSSProperties = { display: "flex", flexDirection: "column" };

const CheckboxFilter: React.FC<Props> = ({ title, options, onChange }) => {
  const [checkedValues, setCheckedValues] = useState<CheckboxValueType[]>([]);

  const handleCheckboxChange = (checkedValues: CheckboxValueType[]) => {
    setCheckedValues(checkedValues);
    onChange(checkedValues);
  };

  return (
    <>
      <Typography.Title level={5}>{title}</Typography.Title>
      <Checkbox.Group
        style={checkboxGroupStyle}
        options={options}
        value={checkedValues}
        onChange={handleCheckboxChange}
      />
    </>
  );
};

export default CheckboxFilter;
