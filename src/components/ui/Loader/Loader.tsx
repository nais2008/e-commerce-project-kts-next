import React from "react"

import classNames from "classnames"

import s from "./Loader.module.scss"

type LoaderProps = {
  size?: "s" | "m" | "l"
  className?: string
}

const Loader: React.FC<LoaderProps> = ({ size, className }) => {
  return (
    <div
      className={classNames(s.loader, className, size && s[`loader_${size}`])}
    />
  )
}

export default Loader
