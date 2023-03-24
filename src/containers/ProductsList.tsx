import * as React from "react";

import { Empty } from "antd";
import { CardItem } from "src/components";

type Props = {
  productsData: Products | undefined;
  isLoading: boolean;
};

const ProductsList: React.FC<Props> = ({ productsData, isLoading }) => {
  if (isLoading) {
    return (
      <>
        <CardItem isLoading={true} />
        <CardItem isLoading={true} />
        <CardItem isLoading={true} />
        <CardItem isLoading={true} />
      </>
    );
  }
  return (
    <>
      {productsData?.total === 0 ? (
        <Empty style={{ paddingTop: 60 }} />
      ) : (
        productsData?.products.map((product: ProductType) => (
          <CardItem
            key={product.id}
            title={product.title}
            image={product.images[0]}
            description={product.description}
          ></CardItem>
        ))
      )}
    </>
  );
};

export default ProductsList;
