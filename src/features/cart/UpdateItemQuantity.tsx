import { useDispatch } from "react-redux";
import Button from "@/ui/Button";
import { decreaseItemQuantity, increaseItemQuantity } from "./cartSlice";

type UpdateItemQuantityProps = {
  pizzaId: number;
  currentQuantity: number;
};

function UpdateItemQuantity({
  pizzaId,
  currentQuantity,
}: UpdateItemQuantityProps) {
  const dispatch = useDispatch();

  return (
    <div className="flex items-center gap-1 md:gap-3">
      <Button
        variant="round"
        onClick={() => dispatch(decreaseItemQuantity(pizzaId))}
      >
        -
      </Button>
      <span className="text-md font-medium">{currentQuantity}</span>
      <Button
        variant="round"
        onClick={() => dispatch(increaseItemQuantity(pizzaId))}
      >
        +
      </Button>
    </div>
  );
}

export default UpdateItemQuantity;
