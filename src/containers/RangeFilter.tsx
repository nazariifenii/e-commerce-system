import React, { useEffect, useState } from "react";
import { Slider, InputNumber, Typography, Button, Row, Col } from "antd";

type Props = {
  title?: string;
  minValue: number;
  maxValue: number;
  onSubmit: (value: NumberRange) => void;
};

// TODO: Fix Infinity value blinking in the input
const PriceRangeFilter: React.FC<Props> = ({
  title,
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
      {title && <Typography.Title level={5}>{title}</Typography.Title>}
      <Row justify="space-between">
        <Row>
          <Col>
            <InputNumber
              style={{ width: 70 }}
              controls={false}
              min={minValue}
              max={maxValue}
              value={range[0]}
              onChange={handleMinInputChange}
            />
          </Col>
          <span>&nbsp;-&nbsp;</span>
          <Col>
            <InputNumber
              style={{ width: 70 }}
              controls={false}
              min={minValue}
              max={maxValue}
              value={range[1]}
              onChange={handleMaxInputChange}
            />
          </Col>
        </Row>
        <Col>
          <Button onClick={handleSubmit}>OK</Button>
        </Col>
      </Row>
      <Slider
        range
        min={minValue}
        max={maxValue}
        value={range}
        onChange={handleRangeChange}
      />
    </div>
  );
};

export default PriceRangeFilter;
