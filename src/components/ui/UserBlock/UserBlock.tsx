"use client"

import React, { useCallback } from "react"
import { toast } from "react-toastify"

import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"

import { ROUTES } from "@/constants/routes"
import { useAuthStore } from "@/hooks/globalStores"
import classNames from "classnames"
import { ChevronDown, ChevronUp } from "lucide-react"
import { observer } from "mobx-react-lite"

import s from "./UserBlock.module.scss"

interface Props {
  className?: string
}

const UserBlock: React.FC<Props> = observer(({ className }) => {
  const authStore = useAuthStore()
  const [menuOpen, setMenuOpen] = React.useState(false)
  const menuRef = React.useRef<HTMLDivElement | null>(null)
  const router = useRouter()

  const toggleMenu = React.useCallback(() => setMenuOpen((prev) => !prev), [])
  const closeMenu = React.useCallback(() => setMenuOpen(false), [])

  React.useEffect(() => {
    if (!menuOpen) return

    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        closeMenu()
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [menuOpen, closeMenu])

  const handleLogout = useCallback(() => {
    authStore.logout()
    toast.info("Logged out successfully")
    router.push(ROUTES.login.create())
    closeMenu()
  }, [authStore, closeMenu, router])

  console.log(authStore.isAuthenticated)

  return (
    <>
      {authStore.isAuthenticated ? (
        <div className={classNames(className, s.userBlock)} ref={menuRef}>
          <div className={s.userBlock__icons} onClick={toggleMenu}>
            <Image
              src="/defaultAvatar.jpg"
              width={40}
              height={40}
              alt="avatar"
              className={s.userBlock__avatar}
            />
            {menuOpen ? <ChevronUp /> : <ChevronDown />}
          </div>

          <div
            className={classNames(s.userBlock__menu, {
              [s.userBlock__menu_open]: menuOpen,
            })}
          >
            <Link
              href={ROUTES.profile.create()}
              className={s.userBlock__menuItem}
              onClick={closeMenu}
            >
              Profile
            </Link>
            <button
              onClick={handleLogout}
              className={classNames(
                s.userBlock__menuItem,
                s.userBlock__menuItem_red
              )}
            >
              Logout
            </button>
          </div>
        </div>
      ) : (
        <div className={classNames(className, s.userBlock)}>
          <Link href={ROUTES.login.create()} className={s.userBlock__btnLogin}>
            Login
          </Link>
        </div>
      )}
    </>
  )
})

export default UserBlock
