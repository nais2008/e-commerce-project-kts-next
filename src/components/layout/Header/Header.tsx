"use client"

import React from "react"

import { useAuthStore } from "@/hooks/globalStores"
import { observer } from "mobx-react-lite"

import CartBlock from "@/components/ui/CartBlock"
import Logo from "@/components/ui/Logo"
import Menu from "@/components/ui/Menu"
import ThemeSwitcher from "@/components/ui/ThemeSwitcher"
import UserBlock from "@/components/ui/UserBlock"

import s from "./Header.module.scss"
import { HEADER_ITEMS } from "./header.data"

const Header: React.FC = observer(() => {
  const authStore = useAuthStore()

  return (
    <header className={s.header}>
      <div className={s.header__container}>
        <Logo withTitle className={s.header__logo} />
        <Menu className={s.header__navigation} items={HEADER_ITEMS} />
        <div className={s.header__right}>
          <ThemeSwitcher />
          {authStore.isAuthenticated && <CartBlock />}
          <UserBlock />
        </div>
      </div>
    </header>
  )
})

export default React.memo(Header)
