import type { Metadata } from "next"

import Login from "./Login"
import s from "./page.module.scss"

export const metadata: Metadata = {
  title: "Login",
  description:
    "Login to your account to access exclusive features and personalized content. Enter your credentials to securely log in and enjoy a seamless experience on our platform.",
}

export default function Page() {
  return (
    <main className={s.loginForm__center}>
      <Login />
    </main>
  )
}
