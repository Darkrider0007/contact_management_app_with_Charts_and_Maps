"use client"
import Link from 'next/link';
import React from 'react'
import { usePathname, useRouter } from "next/navigation";
import Image from 'next/image';

const sidebarLinks = [
    {imgURL: "/assets/contacts.svg",  route: "/",  label: "Contact", },
    {imgURL: "/assets/maps.svg",  route: "/charts", label: "Charts and Maps",},
  ];

const LeftSidebar = () => {
    const pathname = usePathname();
  return (
    <section className='custom-scrollbar leftsidebar'>
        <div className='flex w-full flex-1 flex-col gap-6 px-6'>
        {sidebarLinks.map((link) => {
            const isActive =
            (pathname.includes(link.route) && link.route.length > 1) ||
            pathname === link.route;

            // if (link.route === "/profile") link.route = `${link.route}/${userId}`;

            return (
                <Link
                    href={link.route}
                    key={link.label}
                    className={`leftsidebar_link ${isActive && "bg-primary-500 "}`}
                > 
                    <Image
                        src={link.imgURL}
                        alt={link.label}
                        width={32}
                        height={32}
                    />
                    <p className='text-light-1 max-lg:hidden'>{link.label}</p>
                </Link>        
            );
        })}
    </div>
    </section>

  )
}

export default LeftSidebar
