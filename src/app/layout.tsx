import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
const sans=Geist({variable:"--font-sans",subsets:["latin"]});
const mono=Geist_Mono({variable:"--font-mono",subsets:["latin"]});
export const metadata:Metadata={title:"Angelo Lacsao  BSIT Student & Full-stack Developer",description:"Portfolio of Angelo Lacsao, a fourth-year BSIT student building practical full-stack web experiences."};
export default function Layout({children}:{children:React.ReactNode}){return <html lang="en"><body className={sans.variable+" "+mono.variable}>{children}</body></html>}
