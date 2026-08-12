import type { Metadata } from "next";
import { Inter, Outfit, Cormorant_Garamond, Syne } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" });
const syne = Syne({ subsets: ["latin"], variable: "--font-syne" });
const cormorant = Cormorant_Garamond({ 
  subsets: ["latin"], 
  variable: "--font-serif",
  weight: ['300', '400', '500', '600', '700'],
  style: ['normal', 'italic']
});

export const metadata: Metadata = {
  title: "Amanita Sale | Headless WordPress",
  description: "High-performance ecommerce built with Next.js 15 and WordPress.",
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

import NavbarApp from "@/components/Navigation/NavbarApp";
import CartDrawer from "@/components/Cart/CartDrawer";
import Footer from "@/components/Footer/Footer.component";
import { Providers } from "./Providers";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${outfit.variable} ${cormorant.variable} ${syne.variable}`} suppressHydrationWarning data-scroll-behavior="smooth">
      <body className="antialiased" suppressHydrationWarning>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
