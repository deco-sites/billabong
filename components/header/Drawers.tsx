import type { Props as MenuProps } from "$store/components/header/Menu.tsx";
import LinksMenu from "$store/components/header/LinksMenu.tsx";
import Cart from "$store/components/minicart/Cart.tsx";
import type { Props as SearchbarProps } from "$store/components/search/Searchbar.tsx";
import Button from "$store/components/ui/Button.tsx";
import Drawer from "$store/components/ui/Drawer.tsx";
import Icon from "$store/components/ui/Icon.tsx";
import { useUI } from "$store/sdk/useUI.ts";
import type { ComponentChildren } from "preact";
import { lazy, Suspense } from "preact/compat";
import Image from "deco-sites/std/components/Image.tsx";
import type { Image as LiveImage } from "deco-sites/std/components/types.ts";

const Menu = lazy(() => import("$store/components/header/Menu.tsx"));
const Searchbar = lazy(() => import("$store/components/search/Searchbar.tsx"));

export interface Props {
  menu: MenuProps;
  searchbar?: SearchbarProps;
  /**
   * @ignore_gen true
   */
  children?: ComponentChildren;
}

const Aside = (
  { title, onClose, children, logo }: {
    title: string;
    onClose?: () => void;
    children: ComponentChildren;
    logo?: { src: LiveImage; alt: string };
  },
) => (
  <div
    class={`bg-base-100 grid ${
      title === "Buscar" ? "grid-rows-[auto_1fr_6fr]" : "grid-rows-[auto_1fr]"
    } h-full divide-y max-w-[440px]`}
  >
    <div class="flex justify-center items-center relative">
      {onClose && (
        <Button class="absolute left-2 top-2" onClick={onClose}>
          <Icon id="XMark" size={24} strokeWidth={2} />
        </Button>
      )}
      <h1 class="px-4 py-3">
        {title === "Menu"
          ? (
            <Image
              src={logo?.src ?? ""}
              alt={logo?.alt ?? ""}
              width={50}
              height={41}
            />
          )
          : <span class="font-medium text-2xl">{title}</span>}
      </h1>
    </div>
    <Suspense
      fallback={
        <div class="w-screen flex items-center justify-center">
          <span class="loading loading-ring" />
        </div>
      }
    >
      {children}
    </Suspense>
  </div>
);

function Drawers({ menu, searchbar, children }: Props) {
  const { displayCart, displayMenu, displaySearchDrawer } = useUI();

  return (
    <Drawer // left drawer
      open={displayMenu.value || displaySearchDrawer.value}
      onClose={() => {
        displayMenu.value = false;
        displaySearchDrawer.value = false;
      }}
      aside={
        <Aside
          logo={menu?.logo}
          onClose={() => {
            displayMenu.value = false;
            displaySearchDrawer.value = false;
          }}
          title={displayMenu.value ? "Menu" : "Buscar"}
        >
          {displayMenu.value && <Menu {...menu} />}
          {displaySearchDrawer.value && (
            <>
              <Searchbar {...searchbar} />
              <LinksMenu {...menu} />
            </>
          )}
        </Aside>
      }
    >
      <Drawer // right drawer
        class="drawer-end"
        open={displayCart.value !== false}
        onClose={() => displayCart.value = false}
        aside={
          <Aside
            title="Minha sacola"
            onClose={() => displayCart.value = false}
          >
            <Cart />
          </Aside>
        }
      >
        {children}
      </Drawer>
    </Drawer>
  );
}

export default Drawers;
