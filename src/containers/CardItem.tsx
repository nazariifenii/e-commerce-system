import React from "react";
import { Card, Image, Skeleton, Typography, Rate, Space, Row } from "antd";
import { ThunderboltOutlined } from "@ant-design/icons";
import { blue } from "@ant-design/colors";

type Props = {
  title?: string;
  image?: string;
  description?: string;
  isLoading?: boolean;
  discountPercentage?: number;
  price?: number;
  rating?: number;
};

const containerStyle: React.CSSProperties = {
  textAlign: "left",
  minWidth: 200,
  maxWidth: 250,
  height: 370,
};

const CardItem: React.FC<Props> = ({
  title,
  image,
  isLoading = false,
  price,
  discountPercentage,
  rating,
}) => {
  const computedPrice =
    price &&
    discountPercentage &&
    Number((price - price * (discountPercentage / 100)).toFixed(2));

  // TODO: Can be moved to utils.ts
  const toUSD = (price: number) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(price);

  return (
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
        <Typography.Text style={{ fontSize: 15 }}>{title}</Typography.Text>
        {rating && (
          <Row align="middle">
            <Space>
              <Rate
                style={{ fontSize: 12 }}
                disabled
                allowHalf
                value={rating}
              ></Rate>
              <Typography.Text style={{ fontSize: 11 }}>
                {rating}
              </Typography.Text>
            </Space>
          </Row>
        )}

        <Space style={{marginTop: 8, marginBottom: 8}}>
          <Row>
            {price && (
              <Typography.Text delete style={{ fontSize: 12 }} type="secondary">
                {toUSD(price)}
              </Typography.Text>
            )}
          </Row>
          <Row>
            {computedPrice && (
              <Typography.Text style={{ fontSize: 24 }} type="danger">
                {toUSD(computedPrice)}
              </Typography.Text>
            )}
          </Row>
        </Space>

        <Row>
          <Space size="small">
            <Typography.Text style={{ fontSize: 12, color: blue.primary }}>
              Ready for shipment
            </Typography.Text>
            <ThunderboltOutlined
              style={{ fontSize: 12, color: blue.primary }}
            />
          </Space>
        </Row>
      </Skeleton>
    </Card>
  );
};

export default CardItem;
