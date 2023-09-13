import type { Props as SearchbarProps } from "$store/components/search/Searchbar.tsx";
import { MenuButton, SearchButton } from "$store/islands/Header/Buttons.tsx";
import CartButtonVDNA from "$store/islands/Header/Cart/vnda.tsx";
import CartButtonVTEX from "$store/islands/Header/Cart/vtex.tsx";
import Searchbar from "$store/islands/Header/Searchbar.tsx";
import { PLATFORM } from "$store/platform.ts";
import Image from "deco-sites/std/components/Image.tsx";
import type { INavItem } from "./NavItem.tsx";
import NavItem from "./NavItem.tsx";
import { navbarHeight } from "./constants.ts";
import GenreButton from "$store/components/header/GenreButton.tsx";

function Navbar({ items, searchbar, logo }: {
  items: INavItem[];
  searchbar: SearchbarProps;
  logo?: { src: string; alt: string };
}) {
  return (
    <>
      {/* Mobile Version */}
      <div
        style={{ height: navbarHeight }}
        class="md:hidden flex flex-row justify-between items-center border-b border-base-200 w-full pl-2 pr-6 gap-2"
      >
        <MenuButton />

        {logo && (
          <a
            href="/"
            class="flex-grow inline-flex items-center"
            style={{ minHeight: navbarHeight }}
            aria-label="Store logo"
          >
            <Image src={logo.src} alt={logo.alt} width={50} height={41} />
          </a>
        )}

        <div class="flex gap-1">
          <SearchButton />
          {PLATFORM === "vtex" && <CartButtonVTEX />}
          {PLATFORM === "vnda" && <CartButtonVDNA />}
        </div>
      </div>

      {/* Desktop Version */}
      <div>
        <div class="hidden md:flex flex-row justify-between items-center border-b border-base-200 w-full pl-2 pr-6">
          <div class="flex">
            {logo && (
              <a
                href="/"
                aria-label="Store logo"
                class="block px-4 py-1 w-[90px]"
              >
                <Image src={logo.src} alt={logo.alt} width={50} height={41} />
              </a>
            )}
            <GenreButton />
          </div>

          <div class="flex-none flex items-center justify-end gap-2 h-[49px]">
            <div class="flex items-center relative">
              <SearchButton />
              <Searchbar searchbar={searchbar} />
            </div>
            {PLATFORM === "vtex" && <CartButtonVTEX />}
            {PLATFORM === "vnda" && <CartButtonVDNA />}
          </div>
        </div>
        <div class="hidden flex-auto md:flex justify-around bg-[#f8f8f8]">
          {items.map((item, index) => (
            <NavItem
              item={item}
              length={items?.length}
              index={index}
            />
          ))}
        </div>
      </div>
    </>
  );
}

export default Navbar;
