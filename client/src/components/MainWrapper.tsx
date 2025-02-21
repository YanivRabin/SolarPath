"use client";

import { usePathname } from "next/navigation";
import Navbar from "./Navbar";
import BackOfficeNavbar from "./BackOfficeNavbar";

export default function MainWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const paddingClass = pathname.startsWith("/back-office") ? "pt-0" : "pt-20";

  if (pathname.startsWith("/back-office")) {
    return (
      <>
        <BackOfficeNavbar />
        <main className={paddingClass}>{children}</main>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main className={paddingClass}>{children}</main>
    </>
  );
}
