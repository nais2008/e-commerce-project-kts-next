import React from "react"

import classNames from "classnames"

import s from "./Form.module.scss"

export type Props = {
  children: React.ReactNode
  className?: string
  inModal?: boolean
} & React.FormHTMLAttributes<HTMLFormElement>

const Form: React.FC<Props> = ({
  children,
  className,
  inModal = false,
  ...props
}) => {
  return (
    <form
      {...props}
      className={classNames(s.form, className, {
        [s.form_modal]: inModal,
      })}
    >
      {children}
    </form>
  )
}

export default Form
