"use client"

import React, { useEffect } from "react"

import Image from "next/image"
import { useRouter } from "next/navigation"

import { ROUTES } from "@/constants/routes"
import { useAuthStore } from "@/hooks/globalStores"
import { Calendar, CheckCircle, Mail } from "lucide-react"
import { observer } from "mobx-react-lite"

import Heading from "@/components/ui/Heading"
import ProfileSkeleton from "@/components/ui/skeletons/ProfileSkeleton"

import { confirmLogout } from "@/utils/confirmLogout"
import { formatDate } from "@/utils/formatDate"

import LeftBlock from "./components/LeftBlock"
import RightBlock from "./components/RightBlock"
import s from "./Me.module.scss"

const Me: React.FC = observer(() => {
  const authStore = useAuthStore()
  const router = useRouter()

  const handleLogoutClick = () => {
    confirmLogout(() => {
      authStore.logout()
      router.push(ROUTES.products.create())
    })
  }

  useEffect(() => {
    if (!authStore.jwt) {
      router.push(ROUTES.login.create())
    }
  }, [authStore.jwt, router])

  if (authStore.isLoading) {
    return <ProfileSkeleton />
  }

  if (!authStore.user) {
    return null
  }

  return (
    <section className={s.profile}>
      <header className={s.profile__header}>
        <Image
          src="/defaultAvatar.jpg"
          alt="Аватар пользователя"
          width={140}
          height={140}
          className={s.profile__avatar}
          priority
        />

        <div className={s.profile__userInfo}>
          <Heading view="paragraph" className={s.userInfo__item}>
            <Mail className={s.emailIcon} />
            <span>{authStore.user.email}</span>
          </Heading>

          <Heading
            view="paragraph"
            className={s.userInfo__item}
            color="secondary"
          >
            <Calendar className={s.calendarIcon} />
            <span>
              On the platform from {formatDate(authStore.user.createdAt)}
            </span>
          </Heading>
        </div>

        <div className={s.profile__isActive}>
          <CheckCircle className={s.statusIcon} size={16} />
          <span>{authStore.user.confirmed ? "Activated" : "Inactive"}</span>
        </div>
      </header>

      <div className={s.profile__main}>
        <LeftBlock user={authStore.user} />

        <RightBlock handlerLogout={handleLogoutClick} />
      </div>
    </section>
  )
})

export default Me
