import Icon, { AvailableIcons } from "$store/components/ui/Icon.tsx";

export type Item = {
  label: string;
  href: string;
};

export interface CategoryLinks {
  categories?: Item[];
}

export interface Props {
  categoryTable?: CategoryLinks[];
  layout?: {
    alignment: "Row" | "Column" | "Row/Column";
  };
}

export default function CategoryLinks({ categoryTable, layout }: Props) {
  console.log(categoryTable, layout);
  return (
    <>
      {categoryTable && (
        <>
          <div
            class={`flex gap-4
            ${
              layout?.alignment === "Row"
                ? "flex-row"
                : layout?.alignment === "Column"
                ? "flex-col"
                : "flex-col md:flex-row"
            } 
          `}
          >
            {categoryTable?.map(({ categories }) => (
              <ul class="flex flex-col gap-1 text-sm w-28">
                {categories?.map(({ label, href }) => (
                  <div class="first:font-bold first:mb-2 last:text-[#FA0505] text-[#202020] text-sm font-medium flex flex-col">
                    <li>
                      <a href={href} class="block py-1 link link-hover">
                        {label}
                      </a>
                    </li>
                  </div>
                ))}
              </ul>
            ))}
          </div>

          {
            /* Mobile view
          <ul class="flex flex-col md:hidden gap-4">
            {sections.map((section) => (
              <li>
                <details>
                  <summary>
                    <span class="pl-1 py-2">{section.label}</span>
                  </summary>
                  <ul
                    class={`flex flex-col gap-1 pl-5 pt-2`}
                  >
                    {section.items?.map((item) => (
                      <li>
                        <a href={item.href} class="block py-1 link link-hover">
                          {item.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </details>
              </li>
            ))}
          </ul> */
          }
        </>
      )}
    </>
  );
}
