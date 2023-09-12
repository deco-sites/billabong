import Avatar from "$store/components/ui/Avatar.tsx";
import { parseRange } from "deco-sites/std/utils/filters.ts";
import { formatPrice } from "$store/sdk/format.ts";
import type {
  Filter,
  FilterToggle,
  FilterToggleValue,
  ProductListingPage,
} from "deco-sites/std/commerce/types.ts";

interface Props {
  filters: ProductListingPage["filters"];
}

const isToggle = (filter: Filter): filter is FilterToggle =>
  filter["@type"] === "FilterToggle";

function ValueItem(
  { url, selected, label, quantity }: FilterToggleValue,
) {
  return (
    <a href={url} class="flex items-center gap-2">
      <div aria-checked={selected} class="checkbox" />
      <span class="text-sm">{label}</span>
      {quantity > 0 && <span class="text-sm text-base-300">({quantity})</span>}
    </a>
  );
}

function FilterValues({ key, values }: FilterToggle) {
  const flexDirection = key === "tamanho" || key === "cor"
    ? "flex-row"
    : "flex-col";

  return (
    <ul
      class={`absolute top-7 left-0 bg-[#f8f8f8] z-[99] ${
        values.length > 8 ? "grid-cols-2 w-max" : "grid-cols-1 w-max"
      } grid flex-wrap gap-2 p-4 ${flexDirection}`}
    >
      {values.map((item) => {
        const { url, selected, value, quantity } = item;

        if (key === "cor" || key === "tamanho") {
          return (
            <a href={url}>
              <Avatar
                content={value}
                variant={selected ? "active" : "default"}
              />
            </a>
          );
        }

        if (key === "price") {
          const range = parseRange(item.value);

          return range && (
            <ValueItem
              {...item}
              label={`${formatPrice(range.from)} - ${formatPrice(range.to)}`}
            />
          );
        }

        if (key === "category" || key === "subcategory") {
          return;
        }

        return <ValueItem {...item} />;
      })}
    </ul>
  );
}

function FiltersRows({ filters }: Props) {
  return (
    <ul class="flex flex-row gap-6 p-4 bg-[#f8f8f8]">
      {filters
        .filter(isToggle)
        .map((filter) => {
          return filter?.label === "Marca" || filter.label === "Categoria" ||
              filter.label === "Subcategoria"
            ? ""
            : (
              <li class="flex flex-col gap-4">
                <details class="relative">
                  <summary>{filter.label}</summary>
                  <FilterValues {...filter} />
                </details>
              </li>
            );
        })}
    </ul>
  );
}

export default FiltersRows;
