"use client";

import Link from 'next/link';
import styles from './navLink.module.css'
import React from 'react';
import { usePathname } from 'next/navigation';

type LinkItem = {
    title: string;
    path: string;
};

interface NavLinkProps {
    item: LinkItem;
}

const NavLink: React.FC<NavLinkProps> = ({ item }) => {
    const pathName = usePathname()

    return (
        <Link
            href={item.path}
            className={`${styles.container} ${pathName === item.path && styles.active
                }`}
        >
            {item.title}
        </Link>
    );
};

export default NavLink;