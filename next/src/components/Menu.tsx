import type { ReactNode } from "react";
import { Fragment } from "react";
import { Menu as MenuPrimitive, Transition } from "@headlessui/react";
import { FaChevronDown } from "react-icons/fa";
import clsx from "clsx";

interface MenuProps {
  icon?: ReactNode;
  chevron?: boolean;
  name?: string;
  buttonPosition?: "top" | "bottom";
  items: JSX.Element[];
}

function Menu({ icon, name, items, chevron, buttonPosition = "top" }: MenuProps) {
  return (
    <MenuPrimitive>
      <div className="relative">
        <MenuPrimitive.Button className="neutral-button-primary flex h-8 items-center gap-1 rounded-lg  border p-2 font-bold">
          <div>{icon}</div>
          {name && <p className="text-gray/50 font-mono text-sm">{name}</p>}
          {chevron && <FaChevronDown size={15} className="ml-2" />}
        </MenuPrimitive.Button>
        <MenuItems buttonPosition={buttonPosition} items={items} />
      </div>
    </MenuPrimitive>
  );
}

type MenuItemsProps = {
  buttonPosition: "top" | "bottom";
  items: JSX.Element[];
  show?: boolean;
};

export const MenuItems = ({ buttonPosition, items, show }: MenuItemsProps) => {
  return (
    <Transition
      show={show ? true : undefined}
      enter="transition duration-100 ease-out"
      enterFrom="transform scale-95 opacity-0"
      enterTo="transform scale-100 opacity-100"
      leave="transition duration-75 ease-out"
      leaveFrom="transform scale-100 opacity-100"
      leaveTo="transform scale-95 opacity-0"
    >
      <MenuPrimitive.Items
        className={clsx(
          "background-color-3 absolute right-0 z-20  max-h-48 w-fit min-w-full overflow-hidden rounded-xl border-2 border-white/10 shadow-xl",
          buttonPosition === "top" ? "top-full mt-1" : "bottom-full mb-9"
        )}
      >
        {items.map((item) => {
          const itemName = (item.props as { name: string }).name;
          return (
            <MenuPrimitive.Item key={itemName} as={Fragment}>
              <div className="w-full">{item}</div>
            </MenuPrimitive.Item>
          );
        })}
      </MenuPrimitive.Items>
    </Transition>
  );
};

export default Menu;
