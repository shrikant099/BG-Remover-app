import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import Layout from "./Layout.jsx";
import Home from "./components/Home.jsx";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import About from "./components/About";
import LoginSuccess from "./components/LoginSuccess";

import store from "./redux/store";
import { Provider } from "react-redux";
import { LoaderProvider } from "./context/loaderContext";
import Subscription from "./pages/Subscription";
import History from "./pages/History";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route path="" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/buy" element={<Subscription />} />
      <Route path="/history" element={<History />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/login-success" element={<LoginSuccess />} />
      <Route path="/login" element={<Login />} />
    </Route>
  )
);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <LoaderProvider>
        <RouterProvider router={router} />
      </LoaderProvider>
    </Provider>
  </StrictMode>
);
