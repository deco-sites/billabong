import Image from "deco-sites/std/components/Image.tsx";
import { headerHeight } from "./constants.ts";

export interface NavItemChild {
  label: string;
  href: string;
}

export interface INavItem {
  label: string;
  href: string;
  children?: NavItemChild[];
}

function NavItem(
  { item, index, length }: { item: INavItem; index: number; length: number },
) {
  const { href, label, children } = item;

  return (
    <li class="group flex items-center text-xs first:text-[#FFF] first:bg-black last:text-[#FA0505] w-full relative">
      <a href={href} class="px-4 py-7 w-full flex justify-center">
        <span class="group-hover:underline font-semibold">
          {label}
        </span>
      </a>

      {children && children.length > 0 &&
        (
          <div
            class={`absolute hidden hover:flex group-hover:flex z-50 items-start justify-center gap-6 border-base-200 bg-[#f8f8f8] border-b-2 last:text-[#FA0505] first:bg-[#000] first:border-t-transparent
            ${
              length - 1 === index &&
              "right-0 text-[#FA0505]"
            }s
            `}
            style={{ top: "71px" }}
          >
            <ul
              class={`grid items-start justify-center gap-2 px-2 py-4 
              ${children.length > 8 ? "grid-cols-3" : "grid-cols-2"}
              w-[300px] ${0 === index && "bg-[#000]"}
              `}
            >
              {children.map((node) => (
                <li
                  class={`p-2 ${0 === index ? "text-[#FFF]" : "text-[#000]"}`}
                >
                  <a class="hover:underline" href={node.href}>
                    <span>{node.label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
    </li>
  );
}

export default NavItem;
