import Icon from "$store/components/ui/Icon.tsx";
import type { MenuBottom, NavItem } from "./Header.tsx";
import type { Image as LiveImage } from "deco-sites/std/components/types.ts";

export interface Props {
  items: NavItem[];
  menuBottom?: MenuBottom[];
  logo?: { src: LiveImage; alt: string };
}

function MenuItem({ item }: { item: NavItem }) {
  return (
    <div class="collapse collapse-plus">
      <input type="checkbox" />
      <div class="collapse-title">{item?.label}</div>
      <div class="collapse-content">
        <ul>
          {item.children?.map((node: NavItem) => (
            <li>
              <a href={node?.href}>
                <div class="py-2">{node?.label}</div>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
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
      <ul class="px-4 flex-grow flex flex-col divide-y divide-base-200">
        {items.map((item) => (
          <li>
            <MenuItem item={item} />
          </li>
        ))}
      </ul>

      <ul class="flex flex-row py-2 bg-[#f8f8f8] justify-around">
        {menuBottom && menuBottom.map(({ label, href }) => (
          <li>
            <a
              class="flex items-center gap-4 px-4 py-2"
              href={href}
            >
              <span class="text-sm font-bold uppercase">{label}</span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Menu;
