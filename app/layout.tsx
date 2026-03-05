import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";
import Nav from "@/components/Nav";
import { Providers } from "@/components/Providers";
import { AdminBar } from "@/components/AdminBar";

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
        <Providers>
          <Nav />
          <main className="min-h-screen">{children}</main>
          <footer className="border-t border-beige-300 py-8 mt-24">
            <div className="max-w-4xl mx-auto px-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <span className="font-sans text-xs text-[#aaa098] tracking-widest uppercase">
                © 2025 Jooyoung Kim
              </span>
              <div className="flex flex-wrap gap-6 items-center">
                <a
                  href="mailto:jooyoungkim19@gmail.com"
                  className="font-sans text-xs text-[#8b7355] hover:text-[#2c2c2c] transition-colors"
                >
                  Email
                </a>
                <a
                  href="https://www.instagram.com/jjooyoi_/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-sans text-xs text-[#8b7355] hover:text-[#2c2c2c] transition-colors"
                >
                  Instagram
                </a>
                <a
                  href="https://www.instagram.com/by_jooyoi/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-sans text-xs text-[#8b7355] hover:text-[#2c2c2c] transition-colors"
                >
                  Instagram (Art)
                </a>
                <a
                  href="https://www.linkedin.com/in/jooyoung-kim19/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-sans text-xs text-[#8b7355] hover:text-[#2c2c2c] transition-colors"
                >
                  LinkedIn
                </a>
                <AdminBar />
              </div>
            </div>
          </footer>
        </Providers>
      </body>
    </html>
  );
}
