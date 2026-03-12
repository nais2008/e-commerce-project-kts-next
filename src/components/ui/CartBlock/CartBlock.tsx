import Link from "next/link"

import { ROUTES } from "@/constants/routes"
import classNames from "classnames"
import { Handbag } from "lucide-react"

import s from "./CartBlock.module.scss"
import CartCount from "./CartCount"

type Props = {
  className?: string
}

const CartBlock = ({ className }: Props) => {
  return (
    <Link
      href={ROUTES.cart.create()}
      className={classNames(className, s.cartBlock)}
    >
      <Handbag size={30} />
      <CartCount className={s.cartBlock__countItems} />
    </Link>
  )
}

export default CartBlock
