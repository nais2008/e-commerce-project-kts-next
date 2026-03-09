import React from "react"

import classNames from "classnames"
import { LogOut, Settings } from "lucide-react"

import Heading from "@/components/ui/Heading"

import styles from "./RightBlock.module.scss"

interface Props {
  className?: string
  handlerLogout?: () => void
}

const RightBlock: React.FC<Props> = ({ className, handlerLogout }) => {
  return (
    <div className={classNames(className, styles.rightBlock)}>
      <Heading
        view="subtitle"
        weight="medium"
        className={styles.rightBlock__header}
      >
        <Settings />
        Actions
      </Heading>

      <div
        className={classNames(
          styles.rightBlock__item,
          styles.rightBlock__item_red
        )}
        onClick={handlerLogout}
      >
        <LogOut />
        <div className={styles.item__info}>
          <Heading color="secondary">Logout</Heading>
          Log out of your account
        </div>
      </div>
    </div>
  )
}

export default RightBlock
