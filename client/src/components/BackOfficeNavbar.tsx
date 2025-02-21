"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navigation = [
  { name: "Home", href: "/" },
  { name: "Dashboard", href: "/back-office/dashboard" },
  {
    name: "Products",
    children: [
      { name: "All Products", href: "/back-office/products" },
      { name: "Add New Product", href: "/back-office/products/add-new-product" },
    ],
  },
  {
    name: "Projects",
    children: [
      { name: "All Projects", href: "/back-office/projects" },
      { name: "Add New Project", href: "/back-office/projects/add-new-project" },
    ],
  },
  {
    name: "Contacts",
    children: [
      { name: "All Contacts", href: "/back-office/contacts" },
      { name: "Add New Contact", href: "/back-office/contacts/add-new-contact" },
    ],
  },
];

export default function BackOfficeNavbar() {
  const pathname = usePathname();

  return (
    <aside className="fixed top-0 bottom-0 left-0 w-64 bg-gray-800 text-white overflow-y-auto">
      <nav className="mt-4">
        <ul>
          {navigation.map((item, index) => (
            <li key={index}>
              {/* If no sub-menu, render a single link */}
              {!item.children ? (
                <Link href={item.href}>
                  <span
                    className={`block px-4 py-2 cursor-pointer hover:bg-gray-700 ${
                      pathname === item.href ? "bg-gray-700" : ""
                    }`}
                  >
                    {item.name}
                  </span>
                </Link>
              ) : (
                <>
                  <div className="px-4 py-2 font-semibold">{item.name}</div>
                  <ul>
                    {item.children.map((subItem, subIndex) => (
                      <li key={subIndex}>
                        <Link href={subItem.href}>
                          <span
                            className={`block px-6 py-2 cursor-pointer hover:bg-gray-700 ${
                              pathname === subItem.href ? "bg-gray-700" : ""
                            }`}
                          >
                            {subItem.name}
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </>
              )}
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}
