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

export default function LinksMenu({ items, menuBottom }: Props) {
  return (
    <div class="flex flex-col">
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
