"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/", label: "About" },
  { href: "/resume", label: "CV" },
  { href: "/projects", label: "Projects" },
  { href: "/interests", label: "Interests" },
];

export default function Nav() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 bg-beige-50/90 backdrop-blur-sm border-b border-beige-300">
      <div className="max-w-4xl mx-auto px-6 py-5 flex items-center justify-between">
        <Link
          href="/"
          className="font-serif text-base tracking-[0.2em] text-[#2c2c2c] hover:text-[#8b7355] transition-colors"
        >
          JOOYOUNG KIM
        </Link>
        <nav className="flex gap-8">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`font-sans text-xs tracking-widest uppercase transition-colors pb-0.5 ${
                pathname === link.href
                  ? "text-[#2c2c2c] border-b border-[#2c2c2c]"
                  : "text-[#8b7355] hover:text-[#2c2c2c]"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
