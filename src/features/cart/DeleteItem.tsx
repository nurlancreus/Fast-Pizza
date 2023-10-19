import { useDispatch } from "react-redux";
import Button from "@/ui/Button";
import { deleteItem } from "./cartSlice";

type DeleteItemProps = {
  pizzaId: number;
};

function DeleteItem({ pizzaId }: DeleteItemProps) {
  const dispatch = useDispatch();

  return (
    <Button variant="small" onClick={() => dispatch(deleteItem(pizzaId))}>
      Delete
    </Button>
  );
}

export default DeleteItem;
