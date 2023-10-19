import { type LoaderFunction } from "react-router-dom";
import { getOrder } from "@/services/apiRestaurant";

export const loader: LoaderFunction<{ params: { orderId: string } }> = async ({ params }) => {
  const order = await getOrder(params.orderId!);
  return order;
};
