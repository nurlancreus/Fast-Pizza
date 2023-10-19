import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Outlet, useNavigate, useNavigation } from "react-router-dom";

import Header from "./Header";
import Loader from "./Loader";
import CartOverview from "@/features/cart/CartOverview";
import { selectUser } from "@/features/user/userSlice";

function AppLayout() {
  const navigation = useNavigation();
  const isLoading = navigation.state === "loading"; // navigation state is universal for the entire app, that's why we placed it in the layout
  const navigate = useNavigate();
  const {userName} = useSelector(selectUser);

  useEffect(() => {
    if (userName === "") {
      navigate("/");
    }
  }, [userName, navigate]);

  return (
    <div className="grid h-screen grid-rows-[auto_1fr_auto]">
      {isLoading && <Loader />}
      <Header />
      <div className="overflow-auto">
        <main className="mx-auto max-w-3xl">
          <Outlet />
        </main>
      </div>
      <CartOverview />
    </div>
  );
}

export default AppLayout;
