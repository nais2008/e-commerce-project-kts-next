import React from "react"

import { Minus, Plus } from "lucide-react"

import Button from "../Button"
import Heading from "../Heading"
import s from "./QuantityButton.module.scss"

type Props = {
  onAdd: (e: React.MouseEvent<HTMLButtonElement>) => void
  onRemove: (e: React.MouseEvent<HTMLButtonElement>) => void
  quantity: number
  isPrimary?: boolean
}

const QuantityButton: React.FC<Props> = ({
  onAdd,
  onRemove,
  quantity,
  isPrimary = false,
}) => {
  return (
    <div className={s.quantityBtn}>
      <Button
        isPrimary={isPrimary}
        className={s.quantityBtn__btn}
        onClick={onRemove}
      >
        <Minus />
      </Button>

      <Heading weight="medium" tag="span" className={s.quantityBtn__text}>
        {quantity}
      </Heading>

      <Button
        isPrimary={isPrimary}
        className={s.quantityBtn__btn}
        onClick={onAdd}
      >
        <Plus />
      </Button>
    </div>
  )
}

export default QuantityButton
