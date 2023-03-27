import React, { ChangeEvent, useState } from "react";
import {
  Layout,
  Space,
  Input,
  Col,
  Row,
  Typography,
  Button,
  Collapse,
} from "antd";
import { CheckboxValueType } from "antd/lib/checkbox/Group";

import { Sider, Divider } from "src/components";
import {
  RangeFilter,
  CheckboxFilter,
  ProductsList,
  Sort,
} from "src/containers";

import { useGetProducts, useGetProductsData } from "src/hooks/products";

//TODO: Decompose into smaller components
const ProductsListPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const [sorting, setSorting] = useState("discountPrice"); //TODO: Put values in config
  const [selectedBrands, setSelectedBrands] = useState<CheckboxValueType[]>([]); // TODO: Make filter universal
  const [filterRange, setFilterRange] = useState({});

  const products = useGetProducts({
    searchTerm,
    page,
    sortField: sorting,
    filters: { ...(selectedBrands.length > 0 && { brand: selectedBrands }) },
    range: filterRange,
  });

  const { productPrices, productsBrands } = useGetProductsData({
    searchTerm,
    sortField: sorting,
    filters: { ...(selectedBrands.length > 0 && { brand: selectedBrands }) },
  });

  const clearSearch = (e: ChangeEvent<HTMLInputElement>) =>
    !e.target.value.length && setSearchTerm("");

  const resetAllFilters = () => {
    setFilterRange({});
    setSelectedBrands([]);
  };

  return (
    <Space direction="vertical" style={{ width: "100%" }} size={[0, 48]}>
      <Layout>
        <Layout.Header style={{ backgroundColor: "#fff" }}>
          <Row justify="center" align="middle" style={{ height: "100%" }}>
            <Col xs={24} md={12} lg={10} xl={8} style={{ display: "flex" }}>
              <Input.Search
                allowClear
                placeholder="I'm looking for..."
                onSearch={setSearchTerm}
                onChange={clearSearch}
                enterButton
              />
            </Col>
          </Row>
        </Layout.Header>
        <Layout>
          <Layout.Content
            style={{
              backgroundColor: "#fff",
              paddingLeft: 32,
              paddingRight: 32,
              paddingTop: 16,
              paddingBottom: 16,
            }}
          >
            <Row align="bottom" justify="space-between">
              <Col>
                {selectedBrands.length ||
                (Object.keys(filterRange).length && !products.isLoading) ? (
                  <Space>
                    <Typography.Text>
                      Selected {products.data?.total} products
                    </Typography.Text>
                    <Button onClick={resetAllFilters} shape="round">
                      Reset filters
                    </Button>
                  </Space>
                ) : null}
              </Col>
              <Col xs={24} sm={8} md={6} lg={6} xl={4}>
                <Sort onChange={setSorting} sortType={sorting}></Sort>
              </Col>
            </Row>
          </Layout.Content>
          <Divider />
        </Layout>
        <Layout
          style={{ paddingLeft: 32, paddingRight: 32, backgroundColor: "#fff" }}
        >
          <Sider
            isLoading={productsBrands.isLoading && productPrices.isLoading}
          >
            <Collapse defaultActiveKey={[1, 3]} ghost>
              <Collapse.Panel
                key={1}
                header={
                  <Space>
                    <Typography.Text>Brand</Typography.Text>
                    <Typography.Text type="secondary">
                      {productsBrands.data?.length}
                    </Typography.Text>
                  </Space>
                }
              >
                <CheckboxFilter
                  options={productsBrands.data}
                  checkedValues={selectedBrands}
                  onChange={setSelectedBrands}
                  containerStyle={{ marginBottom: 12 }}
                />
              </Collapse.Panel>
              <Divider key={2} />
              <Collapse.Panel key={3} header="Price">
                <RangeFilter
                  minValue={Math.min(...productPrices.data)}
                  maxValue={Math.max(...productPrices.data)}
                  onSubmit={(range) =>
                    setFilterRange((prevState) => ({
                      ...prevState,
                      price: range,
                    }))
                  }
                />
              </Collapse.Panel>
            </Collapse>
          </Sider>
          <Layout.Content>
            <ProductsList
              data={products.data}
              isLoading={products.isFetching}
              onPageSelected={setPage}
            ></ProductsList>
          </Layout.Content>
        </Layout>
      </Layout>
    </Space>
  );
};

export default ProductsListPage;
