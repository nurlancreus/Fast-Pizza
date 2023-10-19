import { type ActionFunction } from "react-router-dom";
import { updateOrder } from "@/services/apiRestaurant";
import { type OrderType } from "@/services/model/types";

export const action: ActionFunction<{ params: { orderId: string } }> = async ({ params }) => {
  await updateOrder(params.orderId!, { priority: true } as Partial<OrderType>);

  return null;
};
