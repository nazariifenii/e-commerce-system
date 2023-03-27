import { createBrowserRouter } from "react-router-dom";
import { ErrorPage, ProductsListPage } from "src/pages";

const router = createBrowserRouter([
  {
    path: "/",
    element: <ProductsListPage />,
    errorElement: <ErrorPage />,
  },
]);

export default router;
