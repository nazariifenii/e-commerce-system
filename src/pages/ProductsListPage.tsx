import React, { useState } from "react";
import { Layout, Space, Input } from "antd";

import { Header, Sider, Content } from "src/components";
import { RangeFilter, CheckboxFilter, ProductsList } from "src/containers";

import { useGetProducts, useGetProductsCategories } from "src/hooks/products";

const ProductsListPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const {
    isLoading: productsLoading,
    productsData,
    productPrices,
  } = useGetProducts(searchTerm);
  
  const { isLoading: categoriesLoading, productsCategories } =
    useGetProductsCategories();

  const clearSearch = (searchTerm: any) => {
    if (!searchTerm.length) {
      setSearchTerm("");
    }
  };

  return (
    <Space direction="vertical" style={{ width: "100%" }} size={[0, 48]}>
      <Layout>
        <Header>
          <Input.Search
            allowClear
            placeholder="Search for product"
            onSearch={setSearchTerm}
            onChange={clearSearch}
            enterButton
          />
        </Header>
        <Layout>
          <Sider isLoading={categoriesLoading}>
            <CheckboxFilter
              title="Category"
              options={productsCategories}
              onChange={() => {}}
            ></CheckboxFilter>
            <RangeFilter
              filterTitle="Price"
              minValue={Math.min(...productPrices)}
              maxValue={Math.max(...productPrices)}
              onChange={() => {}}
            ></RangeFilter>
          </Sider>
          <Content>
            <ProductsList
              productsData={productsData}
              isLoading={productsLoading}
            ></ProductsList>
          </Content>
        </Layout>
      </Layout>
    </Space>
  );
};

export default ProductsListPage;
