import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"

import HeadProvider from "@/providers/HeadProvider"

import Layout from "@/components/layout/Layout"

import "./globals.scss"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "Lalasia",
  description:
    "Lalasia is a modern e-commerce platform built with Next.js, designed to provide a seamless shopping experience. Explore our wide range of products and enjoy fast, secure transactions.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var theme=localStorage.getItem("app-theme")||"auto";var prefersDark=window.matchMedia("(prefers-color-scheme: dark)").matches;var resolved=theme==="auto"?(prefersDark?"dark":"light"):theme;document.documentElement.classList.add(resolved+"-theme");document.documentElement.style.colorScheme=resolved;}catch(e){}})();`,
          }}
        />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <HeadProvider>
          <div id="root">
            <Layout>{children}</Layout>
          </div>
        </HeadProvider>
      </body>
    </html>
  )
}
