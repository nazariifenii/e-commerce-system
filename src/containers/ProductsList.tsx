import * as React from "react";

import { List } from "antd";
import { CardItem } from "src/containers";

type Props = {
  data?: Products;
  isLoading: boolean;
  onPageSelected: (page: number) => void;
};

const placeholderData = Array.from({ length: 8 }, () => Object.create(null));

const ProductsList: React.FC<Props> = ({ data, isLoading, onPageSelected }) => (
  <List
    style={{ marginTop: 12, marginBottom: 60 }}
    grid={{
      gutter: 16,
      xs: 1,
      sm: 2,
      md: 2,
      lg: 3,
      xl: 4,
      xxl: 5,
    }}
    dataSource={isLoading ? placeholderData : data?.rows} // Plceholder data to render loading indicators
    pagination={{
      hideOnSinglePage: true,
      position: "bottom",
      align: "center",
      total: data?.total,
      showSizeChanger: false,
      onChange: onPageSelected,
    }}
    renderItem={(product: ProductType) => (
      <List.Item>
        {isLoading ? (
          <CardItem isLoading={true} />
        ) : (
          <CardItem
            key={product.id} // FIXME: Pass whole object
            title={product.title}
            image={product.thumbnail}
            description={product.description}
            price={product.price}
            discountPercentage={product.discountPercentage}
            rating={product.rating}
          />
        )}
      </List.Item>
    )}
  />
);

export default ProductsList;
