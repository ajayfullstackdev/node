import App from "./App";
import EditAirline from "./pages/EditAirline";

const routes = [
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/single/:id",
    element: <EditAirline />,
  },
];

export default routes;
