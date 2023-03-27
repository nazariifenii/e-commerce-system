import React from "react";
import { Select } from "antd";

type Option = {
  value: string;
  label: string;
};

const options: Record<string, Option> = {
  discountPrice: {
    value: "discountPrice",
    label: "Price: from low to high",
  },
  rating_desc: {
    value: "rating_desc",
    label: "By rating",
  },
  discountPrice_desc: {
    value: "discountPrice_desc",
    label: "Price: from high to low",
  },
  discountPercentage_desc: {
    value: "discountPercentage_desc",
    label: "By discount percentage",
  },
};

type Props = {
  sortType: string;
  onChange: (value: string) => void;
};

const SelectableDropdown: React.FC<Props> = ({ onChange, sortType }) => {
  return (
    <Select
      style={{ width: "100%" }}
      defaultValue={options[sortType].label}
      options={Object.values(options)}
      onChange={onChange}
    />
  );
};

export default SelectableDropdown;
