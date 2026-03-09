"use client"

import React, { useCallback, useEffect, useRef, useState } from "react"

import Link from "next/link"
import { usePathname } from "next/navigation"

import classNames from "classnames"
import { MenuIcon } from "lucide-react"
import { match } from "path-to-regexp"

import s from "./Menu.module.scss"

type MenuItem = {
  name: string
  link: () => string
}

type MenuProps = {
  items: MenuItem[]
  className?: string
  icon?: null | React.ReactNode
}

const Menu: React.FC<MenuProps> = ({ items, className, icon = null }) => {
  const pathname = usePathname()

  const [isOpen, setIsOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (!isOpen) return
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [isOpen, pathname])

  const toggleMenu = useCallback(() => setIsOpen((prev) => !prev), [])

  return (
    <nav className={classNames(s.menu, className)} ref={menuRef}>
      <button
        className={s.menu__toggle}
        onClick={toggleMenu}
        aria-label="Toggle menu"
      >
        {icon ?? <MenuIcon />}
      </button>

      <div
        className={classNames(s.menu__list, {
          [s.menu__list_open]: isOpen,
        })}
      >
        {items.map((item) => {
          const isActive = pathname && !!match(item.link())(pathname ?? "")

          return (
            <Link
              href={item.link()}
              key={item.name}
              className={classNames(s.menu__item, {
                [s.menu__item_active]: isActive,
              })}
              onClick={() => setIsOpen(false)}
            >
              {item.name}
            </Link>
          )
        })}
      </div>
    </nav>
  )
}

export default Menu
