"use client"

import React from "react"
import { Controller, useForm } from "react-hook-form"
import { toast } from "react-toastify"

import Image from "next/image"

import { useCartStore } from "@/hooks/globalStores"
import type { IPurchaseItem } from "@/shared/interface/purchase.interface"
import cn from "classnames"

import { calculateDiscountedPrice } from "@/utils/calculateDiscountedPrice"
import {
  CARD_FORM_DEFAULT_VALUES,
  type CardFormValues,
  formatCardCvv,
  formatCardExpiry,
  formatCardNumber,
  isCardCvvValid,
  isCardExpiryValid,
  isCardNumberValid,
} from "@/utils/purchaseModal"

import Button from "../Button"
import Heading from "../Heading"
import Input from "../Input"
import Modal from "../Modal"
import s from "./PurchaseModal.module.scss"

const SBP_PAYMENT_URL = "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
const SBP_QR_URL = `https://api.qrserver.com/v1/create-qr-code/?size=260x260&data=${encodeURIComponent(SBP_PAYMENT_URL)}`

type PaymentMethod = "sbp" | "card"

type PurchaseModalProps = {
  isOpen: boolean
  onClose: () => void
  items: IPurchaseItem[]
  onSuccess?: () => void
}

const PurchaseModal: React.FC<PurchaseModalProps> = ({
  isOpen,
  onClose,
  items,
  onSuccess,
}) => {
  const cartStore = useCartStore()

  const [paymentMethod, setPaymentMethod] = React.useState<PaymentMethod>("sbp")
  const [isProcessing, setIsProcessing] = React.useState(false)

  const {
    control,
    handleSubmit,
    reset,
    formState: { isValid },
  } = useForm<CardFormValues>({
    mode: "onChange",
    defaultValues: CARD_FORM_DEFAULT_VALUES,
  })

  React.useEffect(() => {
    if (!isOpen) return

    setPaymentMethod("sbp")
    reset(CARD_FORM_DEFAULT_VALUES)
    setIsProcessing(false)
  }, [isOpen, reset])

  const totalItems = React.useMemo(
    () => items.reduce((sum, item) => sum + item.quantity, 0),
    [items]
  )

  const totalSum = React.useMemo(() => {
    const sum = items.reduce((result, item) => {
      const discountedPrice = calculateDiscountedPrice(
        item.price,
        item.discountPercent
      )

      return result + discountedPrice * item.quantity
    }, 0)

    return +sum.toFixed(2)
  }, [items])

  const completePurchase = React.useCallback(
    async (successMessage: string) => {
      setIsProcessing(true)

      try {
        await cartStore.clearCart()
        toast.success(successMessage)
        onClose()
        onSuccess?.()
      } finally {
        setIsProcessing(false)
      }
    },
    [cartStore, onClose, onSuccess]
  )

  const handleSbpDone = React.useCallback(() => {
    void completePurchase("Purchase completed")
  }, [completePurchase])

  const handleOpenSbpLink = React.useCallback(() => {
    window.open(SBP_PAYMENT_URL, "_blank", "noopener,noreferrer")
  }, [])

  const handleCardPayment = handleSubmit(() => {
    void completePurchase("Payment successful")
  })

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Purchase">
      <div className={s.purchase}>
        <div className={s.purchase__content}>
          <div className={s.purchase__items}>
            {items.map((item) => {
              const discountedPrice = calculateDiscountedPrice(
                item.price,
                item.discountPercent
              )

              return (
                <div key={item.id} className={s.purchase__item}>
                  <Image
                    src={item.imageUrl || "/apple-icon.png"}
                    alt={item.title}
                    className={s.purchase__itemImage}
                    width={56}
                    height={56}
                    unoptimized
                  />
                  <div className={s.purchase__itemInfo}>
                    <Heading
                      view="paragraph"
                      weight="medium"
                      maxLines={2}
                      className={s.purchase__itemTitle}
                    >
                      {item.title}
                    </Heading>
                    <Heading view="paragraph" color="secondary">
                      {item.quantity} pcs
                    </Heading>
                  </div>
                  <Heading view="paragraph" weight="medium">
                    ${(discountedPrice * item.quantity).toFixed(2)}
                  </Heading>
                </div>
              )
            })}
          </div>

          <div className={s.purchase__summary}>
            <Heading view="paragraph">
              Total items: <Heading tag="span">{totalItems}</Heading>
            </Heading>
            <Heading view="paragraph">
              Total: <Heading tag="span">${totalSum.toFixed(2)}</Heading>
            </Heading>
          </div>

          <div className={s.purchase__methods}>
            <button
              type="button"
              className={cn(s.purchase__method, {
                [s.purchase__method_active]: paymentMethod === "sbp",
              })}
              onClick={() => setPaymentMethod("sbp")}
            >
              SBP
            </button>
            <button
              type="button"
              className={cn(s.purchase__method, {
                [s.purchase__method_active]: paymentMethod === "card",
              })}
              onClick={() => setPaymentMethod("card")}
            >
              Card
            </button>
          </div>

          {paymentMethod === "sbp" ? (
            <div className={s.purchase__sbp}>
              <a
                href={SBP_PAYMENT_URL}
                target="_blank"
                rel="noreferrer"
                className={s.purchase__qrLink}
                aria-label="Open SBP payment link"
              >
                <Image
                  src={SBP_QR_URL}
                  alt="SBP payment QR code"
                  className={s.purchase__qrImage}
                  width={220}
                  height={220}
                  unoptimized
                />
              </a>
            </div>
          ) : (
            <div className={s.purchase__card}>
              <Controller
                control={control}
                name="cardNumber"
                rules={{
                  required: true,
                  validate: isCardNumberValid,
                }}
                render={({ field }) => (
                  <Input
                    className={s.purchase__input}
                    placeholder="Card number"
                    value={field.value}
                    onChange={(value) =>
                      field.onChange(formatCardNumber(value))
                    }
                    onBlur={field.onBlur}
                    name={field.name}
                    inputMode="numeric"
                    autoComplete="cc-number"
                    disabled={isProcessing}
                  />
                )}
              />

              <div className={s.purchase__cardSecondary}>
                <Controller
                  control={control}
                  name="cardExpiry"
                  rules={{
                    required: true,
                    validate: isCardExpiryValid,
                  }}
                  render={({ field }) => (
                    <Input
                      className={s.purchase__input}
                      placeholder="MM/YY"
                      value={field.value}
                      onChange={(value) =>
                        field.onChange(formatCardExpiry(value))
                      }
                      onBlur={field.onBlur}
                      name={field.name}
                      inputMode="numeric"
                      autoComplete="cc-exp"
                      disabled={isProcessing}
                    />
                  )}
                />
                <Controller
                  control={control}
                  name="cardCvv"
                  rules={{
                    required: true,
                    validate: isCardCvvValid,
                  }}
                  render={({ field }) => (
                    <Input
                      className={s.purchase__input}
                      placeholder="CVV"
                      value={field.value}
                      onChange={(value) => field.onChange(formatCardCvv(value))}
                      onBlur={field.onBlur}
                      name={field.name}
                      inputMode="numeric"
                      autoComplete="cc-csc"
                      disabled={isProcessing}
                    />
                  )}
                />
              </div>

              {!isValid && (
                <Heading
                  view="paragraph"
                  color="secondary"
                  className={s.purchase__hint}
                >
                  Check card details: number, expiration date and CVV.
                </Heading>
              )}
            </div>
          )}
        </div>

        <div
          className={cn(s.purchase__actions, {
            [s.purchase__actions_sbp]: paymentMethod === "sbp",
          })}
        >
          {paymentMethod === "sbp" ? (
            <>
              <Button
                isPrimary
                className={s.purchase__action}
                onClick={handleOpenSbpLink}
                disabled={items.length === 0 || isProcessing}
              >
                Open payment link
              </Button>
              <Button
                className={s.purchase__action}
                onClick={handleSbpDone}
                disabled={items.length === 0 || isProcessing}
                loading={isProcessing}
              >
                Done
              </Button>
            </>
          ) : (
            <Button
              className={s.purchase__action}
              onClick={handleCardPayment}
              disabled={!isValid || items.length === 0 || isProcessing}
              loading={isProcessing}
            >
              Pay
            </Button>
          )}
        </div>
      </div>
    </Modal>
  )
}

export default PurchaseModal
