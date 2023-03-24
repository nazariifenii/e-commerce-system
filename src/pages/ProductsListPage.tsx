import React, { useEffect, useState } from "react";
import { Layout, Space, Input } from "antd";

import { CardItem, Header, Sider, Content } from "src/components";
import { RangeFilter, CheckboxFilter } from "src/containers";

type Product = {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: Array<string>;
};

type Products = {
  products: Array<Product>;
  total: number;
  skip: number;
  limit: number;
};

type Categories = Array<string>;

const ProductsListPage: React.FC = () => {
  const [productsData, setProductsData] = useState<Products>();
  const [productsCategories, setProductsCategories] = useState<Categories>([]);

  const productPrices =
    productsData?.products.map((product) => product.price) || [];

  useEffect(() => {
    const fetchCategories = () => {
      fetch("https://dummyjson.com/products/categories")
        .then((res) => res.json())
        .then(setProductsCategories);
    };

    const fetchProducts = () => {
      fetch("https://dummyjson.com/products")
        .then((res) => res.json())
        .then(setProductsData);
    };

    fetchProducts();
    fetchCategories();
  }, []);

  return (
    <Space direction="vertical" style={{ width: "100%" }} size={[0, 48]}>
      <Layout>
        <Header>
          <Input.Search
            placeholder="Search for product"
            onSearch={(value: string) => console.log(value)}
            enterButton
          />
        </Header>
        <Layout>
          <Sider>
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
            {productsData?.products.map((product: Product) => (
              <CardItem
                key={product.id}
                title={product.title}
                image={product.images[0]}
                description={product.description}
              ></CardItem>
            ))}
          </Content>
        </Layout>
      </Layout>
    </Space>
  );
};

export default ProductsListPage;
