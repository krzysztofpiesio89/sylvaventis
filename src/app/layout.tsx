import type { Metadata } from "next";
import { Playfair_Display, Source_Sans_3, Outfit } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({ 
  subsets: ["latin"], 
  variable: "--font-serif",
  weight: ['400', '500', '600', '700'],
  style: ['normal', 'italic']
});
const sourceSans = Source_Sans_3({ subsets: ["latin"], variable: "--font-sans" });
const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" });

export const metadata: Metadata = {
  title: "Sylvaventis | Räucherwerk & Kräuterpädagogik",
  description: "Schätze der Natur aus Österreich & Weltweit. Finde zurück zu ganzheitlichem Wohlgefühl mit vergessenen Pflanzengeistern und wohltuendem Räucherwerk.",
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
    <html lang="de" className={`${playfair.variable} ${sourceSans.variable} ${outfit.variable}`} suppressHydrationWarning data-scroll-behavior="smooth">
      <body className="antialiased" suppressHydrationWarning>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
