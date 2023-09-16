import type { Props as SearchbarProps } from "$store/components/search/Searchbar.tsx";
import { MenuButton, SearchButton } from "$store/islands/Header/Buttons.tsx";
import Icon from "$store/components/ui/Icon.tsx";
import CartButtonVDNA from "$store/islands/Header/Cart/vnda.tsx";
import CartButtonVTEX from "$store/islands/Header/Cart/vtex.tsx";
import Searchbar from "$store/islands/Header/Searchbar.tsx";
import { PLATFORM } from "$store/platform.ts";
import Image from "deco-sites/std/components/Image.tsx";
import type { INavItem } from "./NavItem.tsx";
import NavItem from "./NavItem.tsx";
import { navbarHeight } from "./constants.ts";
import GenreButton from "$store/components/header/GenreButton.tsx";

function Navbar({ items, searchbar, logo, hide }: {
  items: INavItem[];
  searchbar: SearchbarProps;
  hide?: {
    account: false | true;
    wishlist: false | true;
    alert: false | true;
  }
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
        <div class="2xl:container xl:mx-auto hidden md:flex flex-row justify-between items-center border-b border-base-200 w-full pl-2 pr-6">
          <div class="flex">
            {logo && (
              <a
                href="/"
                aria-label="Store logo"
                class="block pr-4 py-1 w-[90px]"
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
            { !hide?.account && (
            <a
            class="btn btn-circle btn-sm btn-ghost"
            href="/login"
            aria-label="Log in"
          >
            <Icon id="User" size={24} strokeWidth={0.4} />
          </a>
          ) }
          { !hide?.wishlist && (
             <a
              class="btn btn-circle btn-sm btn-ghost"
              href="/wishlist"
              aria-label="Wishlist"
            >
              <Icon
                id="Heart"
                size={24}
                strokeWidth={2}
                fill="none"
              />
            </a>
            ) }
            {PLATFORM === "vtex" && <CartButtonVTEX />}
            {PLATFORM === "vnda" && <CartButtonVDNA />}
          </div>
        </div>
        <div class="hidden flex-auto md:flex bg-[#f8f8f8]">
          <div class="2xl:container xl:mx-auto hidden flex-auto md:flex pl-2">
            {items.map((item, index) => (
              <NavItem
                item={item}
                length={items?.length}
                index={index}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default Navbar;
