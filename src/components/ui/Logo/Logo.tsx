import Image from "next/image"
import Link from "next/link"

import { ROUTES } from "@/constants/routes"
import classNames from "classnames"

import Heading from "@/components/ui/Heading"

import s from "./Logo.module.scss"

type LogoProps = {
  withTitle?: boolean
  className?: string
}

const Logo: React.FC<LogoProps> = ({
  withTitle = false,
  className,
}: LogoProps) => {
  return (
    <Link href={ROUTES.main.create()} className={classNames(s.logo, className)}>
      <Image
        src="/big-logo.png"
        width={42}
        height={42}
        alt="logo"
        className={s.logo__img}
      />
      {withTitle && (
        <Heading view="subtitle" weight="medium" className={s.logo__title}>
          Lalasia
        </Heading>
      )}
    </Link>
  )
}

export default Logo
