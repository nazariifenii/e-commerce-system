import React, { useEffect, useState } from "react";
import { Slider, InputNumber, Typography, Button } from "antd";

type Props = {
  filterTitle: string;
  minValue: number;
  maxValue: number;
  onSubmit: (value: NumberRange) => void;
};

const inputGroupStyle: React.CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
};

const PriceRangeFilter: React.FC<Props> = ({
  filterTitle,
  minValue,
  maxValue,
  onSubmit,
}) => {
  const [range, setRange] = useState<NumberRange>([minValue, maxValue]);

  useEffect(() => setRange([minValue, maxValue]), [minValue, maxValue]);

  const handleRangeChange = (value: NumberRange) => {
    setRange(value);
  };

  const handleMinInputChange = (value: number | null) => {
    value = value ?? minValue;
    if (value < minValue) {
      value = minValue;
    } else if (value > range[1]) {
      value = range[1];
    }
    setRange([value, range[1]]);
  };

  const handleMaxInputChange = (value: number | null) => {
    value = value ?? maxValue;
    if (value > maxValue) {
      value = maxValue;
    } else if (value < range[0]) {
      value = range[0];
    }
    setRange([range[0], value]);
  };

  const handleSubmit = () => {
    onSubmit(range);
  };

  return (
    <div>
      <Typography.Title level={5}>{filterTitle}</Typography.Title>
      <Slider
        range
        min={minValue}
        max={maxValue}
        value={range}
        onChange={handleRangeChange}
      />
      <div style={inputGroupStyle}>
        <InputNumber
          controls={false}
          min={minValue}
          max={maxValue}
          value={range[0]}
          onChange={handleMinInputChange}
        />
        <InputNumber
          controls={false}
          min={minValue}
          max={maxValue}
          value={range[1]}
          onChange={handleMaxInputChange}
        />
        <Button onClick={handleSubmit}>OK</Button>
      </div>
    </div>
  );
};

export default PriceRangeFilter;
