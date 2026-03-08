import React from "react"
import "react-toastify/dist/ReactToastify.css"

import Toastify from "@/components/utils/Toastify"

import Footer from "./Footer"
import Header from "./Header"

type LayoutProps = {
  children: React.ReactNode
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <Header />
      {children}
      <Toastify />
      <Footer />
    </>
  )
}

export default Layout
