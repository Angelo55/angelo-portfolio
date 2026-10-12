import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ChatbotWidget } from "@/components/chatbot-widget";

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
  twitter: { card: "summary", title: "Angelo Lacsao | Full-stack Developer", description: "A portfolio of practical digital products, technical skills, credentials, and experience." },
  icons: { icon: "/icon.svg" },
  robots: { index: true, follow: true },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  const profileJsonLd = { "@context": "https://schema.org", "@type": "Person", name: "Angelo Lacsao", url: productionUrl, jobTitle: "Full-stack Developer", email: "mailto:angelopamalacsao@gmail.com", sameAs: ["https://github.com/Angelo55", "https://www.linkedin.com/in/angelo-pama-lacsao-0aa681353/?isSelfProfile=true"] };
  return <html lang="en"><body className={sans.variable + " " + mono.variable}>{children}<ChatbotWidget /><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(profileJsonLd) }} /></body></html>;
}
