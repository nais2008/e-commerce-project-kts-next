"use client"

import React from "react"
import { Controller, type SubmitHandler, useForm } from "react-hook-form"
import { toast } from "react-toastify"

import Link from "next/link"
import { useRouter } from "next/navigation"

import { ROUTES } from "@/constants/routes"
import { useAuthStore } from "@/hooks/globalStores"
import { EMAIL_REGEX } from "@/shared/regex"
import { observer } from "mobx-react-lite"

import ErrorMessage from "@/components/layout/ErrorMessage"
import Form from "@/components/layout/Form"
import Button from "@/components/ui/Button"
import Heading from "@/components/ui/Heading"
import Input from "@/components/ui/Input"

import s from "./page.module.scss"

interface IRegisterForm {
  username: string
  email: string
  password: string
  passwordAgain: string
}

const Register: React.FC = observer(() => {
  const {
    control,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<IRegisterForm>({
    mode: "onSubmit",
  })

  const router = useRouter()
  const authStore = useAuthStore()

  const onSubmit: SubmitHandler<IRegisterForm> = (data) => {
    authStore.register({
      username: data.username,
      email: data.email,
      password: data.password,
    })
  }

  React.useEffect(() => {
    if (authStore.isAuthenticated) {
      toast.success("Account created successfully!")
      router.push(ROUTES.products.create())
    }
  }, [authStore.isAuthenticated, router])

  return (
    <Form className={s.registerForm} onSubmit={handleSubmit(onSubmit)}>
      <Heading tag="h2" view="title">
        Register
      </Heading>

      {authStore.error && <ErrorMessage errorMess={authStore.error.message} />}

      <div className={s.registerForm__field}>
        <Controller
          control={control}
          name="username"
          rules={{
            required: "Username is required",
            minLength: {
              value: 3,
              message: "Minimum 3 characters",
            },
          }}
          render={({ field }) => (
            <>
              <label htmlFor="username">
                <Heading color="secondary" weight="medium">
                  Username
                </Heading>
              </label>
              <Input id="username" type="text" {...field} />
            </>
          )}
        />
        <ErrorMessage errorMess={errors.username?.message} />
      </div>

      <div className={s.registerForm__field}>
        <Controller
          control={control}
          name="email"
          rules={{
            required: "Email is required",
            pattern: {
              value: EMAIL_REGEX,
              message: "Invalid email",
            },
          }}
          render={({ field }) => (
            <>
              <label htmlFor="email">
                <Heading color="secondary" weight="medium">
                  Email
                </Heading>
              </label>
              <Input id="email" type="email" {...field} />
            </>
          )}
        />
        <ErrorMessage errorMess={errors.email?.message} />
      </div>

      <div className={s.registerForm__field}>
        <Controller
          control={control}
          name="password"
          rules={{
            required: "Password is required",
            minLength: {
              value: 6,
              message: "Minimum 6 characters",
            },
          }}
          render={({ field }) => (
            <>
              <label htmlFor="password">
                <Heading color="secondary" weight="medium">
                  Password
                </Heading>
              </label>
              <Input id="password" type="password" {...field} />
            </>
          )}
        />
        <ErrorMessage errorMess={errors.password?.message} />
      </div>

      <div className={s.registerForm__field}>
        <Controller
          control={control}
          name="passwordAgain"
          rules={{
            required: "Please confirm password",
            validate: (value) =>
              value === getValues("password") || "Passwords do not match",
          }}
          render={({ field }) => (
            <>
              <label htmlFor="passwordAgain">
                <Heading color="secondary" weight="medium">
                  Confirm Password
                </Heading>
              </label>
              <Input id="passwordAgain" type="password" {...field} />
            </>
          )}
        />
        <ErrorMessage errorMess={errors.passwordAgain?.message} />
      </div>

      <div className={s.registerForm__field_link}>
        <Link href={ROUTES.login.create()}>Already have an account?</Link>
      </div>

      <div className={s.registerForm__field}>
        <Button
          className={s.registerForm__btn}
          loading={authStore.isLoadingRegister}
        >
          {authStore.isLoadingRegister ? "Loading..." : "Register"}
        </Button>
      </div>
    </Form>
  )
})

export default Register
