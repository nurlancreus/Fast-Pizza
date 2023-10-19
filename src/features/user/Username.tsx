import { useDispatch, useSelector } from "react-redux";
import { logoutUser, selectUser } from "./userSlice";
import { clearCart } from "../cart/cartSlice";
import Button from "../../ui/Button";

function Username() {
  const { userName } = useSelector(selectUser);
  const dispatch = useDispatch();

  if (!userName) return null;

  return (
    <div className="hidden items-center gap-2 text-sm font-semibold md:flex">
      {userName}
      <Button
        type="button"
        variant="primary"
        onClick={() => {
          dispatch(logoutUser());
          dispatch(clearCart());
        }}
      >
        Log Out
      </Button>
    </div>
  );
}

export default Username;
