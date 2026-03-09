import type { Metadata } from "next"
import { Roboto_Flex } from "next/font/google"

import HeadProvider from "@/providers/HeadProvider"

import Layout from "@/components/layout/Layout"

import "./globals.scss"

const robotoFlex = Roboto_Flex({
  subsets: ["latin"],
  variable: "--font-roboto-flex",
})

export const metadata: Metadata = {
  title: {
    template: "%s | Lalasia",
    default: "Lalasia",
  },
  description: "Lalasia project kts",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning data-scroll-behavior="smooth">
      <head>
        <meta name="apple-mobile-web-app-title" content="Lalasia" />
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var theme=localStorage.getItem("app-theme")||"auto";var prefersDark=window.matchMedia("(prefers-color-scheme: dark)").matches;var resolved=theme==="auto"?(prefersDark?"dark":"light"):theme;document.documentElement.classList.add(resolved+"-theme");document.documentElement.style.colorScheme=resolved;}catch(e){}})();`,
          }}
        />
      </head>
      <body className={robotoFlex.variable}>
        <HeadProvider>
          <div id="root">
            <Layout>{children}</Layout>
          </div>
        </HeadProvider>
      </body>
    </html>
  )
}
