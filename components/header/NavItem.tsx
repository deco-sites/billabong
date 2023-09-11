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

function NavItem({ item, index, length }: { item: INavItem; index: number, length: number }) {
  const { href, label, children } = item;

  return (
    <li class={`group flex items-center ${0 === index ? " text-[#FFF] bg-[#000]" : length - 1 === index && "text-[#FA0505]"}`}>
      <a href={href} class="px-4 py-3">
        <span class="group-hover:underline">
          {label}
        </span>
      </a>

      {children && children.length > 0 &&
        (
          <div
            class={`fixed hidden hover:flex group-hover:flex z-50 items-start justify-center gap-6 border-base-200 bg-[#f8f8f8] 
            ${length - 1 === index ? "-translate-x-64 text-[#FA0505]" : index === 0 ? "translate-x-0 bg-[#000]" : "-translate-x-8 border-b-2 border-t" }`}
            style={{ top: "48px", marginTop: headerHeight }}
          >
            {
              /* {image?.src && (
              <Image
                class="p-6"
                src={image.src}
                alt={image.alt}
                width={300}
                height={332}
                loading="lazy"
              />
            )} */
            }
            <ul
              class={`grid items-start justify-center gap-2 px-2 py-4 
              ${children.length > 8 ? "grid-cols-3" : "grid-cols-2"}
              ${length - 1 === index && "w-max"}
              ${0 === index && "bg-[#000]"}
              `}
            >
              {children.map((node) => (
                <li class={`p-2 ${0 === index ? "text-[#FFF]" : "text-[#000]"}`}>
                  <a class="hover:underline" href={node.href}>
                    <span>{node.label}</span>
                  </a>

                  {
                    /* <ul class="flex flex-col gap-1 mt-4">
                    {node.children?.map((leaf) => (
                      <li>
                        <a class="hover:underline" href={leaf.href}>
                          <span class="text-xs">{leaf.label}</span>
                        </a>
                      </li>
                    ))}
                  </ul> */
                  }
                </li>
              ))}
            </ul>
          </div>
        )}
    </li>
  );
}

export default NavItem;
