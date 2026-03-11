import type { Metadata } from "next"

import Me from "./Me"
import s from "./page.module.scss"

export const metadata: Metadata = {
  title: "My Profile",
  description: "User profile page with account information and settings.",
  robots: {
    index: false,
    follow: false,
  },
  openGraph: {
    title: "My Profile",
    description: "User profile page with account information and settings.",
    type: "profile",
  },
}

export default function Page() {
  return (
    <main className={s.profile__center}>
      <Me />
    </main>
  )
}
