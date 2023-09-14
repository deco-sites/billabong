import Icon, { AvailableIcons } from "$store/components/ui/Icon.tsx";

export interface SocialItem {
  label:
    | "Discord"
    | "Facebook"
    | "Instagram"
    | "Linkedin"
    | "Tiktok"
    | "Youtube"
    | "Twitter";
  link: string;
}

export interface BlogItem {
  title?: string;
  links?: { label: string; href: string }[];
  items?: SocialItem[];
}

export default function BlogSocial(
  { content, vertical = false }: {
    content?: {
      /** @format html */
      article?: string;

      blogLinks?: BlogItem[];
    };
    vertical?: boolean;
  },
) {
  return (
    <>
      {content && (
        <div class="flex flex-col">
          {content?.article && (
            <div
              class="font-bold text-[#202020] text-sm mb-2"
              dangerouslySetInnerHTML={{ __html: content?.article }}
            />
          )}
          {content?.blogLinks &&
            content.blogLinks?.map((blog) => (
              <div class="flex flex-col gap-2">
                {blog.title && (
                  <h2 class="font-bold text-[#202020] text-sm mb-2">
                    {blog.title}
                  </h2>
                )}
                {blog.links && blog.links?.map(({ label, href }) => {
                  return (
                    <div>
                      <a
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${label} Logo`}
                        class="flex gap-2 items-center"
                      >
                        <span class="block text-sm text-[#202020] font-medium">
                          {label}
                        </span>
                        {vertical && (
                          <div class="text-sm hidden lg:block text-[#202020] font-medium">
                            {label}
                          </div>
                        )}
                      </a>
                    </div>
                  );
                })}
                <ul
                  class={`flex gap-4 mb-8 ${
                    vertical
                      ? "lg:flex-col lg:items-start"
                      : "flex-wrap items-center"
                  }`}
                >
                  {blog.items && blog.items?.map((item) => {
                    return (
                      <li>
                        <a
                          href={item.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`${item.label} Logo`}
                          class="flex gap-2 items-center"
                        >
                          <span class="block">
                            <Icon size={24} id={item.label} />
                          </span>
                          {vertical && (
                            <div class="text-sm hidden lg:block">
                              {item.label}
                            </div>
                          )}
                        </a>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
        </div>
      )}
    </>
  );
}
