import { useLoaderData } from "react-router-dom";

import MenuItem from "./MenuItem";
import { type MenuItemType } from "@/services/model/types";

export function Menu() {
  const menu = useLoaderData() as Array<MenuItemType>;

  return (
    <ul className="divide-y divide-stone-200 px-2">
      {menu.map((pizza) => (
        <MenuItem key={pizza.id} pizza={pizza} />
      ))}
    </ul>
  );
}
