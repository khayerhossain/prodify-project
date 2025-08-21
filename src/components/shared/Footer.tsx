import React from "react";
import Link from "next/link";
import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaCcVisa,
  FaCcMastercard,
  FaCcPaypal,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 pt-12 pb-6">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-20">
        {/* Brand Info */}
        <div>
          <h2 className="text-2xl font-bold text-white mb-3">Prodify</h2>
          <p className="text-gray-400">
            Your trusted marketplace for quality products.
            Shop smarter, live better.
          </p>
          <div className="flex gap-4 mt-4">
            <Link href="#"><FaFacebook className="text-xl hover:text-white" /></Link>
            <Link href="#"><FaTwitter className="text-xl hover:text-white" /></Link>
            <Link href="#"><FaInstagram className="text-xl hover:text-white" /></Link>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">Quick Links</h3>
          <ul className="space-y-2">
            <li><Link href="/" className="hover:text-white">Home</Link></li>
            <li><Link href="/products" className="hover:text-white">Products</Link></li>
            <li><Link href="/about" className="hover:text-white">About</Link></li>
            <li><Link href="/contact" className="hover:text-white">Contact</Link></li>
          </ul>
        </div>

        {/* Support */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">Support</h3>
          <ul className="space-y-2">
            <li><Link href="/faq" className="hover:text-white">FAQ</Link></li>
            <li><Link href="/help" className="hover:text-white">Help Center</Link></li>
            <li><Link href="/returns" className="hover:text-white">Returns</Link></li>
          </ul>
        </div>

        {/* Legal + Payments */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">Legal</h3>
          <ul className="space-y-2">
            <li><Link href="/terms" className="hover:text-white">Terms of Service</Link></li>
            <li><Link href="/privacy" className="hover:text-white">Privacy Policy</Link></li>
          </ul>
          <div className="flex gap-4 mt-4 text-2xl">
            <FaCcVisa />
            <FaCcMastercard />
            <FaCcPaypal />
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-700 mt-10 pt-4 text-center text-gray-400 text-sm">
        © {new Date().getFullYear()} Prodify. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
