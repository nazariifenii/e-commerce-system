import React from "react";
import { Card, Image, Skeleton, Typography } from "antd";

type Props = {
  title?: string;
  image?: string;
  description?: string;
  isLoading?: boolean;
};

const containerStyle: React.CSSProperties = {
  width: 250,
  margin: 10,
  textAlign: "left",
};

const CardItem: React.FC<Props> = ({
  title,
  image,
  description,
  isLoading = false,
}) => (
  <Card
    style={containerStyle}
    cover={
      isLoading ? (
        <Skeleton.Image style={{ width: "100%", height: 200 }} active />
      ) : (
        <Image
          height={200}
          src={image}
          alt={title}
          preview={false}
          style={{ objectFit: "cover" }}
        />
      )
    }
  >
    <Skeleton loading={isLoading} active>
      <Typography.Title level={5}>{title}</Typography.Title>
      <Typography.Text ellipsis={true} type="secondary">
        {description}
      </Typography.Text>
      <br />
    </Skeleton>
  </Card>
);

export default CardItem;
