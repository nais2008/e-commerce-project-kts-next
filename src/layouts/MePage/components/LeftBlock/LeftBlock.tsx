import React from "react"

import type { IUser } from "@/shared/interface/user.interface"
import classNames from "classnames"
import { Info, Mail, User } from "lucide-react"

import Heading from "@/components/ui/Heading"

import styles from "./LeftBlock.module.scss"

interface Props {
  user: IUser
  className?: string
}

const LeftBlock: React.FC<Props> = ({ user, className }) => {
  const items = [
    {
      icon: <User />,
      label: "Username",
      value: user.username,
    },
    {
      icon: <Mail />,
      label: "Email",
      value: user.email,
    },
  ]

  return (
    <div className={classNames(className, styles.leftBlock)}>
      <Heading
        view="subtitle"
        weight="medium"
        className={styles.leftBlock__header}
      >
        <Info />
        Main info
      </Heading>

      {items.map(({ icon, label, value }) => (
        <div key={label} className={styles.leftBlock__item}>
          {icon}

          <div className={styles.item__info}>
            <Heading color="secondary">{label}</Heading>
            {value}
          </div>
        </div>
      ))}
    </div>
  )
}

export default LeftBlock
