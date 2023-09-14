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
    content?: BlogItem[];
    vertical?: boolean;
  },
) {
  console.log(content);
  return (
    <>
      {content && content.length > 0 && (
        <div class="flex flex-col">
          {content.map((blog) => (
            <div class="flex flex-col gap-4">
              {blog.title && <h2 class="font-bold">{blog.title}</h2>}
              {blog.links && blog.links?.map(({ label, href }) => {
                return (
                  <li>
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${label} Logo`}
                      class="flex gap-2 items-center"
                    >
                      <span class="block p-1 border rounded-full">
                        {label}
                      </span>
                      {vertical && (
                        <div class="text-sm hidden lg:block">{label}</div>
                      )}
                    </a>
                  </li>
                );
              })}
              <ul
                class={`flex gap-4 ${
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
                        <span class="block p-1 border rounded-full">
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
