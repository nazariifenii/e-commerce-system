import React, { ChangeEvent, useState } from "react";
import { Layout, Space, Input } from "antd";
import { CheckboxValueType } from "antd/lib/checkbox/Group";

import { Header, Sider, Content } from "src/components";
import {
  RangeFilter,
  CheckboxFilter,
  ProductsList,
  Sort,
} from "src/containers";

import { useGetProducts, useGetProductsData } from "src/hooks/products";

const ProductsListPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const [sorting, setSorting] = useState("price"); //TODO: PUt values in config
  const [selectedBrands, setSelectedBrands] = useState<CheckboxValueType[]>([]); // TODO: Make filter universal
  const [filterRange, setFilterRange] = useState({});

  const products = useGetProducts({
    searchTerm,
    page,
    sortField: sorting,
    filters: { ...(selectedBrands.length > 0 && { brand: selectedBrands }) },
    range: filterRange,
  });

  const { productsCategories, productsBrands } = useGetProductsData();

  const clearSearch = (e: ChangeEvent<HTMLInputElement>) =>
    !e.target.value.length && setSearchTerm("");

  return (
    <Space direction="vertical" style={{ width: "100%" }} size={[0, 48]}>
      <Layout>
        <Header>
          <Sort onChange={setSorting} sortType={sorting}></Sort>
          <Input.Search
            allowClear
            placeholder="Search for product"
            onSearch={setSearchTerm}
            onChange={clearSearch}
            enterButton
          />
        </Header>
        <Layout>
          <Sider isLoading={productsCategories.isLoading}>
            <CheckboxFilter
              title="Brand"
              options={productsBrands.data}
              checkedValues={selectedBrands}
              onChange={setSelectedBrands}
            ></CheckboxFilter>
            <RangeFilter
              filterTitle="Price"
              minValue={Math.min(...products.productPrices)}
              maxValue={Math.max(...products.productPrices)}
              onSubmit={(range) =>
                setFilterRange((prevState) => ({
                  ...prevState,
                  price: range,
                }))
              }
            ></RangeFilter>
          </Sider>
          <Content>
            <ProductsList
              data={products.data}
              isLoading={products.isLoading}
              onPageSelected={setPage}
            ></ProductsList>
          </Content>
        </Layout>
      </Layout>
    </Space>
  );
};

export default ProductsListPage;
