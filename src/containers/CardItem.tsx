import React from "react";
import { Card, Image, Skeleton, Typography, Rate } from "antd";

type Props = {
  title?: string;
  image?: string;
  description?: string;
  isLoading?: boolean;
  rating?: number;
};

const containerStyle: React.CSSProperties = {
  textAlign: "left",
};

const CardItem: React.FC<Props> = ({
  title,
  image,
  description,
  isLoading = false,
  rating,
}) => (
  <Card
    style={containerStyle}
    cover={
      isLoading ? (
        <Skeleton.Image style={{ width: "100%", height: 200 }} active />
      ) : (
        <Image height={200} src={image} alt={title} preview={false} />
      )
    }
  >
    <Skeleton loading={isLoading} active>
      <Typography.Title level={5}>{title}</Typography.Title>
      <Typography.Text ellipsis type="secondary">
        {description}
      </Typography.Text>
      {rating && (
        <div style={{ marginTop: 15 }}>
          <Rate
            style={{ fontSize: 15 }}
            disabled
            allowHalf
            value={rating}
          ></Rate>
          <Typography.Text style={{ marginLeft: 10, fontSize: 13 }}>
            {rating}
          </Typography.Text>
        </div>
      )}
      <br />
    </Skeleton>
  </Card>
);

export default CardItem;
