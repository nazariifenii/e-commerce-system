import React from "react";
import {
  Card,
  Image,
  Skeleton,
  Typography,
  Rate,
  Space,
  Row,
  Badge,
} from "antd";
import { ThunderboltOutlined } from "@ant-design/icons";
import { blue } from "@ant-design/colors";

type Props = {
  product?: ProductType;
  isLoading?: boolean;
};

const containerStyle: React.CSSProperties = {
  textAlign: "left",
  minWidth: 200,
  maxWidth: 250,
  height: 370,
};

// TODO: Can be moved to utils.ts
const toUSD = (price: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(price);

const CardItem: React.FC<Props> = ({ product, isLoading = false }) => {
  const {
    title,
    thumbnail: image,
    price,
    discountPrice,
    discountPercentage,
    rating,
  } = product || {};

  return (
    <Card
      style={containerStyle}
      cover={
        isLoading ? (
          <Skeleton.Image style={{ width: "100%", height: 200 }} active />
        ) : (
          <Badge count={`- ${discountPercentage} %`} offset={[-40, 20]}>
            <Image
              height={200}
              width={"100%"}
              style={{ padding: 1 }} // Do not overlap Card borders
              src={image}
              alt={title}
              preview={false}
            />
          </Badge>
        )
      }
    >
      <Skeleton loading={isLoading} active>
        <Typography.Text style={{ fontSize: 15 }} ellipsis>
          {title}
        </Typography.Text>
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
        <Space style={{ marginTop: 8, marginBottom: 8 }}>
          <Row>
            {price && (
              <Typography.Text delete style={{ fontSize: 12 }} type="secondary">
                {toUSD(price)}
              </Typography.Text>
            )}
          </Row>
          <Row>
            {discountPrice && (
              <Typography.Text style={{ fontSize: 24 }} type="danger">
                {toUSD(discountPrice)}
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
