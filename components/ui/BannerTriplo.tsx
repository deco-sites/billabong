import { Picture, Source } from "deco-sites/std/components/Picture.tsx";
import type { Image as LiveImage } from "deco-sites/std/components/types.ts";
import HeaderSections from "$store/components/ui/SectionHeader.tsx";

/**
 * @titleBy alt
 */
export interface Banner {
  srcMobile: LiveImage;
  srcDesktop?: LiveImage;
  /**
   * @description Image alt text
   */
  alt: string;
  /**
   * @description When you click you go to
   */
  href: string;
  text?: string;
  cta?: string;
}

export type BorderRadius =
  | "none"
  | "sm"
  | "md"
  | "lg"
  | "xl"
  | "2xl"
  | "3xl"
  | "full";

export interface Props {
  title?: string;
  /**
   * @description Item's border radius in px
   */
  borderRadius: {
    /** @default none */
    mobile?: BorderRadius;
    /** @default none */
    desktop?: BorderRadius;
  };
  banners: Banner[];
}

const RADIUS_MOBILE = {
  "none": "rounded-none",
  "sm": "rounded-sm",
  "md": "rounded-md",
  "lg": "rounded-lg",
  "xl": "rounded-xl",
  "2xl": "rounded-2xl",
  "3xl": "rounded-3xl",
  "full": "rounded-full",
};

const RADIUS_DESKTOP = {
  "none": "sm:rounded-none",
  "sm": "sm:rounded-sm",
  "md": "sm:rounded-md",
  "lg": "sm:rounded-lg",
  "xl": "sm:rounded-xl",
  "2xl": "sm:rounded-2xl",
  "3xl": "sm:rounded-3xl",
  "full": "sm:rounded-full",
};

export default function BannerTriplo({
  title,
  borderRadius,
  banners = [],
}: Props) {
  return (
    <section class={`2xl:container w-full mx-auto px-4 mt-7`}>
      <HeaderSections
        title={title}
        alignment={"left"}
      />
      <div
        class={`flex flex-col md:flex-row xl:justify-center gap-4 md:gap-6 pt-5 mb-12 `}
      >
        <a
          href={banners[0]?.href}
          class={`overflow-hidden relative ${
            RADIUS_MOBILE[borderRadius.mobile ?? "none"]
          } ${RADIUS_DESKTOP[borderRadius.desktop ?? "none"]} `}
        >
          <Picture>
            <Source
              media="(max-width: 767px)"
              src={banners[0]?.srcMobile}
              width={76}
              height={55}
            />
            <Source
              media="(min-width: 768px)"
              src={banners[0]?.srcDesktop
                ? banners[0]?.srcDesktop
                : banners[0]?.srcMobile}
              width={137}
              height={99}
            />
            <img
              class="w-full object-cover h-[550px]"
              sizes="(max-width: 640px) 100vw, 30vw"
              src={banners[0]?.srcMobile}
              alt={banners[0]?.alt}
              decoding="async"
              loading="lazy"
            />
          </Picture>
          <div class="absolute top-0 left-0 w-full h-full hover:bg-gray-600 hover:opacity-30" />
          {banners[0]?.text || banners[0]?.cta
            ? (
              <div
                class={`pt-4 text-black flex flex-col p-2 gap-2 tracking-widest`}
              >
                {banners[0]?.text && (
                  <h2 class="text-3xl">{banners[0]?.text}</h2>
                )}
                {banners[0]?.cta && (
                  <p class="text-xl text-black tracking-widest">
                    {banners[0]?.cta}
                  </p>
                )}
              </div>
            )
            : ""}
        </a>
        <div className="flex flex-col">
          {banners.map((
            { href, srcMobile, srcDesktop, alt, text, cta },
            index,
          ) =>
            index > 0
              ? (
                <a
                  href={href}
                  class={`overflow-hidden relative ${
                    RADIUS_MOBILE[borderRadius.mobile ?? "none"]
                  } ${RADIUS_DESKTOP[borderRadius.desktop ?? "none"]} `}
                >
                  <Picture>
                    <Source
                      media="(max-width: 767px)"
                      src={srcMobile}
                      width={80.1}
                      height={40.5}
                    />
                    <Source
                      media="(min-width: 768px)"
                      src={srcDesktop ? srcDesktop : srcMobile}
                      width={133.5}
                      height={67.5}
                    />
                    <img
                      class="w-full object-cover h-[227px]"
                      sizes="(max-width: 640px) 100vw, 30vw"
                      src={srcMobile}
                      alt={alt}
                      decoding="async"
                      loading="lazy"
                    />
                  </Picture>
                  <div class="absolute top-0 left-0 w-full h-full hover:bg-gray-600 hover:opacity-30" />
                  {text || cta
                    ? (
                      <div
                        class={`pt-4 text-black flex flex-col p-2 gap-2 tracking-widest`}
                      >
                        {text && <h2 class="text-3xl">{text}</h2>}
                        {cta && (
                          <p class="text-xl text-black tracking-widest">
                            {cta}
                          </p>
                        )}
                      </div>
                    )
                    : ""}
                </a>
              )
              : ""
          )}
        </div>
      </div>
    </section>
  );
}
