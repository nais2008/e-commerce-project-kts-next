import type { Metadata } from "next"

import Register from "./Register"
import s from "./page.module.scss"

export const metadata: Metadata = {
  title: "Register",
  description:
    "Register a new account to access exclusive features and personalized content. Join our community today and start enjoying all the benefits of being a member!",
}

export default function Page() {
  return (
    <main className={s.registerForm__center}>
      <Register />
    </main>
  )
}
