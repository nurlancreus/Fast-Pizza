import { useDispatch, useSelector } from "react-redux";
import LinkButton from "@/ui/LinkButton";
import Button from "@/ui/Button";
import CartItem from "./CartItem";
import EmptyCart from "./EmptyCart";

import { selectUser } from "../user/userSlice";
import { firstLetterUpper } from "@/utils/helpers";
import { clearCart, selectCart } from "./cartSlice";

export function Cart() {
  const  cart  = useSelector(selectCart);
  const { userName } = useSelector(selectUser);

  const dispatch = useDispatch();

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  if (!cart.length) return <EmptyCart />;

  return (
    <div className="px-4 py-3">
      <LinkButton to="/menu">&larr; Back to menu</LinkButton>

      <h2 className="mt-7 text-xl font-semibold">
        Your cart, {firstLetterUpper(userName)}
      </h2>

      <ul className="mt-3 divide-y divide-stone-200 border-b">
        {cart.map((item) => (
          <CartItem item={item} key={item.pizzaId} />
        ))}
      </ul>
      <div className="mt-6 space-x-2">
        <Button to="/order/new" variant="primary">
          Order pizzas
        </Button>
        <Button variant="secondary" onClick={handleClearCart}>
          Clear cart
        </Button>
      </div>
    </div>
  );
}
