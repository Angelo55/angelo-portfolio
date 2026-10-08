import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const sans = Geist({ variable: "--font-sans", subsets: ["latin"] });
const mono = Geist_Mono({ variable: "--font-mono", subsets: ["latin"] });
const productionUrl = "https://angelolacsao-portfolio.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(productionUrl),
  title: "Angelo Lacsao | BSIT Student & Full-stack Developer",
  description: "Portfolio of Angelo Lacsao, a fourth-year BSIT student building practical full-stack web experiences.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Angelo Lacsao | Full-stack Developer",
    description: "A portfolio of practical digital products, technical skills, credentials, and experience.",
    url: "/", siteName: "Angelo Lacsao Portfolio", type: "website",
  },
  robots: { index: true, follow: true },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <html lang="en"><body className={sans.variable + " " + mono.variable}>{children}</body></html>;
}
