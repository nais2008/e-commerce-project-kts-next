import React from "react"

import classNames from "classnames"

import s from "./Heading.module.scss"

type HeadingProps = {
  className?: string
  view?: "title" | "button" | "subtitle" | "desc" | "paragraph"
  tag?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "div" | "p" | "span"
  weight?: "normal" | "medium" | "bold"
  children: React.ReactNode
  color?: "primary" | "secondary" | "accent"
  maxLines?: number
} & React.HTMLAttributes<HTMLHeadingElement>

const Heading: React.FC<HeadingProps> = ({
  className,
  view,
  tag = "p",
  weight,
  children,
  color,
  maxLines,
  ...props
}: HeadingProps) => {
  const Component = tag

  const style = maxLines
    ? ({
        "--max-lines": maxLines,
        WebkitLineClamp: maxLines,
      } as React.CSSProperties)
    : {}

  return (
    <Component
      className={classNames(
        s.heading,
        className,
        view && s[`view_${view}`],
        weight && s[`weight_${weight}`],
        color && s[`color_${color}`],
        maxLines && s.ellipsis
      )}
      style={style}
      {...props}
    >
      {children}
    </Component>
  )
}

export default Heading
