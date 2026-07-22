import { createBrowserRouter } from "react-router";
import Home from "./pages/Home";
import Portfolio from "./pages/Portfolio";

export const router = createBrowserRouter([
  { path: "/", Component: Home },
  { path: "/portfolio", Component: Portfolio },
]);
