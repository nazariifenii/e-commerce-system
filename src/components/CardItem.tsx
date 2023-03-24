import React from "react";
import { Card, Image, Typography } from "antd";

type CardItemType = {
  title: string;
  image: string;
  description: string;
};

const containerStyle: React.CSSProperties = {
  width: 250,
  margin: 10,
  textAlign: "left",
};

const CardItem: React.FC<CardItemType> = ({ title, image, description }) => (
  <Card
    style={containerStyle}
    cover={
      <Image
        height={200}
        src={image}
        alt={title}
        preview={false}
        style={{ objectFit: "cover" }}
      />
    }
  >
    <Typography.Title level={5}>{title}</Typography.Title>
    <Typography.Text ellipsis={true} type="secondary">
      {description}
    </Typography.Text>
    <br />
  </Card>
);

export default CardItem;
