"use client";

import React, { useState } from "react";
import styles from "./links.module.css";
import NavLink from "./navLink/navLink";
import Image from "next/image";
import { signOut } from "next-auth/react";
import { Session } from "next-auth";

interface LinksProps {
  session: Session | null;
}

const links = [
  {
    title: "Home",
    path: "/",
  },
  {
    title: "About",
    path: "/about",
  },
  {
    title: "Contact",
    path: "/contact",
  },
  {
    title: "Blog",
    path: "/blog",
  },
];

const Links: React.FC<LinksProps> = ({ session }) => {
  const [open, setOpen] = useState(false);

  const handleLogOut = () => {
    signOut({ callbackUrl: `${window.location.origin}/login` });
  };

  return (
    <div className={styles.container}>
      <div className={styles.links}>
        {links.map((link) => (
          <NavLink item={link} key={link.title} />
        ))}
        {session?.user ? (
          <>
            <button className={styles.logout} onClick={handleLogOut}>
              Log out
            </button>
          </>
        ) : (
          <NavLink item={{ title: "Login", path: "/login" }} key="Login" />
        )}
      </div>
      <Image
        src="/menu.png"
        alt="Menu"
        width={30}
        height={30}
        className={styles.menuButton}
        onClick={() => setOpen((prev) => !prev)}
      />
      {open && (
        <div className={styles.containerLinks}>
          <div className={styles.mobileLinks}>
          {links.map((link) => (
            <NavLink item={link} key={link.title} />
          ))}
          {session?.user ? (
            <>
              <button className={styles.logout} onClick={handleLogOut}>
                Log out
              </button>
            </>
          ) : (
            <NavLink item={{ title: "Login", path: "/login" }} key="Login" />
          )}
        </div>
        </div>
      )}
    </div>
  );
};

export default Links;
