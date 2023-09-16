import type { Props as SearchbarProps } from "$store/components/search/Searchbar.tsx";
import Drawers from "$store/islands/Header/Drawers.tsx";
import type { Product, Suggestion } from "deco-sites/std/commerce/types.ts";
import type { Image } from "deco-sites/std/components/types.ts";
import Alert from "./Alert.tsx";
import Navbar from "./Navbar.tsx";
import { headerHeight } from "./constants.ts";

export interface NavItem {
  label: string;
  href: string;
  children?: Array<{
    label: string;
    href: string;
    // children?: Array<{
    //   label: string;
    //   href: string;
    // }>;
  }>;
  // image?: {
  //   src?: Image;
  //   alt?: string;
  // };
}

export interface MenuBottom {
  label: string;
  href: string;
}

export interface Props {
  alerts: string[];
  /** @title Search Bar */
  searchbar?: SearchbarProps;
  /**
   * @title Navigation items
   * @description Navigation items used both on mobile and desktop menus
   */
  navItems?: NavItem[];

  /**
   * @title Menu Bottom Options
   * @description
   */
  menuBottom?: MenuBottom[];

  /**
   * @title Product suggestions
   * @description Product suggestions displayed on search
   */
  products?: Product[] | null;

  /**
   * @title Enable Top Search terms
   */
  suggestions?: Suggestion | null;

  /** @title Logo */
  logo?: { src: Image; alt: string };
  hide?: {
    account: false | true;
    wishlist: false | true;
    alert: false | true;
  };
}

function Header({
  alerts,
  searchbar: _searchbar,
  products,
  hide,
  menuBottom,
  navItems = [],
  suggestions,
  logo,
}: Props) {
  const searchbar = { ..._searchbar, products, suggestions };
  return (
    <>
      <header style={{ height: headerHeight }}>
        <Drawers
          menu={{ items: navItems, menuBottom, logo }}
          searchbar={searchbar}
        >
          <div class="bg-base-100 fixed w-full z-50">
            {!hide?.alert && <Alert alerts={alerts} />}
            <Navbar
              items={navItems}
              searchbar={searchbar}
              logo={logo}
              hide={hide}
            />
          </div>
        </Drawers>
      </header>
    </>
  );
}

export default Header;
