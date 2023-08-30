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
  // image?: { src?: string; alt?: string };
}

function NavItem({ item, lastedtwo }: { item: INavItem, lastedtwo: boolean }) {
  const { href, label, children } = item;

  return (
    <li class="group flex items-center">
      <a href={href} class="px-4 py-3">
        <span class="group-hover:underline">
          {label}
        </span>
      </a>

      {children && children.length > 0 &&
        (
          <div
            class={`fixed hidden hover:flex group-hover:flex z-50 items-start justify-center gap-6 border-t border-b-2 border-base-200 bg-[#f8f8f8] ${lastedtwo && "-translate-x-10" }`}
            style={{ top: "48px", marginTop: headerHeight }}
          >
            {/* {image?.src && (
              <Image
                class="p-6"
                src={image.src}
                alt={image.alt}
                width={300}
                height={332}
                loading="lazy"
              />
            )} */}
            <ul class={`grid items-start justify-center gap-6 ${children.length > 8 ? "grid-cols-3" : "grid-cols-2" }`}>
              {children.map((node) => (
                <li class="p-6">
                  <a class="hover:underline" href={node.href}>
                    <span>{node.label}</span>
                  </a>

                  {/* <ul class="flex flex-col gap-1 mt-4">
                    {node.children?.map((leaf) => (
                      <li>
                        <a class="hover:underline" href={leaf.href}>
                          <span class="text-xs">{leaf.label}</span>
                        </a>
                      </li>
                    ))}
                  </ul> */}
                </li>
              ))}
            </ul>
          </div>
        )}
    </li>
  );
}

export default NavItem;
