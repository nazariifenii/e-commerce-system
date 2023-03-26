import React from "react";
import { Select } from "antd";

type Option = {
  value: string;
  label: string;
};

const options: Record<string, Option> = {
  price: {
    value: "price",
    label: "Price: from low to high",
  },
  rating_desc: {
    value: "rating_desc",
    label: "By rating",
  },
  price_desc: {
    value: "price_desc",
    label: "Price: from high to low",
  },
  discountPercentage_desc: {
    value: "discountPercentage_desc",
    label: "By discount",
  },
};

type Props = {
  sortType: string;
  onChange: (value: string) => void;
};

const SelectableDropdown: React.FC<Props> = ({ onChange, sortType }) => {
  return (
    <Select
      defaultValue={options[sortType].label}
      options={Object.values(options)}
      onChange={onChange}
    />
  );
};

export default SelectableDropdown;
