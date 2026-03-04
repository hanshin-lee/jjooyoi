import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";
import Nav from "@/components/Nav";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-cormorant",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Jooyoung Kim",
  description: "Art historian and gallery professional based in Seoul.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${cormorant.variable} ${inter.variable} bg-beige-50 text-[#2c2c2c] antialiased`}
      >
        <Nav />
        <main className="min-h-screen">{children}</main>
        <footer className="border-t border-beige-300 py-8 mt-24">
          <div className="max-w-4xl mx-auto px-6 flex justify-between items-center">
            <span className="font-sans text-xs text-[#aaa098] tracking-widest uppercase">
              © 2025 Jooyoung Kim
            </span>
            <a
              href="mailto:jooyoungkim19@gmail.com"
              className="font-sans text-xs text-[#8b7355] hover:text-[#2c2c2c] transition-colors"
            >
              jooyoungkim19@gmail.com
            </a>
          </div>
        </footer>
      </body>
    </html>
  );
}
