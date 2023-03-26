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
    grid={{
      gutter: 16,
      xs: 1,
      sm: 2,
      md: 3,
      lg: 4,
      xl: 4,
      xxl: 3,
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
            key={product.id}
            title={product.title}
            image={product.thumbnail}
            description={product.description}
            rating={product.rating}
          />
        )}
      </List.Item>
    )}
  />
);

export default ProductsList;
