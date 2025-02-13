import Link from "next/link";
import Image from "next/image";
import logo from "../../public/logo/solarpath-logo.png";

export default function Navbar() {
  return (
    <nav className="p-4 shadow-md fixed top-0 left-0 w-full bg-white z-50">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link href="/">
          <Image src={logo} alt="SolarPath Logo" width={180} height={50} priority />
        </Link>

        {/* Navigation Links */}
        <div className="space-x-8 text-teal-900 text-lg font-medium">
          <Link href="/products" className="hover:text-amber-400 transition">Products</Link>
          <Link href="/services" className="hover:text-amber-400 transition">Services</Link>
          <Link href="/about" className="hover:text-amber-400 transition">About</Link>
          <Link href="/contact" className="hover:text-amber-400 transition">Contact</Link>
        </div>
      </div>
    </nav>
  );
}
