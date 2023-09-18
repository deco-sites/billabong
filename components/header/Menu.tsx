import Icon from "$store/components/ui/Icon.tsx";
import type { MenuBottom, NavItem } from "./Header.tsx";
import type { Image as LiveImage } from "deco-sites/std/components/types.ts";
import LinksMenu from "$store/components/header/LinksMenu.tsx";

export interface Props {
  items: NavItem[];
  menuBottom?: MenuBottom[];
  logo?: { src: LiveImage; alt: string };
}


function Menu({ items, menuBottom }: Props) {
  return (
    <div class="flex flex-col h-full bg-[#f8f8f8]">
      <div class="flex flex-row justify-around">
        <div class="py-4 w-full">
          <p class="text-[#202020] text-sm text-center">MASCULINO</p>
        </div>
        <div class="bg-white py-4 w-full">
          <p class="text-[#202020] text-sm text-center">FEMININO</p>
        </div>
      </div>
      <LinksMenu {...{ items, menuBottom }} />
    </div>
  );
}

export default Menu;
