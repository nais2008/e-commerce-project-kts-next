import React from "react"

import cn from "classnames"

import Heading from "../Heading"
import Loader from "../Loader"
import s from "./Button.module.scss"

type ButtonProps = {
  children: React.ReactNode
  isPrimary?: boolean
  loading?: boolean
} & React.ButtonHTMLAttributes<HTMLButtonElement>

const Button: React.FC<ButtonProps> = ({
  children,
  className,
  isPrimary,
  loading,
  ...props
}: ButtonProps) => {
  return (
    <button
      className={cn(s.btn, { [s.btn_primary]: isPrimary }, className)}
      {...props}
      disabled={loading || props.disabled}
    >
      {loading && <Loader size="s" className={s.btn__loader} />}
      <Heading className={s.btn__text} view="button">
        {children}
      </Heading>
    </button>
  )
}

export default React.memo(Button)
