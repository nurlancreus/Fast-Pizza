import { useState } from "react";
import { type AnyAction } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import { Form, useActionData, useNavigation } from "react-router-dom";

import Button from "@/ui/Button";
import { selectTotalCartPrice, selectCart } from "../cart/cartSlice";
import EmptyCart from "../cart/EmptyCart";
import { fetchAddress, selectUser } from "../user/userSlice";

import { firstLetterUpper, formatCurrency } from "@/utils/helpers";

// https://uibakery.io/regex-library/phone-number

function CreateOrder() {
  const [withPriority, setWithPriority] = useState(false);
  const navigation = useNavigation();
  const isSubmittingForm = navigation.state === "submitting";
  const formErrors = useActionData() as Record<string, string>;
  const cart = useSelector(selectCart);

  const {
    userName,
    status: addressStatus,
    address,
    position,
    error: addressError,
  } = useSelector(selectUser);

  const isLoadingAddress = addressStatus === "loading";

  const totalCartPrice = useSelector(selectTotalCartPrice);
  const priorityPrice = withPriority ? Math.round(totalCartPrice * 0.2) : 0;
  const totalPrice = totalCartPrice + priorityPrice;

  const dispatch = useDispatch();

  if (!cart.length) return <EmptyCart />;

  return (
    <div className="px-4 py-6">
      <h2 className="mb-6 text-xl font-semibold">
        Ready to order? Let&apos;s go!
      </h2>

      {/* <Form method="POST" action="/order/new"> */}
      <Form method="POST">
        <div className="mb-5 grid gap-2 sm:grid-cols-[150px_1fr] sm:items-center sm:gap-0">
          <label className="sm:basis-40">First Name</label>
          <input
            type="text"
            name="customer"
            defaultValue={firstLetterUpper(userName)}
            required
            className="input"
          />
        </div>

        <div className="mb-5 grid gap-2 sm:grid-cols-[150px_1fr] sm:items-center sm:gap-0">
          <label className="sm:basis-40">Phone number</label>
          <div className="grow">
            <input type="tel" name="phone" required className="input" />
            {formErrors?.phone && (
              <p className="mt-2 rounded-md bg-red-100 p-2 text-xs text-red-700">
                {formErrors.phone}
              </p>
            )}
          </div>
        </div>

        <div className="relative mb-5 grid gap-2 sm:grid-cols-[150px_1fr] sm:items-center sm:gap-0">
          <label className="sm:basis-40">Address</label>
          <div className="grow">
            <input
              type="text"
              name="address"
              required
              defaultValue={address}
              disabled={isLoadingAddress}
              className="input"
            />
            {addressStatus === "error" && (
              <p className="mt-2 rounded-md bg-red-100 p-2 text-xs text-red-700">
                {addressError}
              </p>
            )}
          </div>
          {!position.latitude && !position.longitude && (
            <span className="absolute bottom-[3px] right-[3px] sm:top-[3px] md:bottom-[5px] md:top-[5px]">
              <Button
                type="button"
                variant="small"
                disabled={isLoadingAddress}
                onClick={(e) => {
                  e?.preventDefault();
                  dispatch(fetchAddress() as unknown as AnyAction);
                }}
              >
                Get Position
              </Button>
            </span>
          )}
        </div>

        <div className="mb-12 flex items-center gap-5">
          <input
            type="checkbox"
            name="priority"
            id="priority"
            //value={withPriority}
            checked={withPriority}
            onChange={(e) => setWithPriority(e.target.checked)}
            className="h-6 w-6 accent-yellow-400 focus:outline-none focus:ring focus:ring-yellow-400 focus:ring-offset-2"
          />
          <label htmlFor="priority" className="font-medium">
            Want to yo give your order priority?
          </label>
        </div>

        <div>
          <input type="hidden" name="cart" value={JSON.stringify(cart)} />
          {/* it is a nice way of getting JSON data in forms*/}
          <input
            type="hidden"
            name="position"
            value={
              position.longitude
                ? `${position.latitude}, ${position.longitude}`
                : ""
            }
          />

          <Button
            variant="primary"
            disabled={isSubmittingForm || isLoadingAddress}
          >
            {isSubmittingForm
              ? "Placing Order..."
              : `Order now for ${formatCurrency(totalPrice)}`}
          </Button>
        </div>
      </Form>
    </div>
  );
}

export default CreateOrder;
