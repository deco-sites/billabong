import { SendEventOnLoad } from "$store/components/Analytics.tsx";
import { Layout as cardLayout } from "$store/components/product/ProductCard.tsx";
import FiltersColm from "$store/components/search/FiltersColm.tsx";
import FiltersRows from "$store/components/search/FiltersRows.tsx";
import Icon from "$store/components/ui/Icon.tsx";
import SearchControls from "$store/islands/SearchControls.tsx";
import { useOffer } from "$store/sdk/useOffer.ts";
import type { ProductListingPage } from "deco-sites/std/commerce/types.ts";
import { mapProductToAnalyticsItem } from "deco-sites/std/commerce/utils/productToAnalyticsItem.ts";
import ProductGallery, { Columns } from "../product/ProductGallery.tsx";

export interface Layout {
  /**
   * @description Use drawer for mobile like behavior on desktop. Aside for rendering the filters alongside the products
   */
  variant?: "aside" | "drawer";
  /**
   * @description Number of products per line on grid
   */
  columns: Columns;
}

export interface Props {
  page: ProductListingPage | null;
  layout?: Layout;
  cardLayout?: cardLayout;
}

function renderPageIndex(pages: number) {
  let array: number[] | [] = [];
  for (let index = 1; index <= pages; index++) {
    array = [...array, index];
  }
  return array;
}

function NotFound() {
  return (
    <div class="w-full flex justify-center items-center py-10">
      <span>Not Found!</span>
    </div>
  );
}

function Result({
  page,
  layout,
  cardLayout,
}: Omit<Props, "page"> & { page: ProductListingPage }) {
  const { products, filters, breadcrumb, pageInfo, sortOptions } = page;
  console.log(pageInfo);
  const pages = Math.ceil(
    pageInfo.records as number / (pageInfo?.recordPerPage ?? 1) as number,
  );
  return (
    <>
      <div class="container px-4 sm:py-10 sm:pt-12">
        <SearchControls
          sortOptions={sortOptions}
          filters={filters}
          breadcrumb={breadcrumb}
          displayFilter={layout?.variant === "drawer"}
        />

        {layout?.variant === "aside" && filters.length > 0 && (
          <aside class="hidden sm:block min-w-[250px] w-full">
            <FiltersRows filters={filters} />
          </aside>
        )}

        <div class="flex flex-row">
          {layout?.variant === "aside" && filters.length > 0 && (
            <aside class="hidden sm:block w-min min-w-[250px]">
              <FiltersColm filters={filters} />
            </aside>
          )}
          <div class="flex-grow">
            <ProductGallery products={products} layout={cardLayout} />
          </div>
        </div>

        <div class="flex justify-center my-4">
          <div class="join">
            {pageInfo?.currentPage === 1 ? "" : (
              <a
                aria-label="previous page link"
                rel="prev"
                href={pageInfo.previousPage ?? "#"}
                class="btn btn-ghost join-item"
              >
                <Icon id="ChevronLeft" size={24} strokeWidth={2} />
              </a>
            )}
            <span class="btn btn-ghost join-item">
              {renderPageIndex(pages).map((page) => (
                <span
                  class={`${
                    page === pageInfo?.currentPage
                      ? "font-bold text-[17px] border bg-[#f8f8f8] p-1"
                      : "font-medium text-base"
                  }`}
                >
                  {page}
                </span>
              ))}
            </span>
            {pageInfo?.currentPage === pages ? "" : (
              <a
                aria-label="next page link"
                rel="next"
                href={pageInfo.nextPage ?? "#"}
                class="btn btn-ghost join-item"
              >
                <Icon id="ChevronRight" size={24} strokeWidth={2} />
              </a>
            )}
          </div>
        </div>
      </div>
      <SendEventOnLoad
        event={{
          name: "view_item_list",
          params: {
            // TODO: get category name from search or cms setting
            item_list_name: "",
            item_list_id: "",
            items: page.products?.map((product) =>
              mapProductToAnalyticsItem({
                ...(useOffer(product.offers)),
                product,
                breadcrumbList: page.breadcrumb,
              })
            ),
          },
        }}
      />
    </>
  );
}

function SearchResult({ page, ...props }: Props) {
  if (!page) {
    return <NotFound />;
  }

  return <Result {...props} page={page} />;
}

export default SearchResult;
