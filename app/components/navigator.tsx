import * as React from "react";
import { NavigationMenu } from "@base-ui-components/react/navigation-menu";
import styles from "~/css/input.module.css";
import { NavLink } from "react-router";
import ActionButtons from "./actionButtons";

// Generic types
type NavLink = {
  href: string;
  title: string;

  
  description?: string;
};

type NavMenuItem = {
  label: string;
  links?: NavLink[]; // dropdown items
  href?: string; // direct link (no dropdown)
};

interface Props {
  items: NavMenuItem[];
}

// === Reusable Component ===
export default function NavigationMenuBase({ items }: Props) {
  return (
    <NavigationMenu.Root className={`${styles.Root} w-full flex gap-5 justify-between fixed top-0 z-[99] shadow-md items-center `}>
      <div className="flex items-center gap-10">
        <div className='md:w-[60px] w-[40px]'>
          <NavLink
            className="rounded-full px-5 py-2 bg-amber-100"
            to="/">
            {/* <img src='/logo.png' alt='homsleepsalon logo' /> */}
            
          </NavLink>
        </div>
        <NavigationMenu.List className={styles.List}>
          {items.map((item) => (
            <NavigationMenu.Item key={item.label}>
              {item.links ? (
                <>
                  <NavigationMenu.Trigger className={styles.Trigger}>
                    {item.label}
                    <NavigationMenu.Icon className={styles.Icon}>
                      <ChevronDownIcon />
                    </NavigationMenu.Icon>
                  </NavigationMenu.Trigger>
                  <NavigationMenu.Content className={styles.Content}>
                    <ul
                      className={
                        item.links.length > 3
                          ? styles.GridLinkList
                          : styles.FlexLinkList
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
                </>
              ) : (
                <Link className={styles.Trigger} href={item.href!}>
                  {item.label}
                </Link>
              )}
            </NavigationMenu.Item>
          ))}
        </NavigationMenu.List>


        {/* action button */}

      </div>
      <ActionButtons />

      <NavigationMenu.Portal>
        <NavigationMenu.Positioner
          className={styles.Positioner}
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
  )
}

// === Link Wrapper (works with Next.js or Remix) ===
function Link(props: NavigationMenu.Link.Props) {
  return (
    <NavigationMenu.Link
      render={
        // Replace with <NextLink> or <Link> from Remix if needed
        <a />
      }
      {...props}
    />
  );
}

// === Icons ===
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
      <path
        d="M8.99542 1.85876C9.75604 1.17425 10.9106 1.17422 11.6713 1.85878L16.5281 6.22989C17.0789 6.72568 17.7938 7.00001 18.5349 7.00001L15.89 7L11.0023 2.60207C10.622 2.2598 10.0447 2.2598 9.66436 2.60207L4.77734 7L2.13171 7.00001C2.87284 7.00001 3.58774 6.72568 4.13861 6.22989L8.99542 1.85876Z"
        className={styles.ArrowOuterStroke}
      />
    </svg>
  );
}
