import React, { useEffect, useState } from "react";
import { Slider, InputNumber, Typography } from "antd";

type RangeState = [number, number];

type Props = {
  filterTitle: string;
  minValue: number;
  maxValue: number;
  onChange: (value: RangeState) => void;
};

const inputGroupStyle: React.CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
};

const PriceRangeFilter: React.FC<Props> = ({
  filterTitle,
  minValue,
  maxValue,
  onChange,
}) => {
  const [range, setRange] = useState<RangeState>([minValue, maxValue]);

  useEffect(() => setRange([minValue, maxValue]), [minValue, maxValue]);

  const handleRangeChange = (value: RangeState) => {
    setRange(value);
    onChange(value);
  };

  const handleMinInputChange = (value: number | null) => {
    value = value ?? minValue;
    if (value < minValue) {
      value = minValue;
    } else if (value > range[1]) {
      value = range[1];
    }
    setRange([value, range[1]]);
    onChange([value, range[1]]);
  };

  const handleMaxInputChange = (value: number | null) => {
    value = value ?? maxValue;
    if (value > maxValue) {
      value = maxValue;
    } else if (value < range[0]) {
      value = range[0];
    }
    setRange([range[0], value]);
    onChange([range[0], value]);
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
          min={minValue}
          max={maxValue}
          value={range[0]}
          onChange={handleMinInputChange}
        />
        <InputNumber
          min={minValue}
          max={maxValue}
          value={range[1]}
          onChange={handleMaxInputChange}
        />
      </div>
    </div>
  );
};

export default PriceRangeFilter;
