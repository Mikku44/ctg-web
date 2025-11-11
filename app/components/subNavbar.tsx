import * as React from "react";
import { NavigationMenu } from "@base-ui-components/react/navigation-menu";
import styles from "~/css/navbar.module.css";
import { ChevronLeft, ChevronRight } from "lucide-react";

// --- Types ---
interface NavLink {
  href: string;
  title: string;
  description?: string;
}

interface NavItem {
  label: string;
  links?: NavLink[];
  href?: string;
  layout?: "grid" | "flex";
}

interface SubNavbarProps {
  menuItems: NavItem[];
}

// --- Component ---
export default function SubNavbar({ menuItems }: SubNavbarProps) {
  const scrollRef = React.useRef<HTMLUListElement>(null);
  const [canScrollLeft, setCanScrollLeft] = React.useState(false);
  const [canScrollRight, setCanScrollRight] = React.useState(false);

  // --- Scroll logic ---
  const checkScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 0);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 10);
  };

  const scroll = (dir: "left" | "right") => {
    const el = scrollRef.current;
    if (!el) return;
    const scrollAmount = el.clientWidth * 0.6;
    el.scrollBy({
      left: dir === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  React.useEffect(() => {
    checkScroll();
    const el = scrollRef.current;
    if (!el) return;
    el.addEventListener("scroll", checkScroll);
    window.addEventListener("resize", checkScroll);
    return () => {
      el.removeEventListener("scroll", checkScroll);
      window.removeEventListener("resize", checkScroll);
    };
  }, []);

  return (
    <div className="relative w-full overflow-hidden">
      {/* Left scroll button */}
      {canScrollLeft && (
        <button
          onClick={() => scroll("left")}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 
          bg-white/90 hover:bg-white shadow rounded-full p-2"
          aria-label="Scroll left"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
      )}

      {/* Navigation Menu */}
      <NavigationMenu.Root>
        <NavigationMenu.List
          ref={scrollRef}
          className={`${styles.List} hidden-scroll flex overflow-x-auto no-scrollbar space-x-4 px-10`}
        >
          {menuItems.map((item) =>
            item.links ? (
              <NavigationMenu.Item
                key={item.label}
                className="min-w-[120px] flex-shrink-0"
              >
                <NavigationMenu.Trigger className={styles.Trigger}>
                  {item.label}
                  <NavigationMenu.Icon className={styles.Icon}>
                    <ChevronDownIcon />
                  </NavigationMenu.Icon>
                </NavigationMenu.Trigger>

                <NavigationMenu.Content className={styles.Content}>
                  <ul
                    className={
                      item.layout === "flex"
                        ? styles.FlexLinkList
                        : styles.GridLinkList
                    }
                  >
                    {item.links.map((link) => (
                      <li key={link.href}>
                        <Link className={styles.LinkCard} href={link.href}>
                          <h3 className={styles.LinkTitle}>{link.title}</h3>
                          {link.description && (
                            <p className={styles.LinkDescription}>
                              {link.description}
                            </p>
                          )}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </NavigationMenu.Content>
              </NavigationMenu.Item>
            ) : (
              <NavigationMenu.Item
                key={item.label}
                className="min-w-[120px] flex-shrink-0"
              >
                <Link className={styles.Trigger} href={item.href || "#"}>
                  {item.label}
                </Link>
              </NavigationMenu.Item>
            )
          )}
        </NavigationMenu.List>

        {/* Popup for submenu */}
        <NavigationMenu.Portal>
          <NavigationMenu.Positioner
            className="z-[99]"
            sideOffset={10}
            collisionPadding={{ top: 5, bottom: 5, left: 20, right: 20 }}
            collisionAvoidance={{ side: "none" }}
          >
            <NavigationMenu.Popup className={styles.Popup}>
              <NavigationMenu.Arrow className={styles.Arrow}>
                <ArrowSvg />
              </NavigationMenu.Arrow>
              <NavigationMenu.Viewport className={styles.Viewport} />
            </NavigationMenu.Popup>
          </NavigationMenu.Positioner>
        </NavigationMenu.Portal>
      </NavigationMenu.Root>

      {/* Right scroll button */}
      {canScrollRight && (
        <button
          onClick={() => scroll("right")}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 
          bg-white/90 hover:bg-white shadow rounded-full p-2"
          aria-label="Scroll right"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      )}
    </div>
  );
}

// --- Helper Components ---
function Link(props: NavigationMenu.Link.Props) {
  return <NavigationMenu.Link render={<a />} {...props} />;
}

function ChevronDownIcon(props: React.ComponentProps<"svg">) {
  return (
    <svg width="10" height="10" viewBox="0 0 10 10" fill="none" {...props}>
      <path d="M1 3.5L5 7.5L9 3.5" stroke="currentcolor" strokeWidth="1.5" />
    </svg>
  );
}

function ArrowSvg(props: React.ComponentProps<"svg">) {
  return (
    <svg width="20" height="10" viewBox="0 0 20 10" fill="none" {...props}>
      <path
        d="M9.66437 2.60207L4.80758 6.97318C4.07308 7.63423 3.11989 8 2.13172 8H0V10H20V8H18.5349C17.5468 8 16.5936 7.63423 15.8591 6.97318L11.0023 2.60207C10.622 2.2598 10.0447 2.25979 9.66437 2.60207Z"
        className={styles.ArrowFill}
      />
    </svg>
  );
}
