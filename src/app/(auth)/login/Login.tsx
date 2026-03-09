"use client"

import React from "react"
import { Controller, SubmitHandler, useForm } from "react-hook-form"
import { toast } from "react-toastify"

import Link from "next/link"
import { useRouter } from "next/navigation"

import { ROUTES } from "@/constants/routes"
import { useAuthStore } from "@/hooks/globalStores"
import { observer } from "mobx-react-lite"

import ErrorMessage from "@/components/layout/ErrorMessage"
import Form from "@/components/layout/Form"
import Button from "@/components/ui/Button"
import Heading from "@/components/ui/Heading"
import Input from "@/components/ui/Input"

import s from "./page.module.scss"

interface ILoginForm {
  identifier: string
  password: string
}

const Login: React.FC = observer(() => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ILoginForm>({
    mode: "onSubmit",
    defaultValues: {
      identifier: "",
      password: "",
    },
  })

  const router = useRouter()

  const authStore = useAuthStore()

  const onSubmit: SubmitHandler<ILoginForm> = async (data) => {
    await authStore.login({
      identifier: data.identifier,
      password: data.password,
    })
  }

  React.useEffect(() => {
    if (authStore.isAuthenticated) {
      toast.success("Welcome!")
      router.push(ROUTES.products.create())
    }
  }, [authStore.isAuthenticated, router])

  return (
    <Form className={s.loginForm} onSubmit={handleSubmit(onSubmit)}>
      <Heading tag="h2" view="title">
        Login
      </Heading>
      {authStore.error && <ErrorMessage errorMess={authStore.error.message} />}
      <div className={s.loginForm__field}>
        <Controller
          control={control}
          name="identifier"
          rules={{
            required: "Identifier is required",
          }}
          render={({ field }) => (
            <>
              <label htmlFor="identifier">
                <Heading color="secondary" weight="medium">
                  Username or email
                </Heading>
              </label>
              <Input id="identifier" type="text" {...field} />
            </>
          )}
        />
        <ErrorMessage errorMess={errors.identifier?.message} />
      </div>
      <div className={s.loginForm__field}>
        <Controller
          control={control}
          name="password"
          rules={{
            required: "Password is required",
          }}
          render={({ field }) => (
            <>
              <label htmlFor="identifier">
                <Heading color="secondary" weight="medium">
                  Password
                </Heading>
              </label>
              <Input type="password" {...field} />
            </>
          )}
        />
        <ErrorMessage errorMess={errors.password?.message} />
      </div>
      <div className={s.loginForm__field_link}>
        <Link href={ROUTES.register.create()}>Don{"`"}t have an account?</Link>
      </div>
      <div className={s.loginForm__field}>
        <Button className={s.loginForm__btn} loading={authStore.isLoadingAuth}>
          {authStore.isLoadingAuth ? "Loading..." : "Login"}
        </Button>
      </div>
    </Form>
  )
})

export default Login
