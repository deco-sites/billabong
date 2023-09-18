/**
 * We use a custom route at /s?q= to perform the search. This component
 * redirects the user to /s?q={term} when the user either clicks on the
 * button or submits the form. Make sure this page exists in deco.cx/admin
 * of yout site. If not, create a new page on this route and add the appropriate
 * loader.
 *
 * Note that this is the most performatic way to perform a search, since
 * no JavaScript is shipped to the browser!
 */

import ProductCardRow from "$store/components/product/ProductCardRow.tsx";
import Button from "$store/components/ui/Button.tsx";
import Icon from "$store/components/ui/Icon.tsx";
import Slider from "$store/components/ui/Slider.tsx";
import Spinner from "$store/components/ui/Spinner.tsx";
import { sendEvent } from "$store/sdk/analytics.tsx";
import { useId } from "$store/sdk/useId.ts";
import { useUI } from "$store/sdk/useUI.ts";
import { useAutocomplete } from "deco-sites/std/packs/vtex/hooks/useAutocomplete.ts";
import { useEffect, useRef } from "preact/compat";

// Editable props
export interface Props {
  /**
   * @title Placeholder
   * @description Search bar default placeholder message
   * @default What are you looking for?
   */
  placeholder?: string;
  /**
   * @title Page path
   * @description When user clicks on the search button, navigate it to
   * @default /s
   */
  action?: string;
  /**
   * @title Term name
   * @description Querystring param used when navigating the user
   * @default q
   */
  name?: string;
  /**
   * TODO: Receive querystring from parameter in the server-side
   */
  query?: string;
}

function Searchbar({
  placeholder = "What are you looking for?",
  action = "/s",
  name = "q",
  query,
}: Props) {
  const id = useId();
  const { displaySearchPopup } = useUI();
  const searchInputRef = useRef<HTMLInputElement>(null);
  const { setSearch, suggestions, loading } = useAutocomplete();
  const { products = [], searches = [] } = suggestions.value ?? {};
  const hasProducts = Boolean(products.length);
  const hasTerms = Boolean(searches.length);
  const notFound = !hasProducts && !hasTerms;

  useEffect(() => {
    if (!searchInputRef.current) {
      return;
    }

    searchInputRef.current.focus();
  }, []);

  return (
    <div
      class="w-full flex flex-col pr-4 py-6 overflow-y-hidden md:py-2 md:pr-0"
      style={{ gridTemplateRows: "min-content auto" }}
    >
      <div class="flex items-center gap-4">
        <form id={id} action={action} class="join w-full md:w-auto">
          
          <Icon id="MagnifyingGlass" class="md:hidden" size={28} strokeWidth={0.1} />
          <input
            ref={searchInputRef}
            // id="search-input"
            class="input inputSearch bg-transparent md:bg-[#f8f8f8] flex-grow border-none focus:border-none active:border-none outline-none w-full md:w-[320px]"
            name={name}
            defaultValue={query}
            onInput={(e) => {
              const value = e.currentTarget.value;

              if (value) {
                sendEvent({
                  name: "search",
                  params: { search_term: value },
                });
              }

              setSearch(value);
            }}
            placeholder={placeholder}
            role="combobox"
            aria-controls="search-suggestion"
            autocomplete="off"
          />
          <Button
            type="button join-item"
            class="btn-ghost btn-square hidden sm:inline-flex pl-4"
            onClick={() => displaySearchPopup.value = false}
          >
            <Icon id="XMark" size={24} strokeWidth={2} />
          </Button>
        </form>
      </div>

      {!searchInputRef?.current?.value?.length
        ? ""
        : notFound
        ? (
          <div class="absolute top-[130px] md:top-[56px] bg-[#f8f8f8] z-[99] left-0 flex flex-col gap-4 w-full p-3">
            <span
              class="font-medium text-xl text-center"
              role="heading"
              aria-level={3}
            >
              Nenhum resultado encontrado
            </span>
            <span class="text-center text-base-300">
              Vamos tentar de outro jeito? Verifique a ortografia ou use um
              termo diferente
            </span>
          </div>
        )
        : (
          <div class="absolute top-[130px] md:top-[56px] bg-[#f8f8f8] z-[99] left-0 flex w-full">
            <div class="gap-4 flex flex-col overflow-y-scroll p-3 md:p-2 h-[75vh] md:h-auto">
              <div
                class={hasTerms ? "flex flex-col gap-6" : "hidden"}
              >
                <ul id="search-suggestion" class="flex flex-col gap-3 md:gap-6">
                  {searches.map(({ term }) => (
                    <li>
                      <a href={`/s?q=${term}`} class="flex gap-2 md:gap-4 items-center">
                        <span class="hidden md:inline">
                          <Icon
                            id="MagnifyingGlass"
                            size={24}
                            strokeWidth={0.01}
                          />
                        </span>
                        <span class="font-bold text-base text-[#333]">
                          {term}
                        </span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              <div
                class={hasProducts
                  ? "flex flex-col pt-6 md:pt-0 gap-6 overflow-x-hidden"
                  : "hidden"}
              >
                <span
                  class="font-bold text-sm text-[#000] uppercase"
                  role="heading"
                  aria-level={3}
                >
                  Sugestões de produtos
                </span>
                <div class="flex flex-col">
                  {products.map((product, index) => (
                    <div>
                      <ProductCardRow product={product} />
                    </div>
                  ))}
                </div>
                {
                  /* <Slider class="carousel">
                  {products.map((product, index) => (
                    <Slider.Item
                      index={index}
                      class="carousel-item first:ml-4 last:mr-4 min-w-[200px] max-w-[200px]"
                    >
                      <ProductCard product={product} />
                    </Slider.Item>
                  ))}
                </Slider> */
                }
              </div>
            </div>
          </div>
        )}
    </div>
  );
}

export default Searchbar;
