import App from "./App";
import ProductDetails from "./pages/ProductDetails";
import Products from "./pages/Products";

const routes = [
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/products/category/:categoryid",
    element: <Products />,
  },
  {
    path: "/products/category/:categoryid/product/:productid",
    element: <ProductDetails />,
  },
];

export default routes;
