import { redirect } from "react-router-dom";
import { createOrder } from "@/services/apiRestaurant";

import store from "@/app/store";
import { type CartItemType, clearCart } from "../cart/cartSlice";

const isValidPhone = (str: string) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str,
  );

type FormDataType = {
  customer: string;
  phone: string;
  address: string;
  priority: string | null;
  cart: string;
};

export const action = async ({ request }: { request: Request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData) as FormDataType;

  const order = {
    ...data,
    cart: JSON.parse(data.cart) as Array<CartItemType>,
    priority: data.priority === "on",
  };

  try {
    if (!isValidPhone(order.phone))
      throw {
        phone:
          "Please, give us your correct phone number. We might need it to contact you.",
      };

    // if everything is okay, create new order and redirect
    const newOrder = await createOrder(order);

    // Do NOT overuse!
    store.dispatch(clearCart());

    return redirect(`/order/${newOrder.id}`);
  } catch (error) {
    return error as Record<string, string>;
  }
};
