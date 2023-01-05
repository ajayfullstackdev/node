import App from "./App";
import ProductDetails from "./pages/ProductDetails";

const routes = [
  {
    path: "/",
    element: <App />,
  },

  {
    path: "/productdetails/:id",
    element: <ProductDetails />,
  },
];

export default routes;
