import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";

import Home from "@/ui/Home";
import Error from "@/ui/Error";
import CreateOrder from "@/features/order/CreateOrder";
import Order from "@/features/order/Order";
import AppLayout from "@/ui/AppLayout";

import { loader as menuLoader } from "@/features/menu/menuLoader.ts";
import { loader as orderLoader } from "@/features/order/orderLoader.ts";
import { action as createOrderAction } from "@/features/order/createOrderAction.ts";
import { action as updateOrderAction } from "@/features/order/updateOrderAction.ts";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<AppLayout />} errorElement={<Error />}>
      <Route index element={<Home />} />
      <Route
        path="menu"
        lazy={async () => {
          const { Menu } = await import("../features/menu/Menu");
          return { Component: Menu };
        }}
        loader={menuLoader}
        errorElement={<Error />}
      />
      <Route
        path="cart"
        lazy={async () => {
          const { Cart } = await import("../features/cart/Cart");
          return { Component: Cart };
        }}
      />
      <Route
        path="order/new"
        element={<CreateOrder />}
        action={createOrderAction}
      />
      <Route
        path="order/:orderId"
        element={<Order />}
        loader={orderLoader}
        action={updateOrderAction}
        errorElement={<Error />}
      />
    </Route>,
  ),
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
