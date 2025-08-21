"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const { data: session } = useSession();
  const [mobileOpen, setMobileOpen] = useState(false);

  const toggleMobile = () => setMobileOpen(!mobileOpen);

  const handleLogout = async () => {
    await signOut({ redirect: false });
    router.push("/login");
  };

  const links = [
    { name: "Home", href: "/" },
    { name: "Products", href: "/products" },
    { name: "Dashboard", href: "/dashboard" },
  ];

  const isActive = (href: string) => pathname === href;

  return (
    <section className="bg-gray-900">
      <nav className="mx-auto max-w-6xl px-6 text-white py-4 flex justify-between items-center relative">
      {/* Logo */}
      <Link href="/" className="text-xl font-bold hover:text-teal-400">
        Prodify
      </Link>

      {/* Desktop Menu */}
      <ul className="hidden lg:flex space-x-6">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className={`hover:text-teal-400 ${isActive(link.href) ? "text-teal-400 font-semibold" : ""
                }`}
            >
              {link.name}
            </Link>
          </li>
        ))}
      </ul>

      {/* Auth Buttons */}
      <div className="hidden lg:flex items-center space-x-4">
        {session ? (
          <button
            onClick={handleLogout}
            className="btn btn-outline btn-error"
          >
            Logout
          </button>
        ) : (
          <Link href="/login" className="btn btn-outline btn-accent">
            Login
          </Link>
        )}
      </div>

      {/* Mobile Menu Toggle */}
      <button
        onClick={toggleMobile}
        className="lg:hidden p-2 rounded-md hover:bg-gray-700 focus:outline-none"
      >
        {mobileOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.ul
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="absolute top-full left-0 w-full bg-gray-900 shadow-lg flex flex-col text-white lg:hidden"
          >
            {links.map((link) => (
              <li key={link.href} className="border-b border-gray-700">
                <Link
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={`block px-4 py-3 hover:bg-gray-800 ${isActive(link.href) ? "bg-gray-800 font-semibold" : ""
                    }`}
                >
                  {link.name}
                </Link>
              </li>
            ))}

            <li className="px-4 py-3 border-b border-gray-700">
              {session ? (
                <button
                  onClick={handleLogout}
                  className="w-full btn btn-error btn-sm"
                >
                  Logout
                </button>
              ) : (
                <Link
                  href="/login"
                  onClick={() => setMobileOpen(false)}
                  className="w-full btn btn-accent btn-sm"
                >
                  Login
                </Link>
              )}
            </li>
          </motion.ul>
        )}
      </AnimatePresence>
    </nav>
    </section>
  );
};

export default Navbar;
