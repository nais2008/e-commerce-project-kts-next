import {
  CARD_CVV_REGEX,
  CARD_EXPIRY_REGEX,
  CARD_NUMBER_REGEX,
} from "@/shared/regex"

export type CardFormValues = {
  cardNumber: string
  cardExpiry: string
  cardCvv: string
}

export const CARD_FORM_DEFAULT_VALUES: CardFormValues = {
  cardNumber: "",
  cardExpiry: "",
  cardCvv: "",
}

export const formatCardNumber = (value: string) => {
  const digits = value.replace(/\D/g, "").slice(0, 16)

  return digits.match(/.{1,4}/g)?.join(" ") ?? ""
}

export const formatCardExpiry = (value: string) => {
  const digits = value.replace(/\D/g, "").slice(0, 4)

  if (digits.length <= 2) {
    return digits
  }

  return `${digits.slice(0, 2)}/${digits.slice(2)}`
}

export const formatCardCvv = (value: string) =>
  value.replace(/\D/g, "").slice(0, 3)

export const isCardNumberValid = (value: string) =>
  CARD_NUMBER_REGEX.test(value.replace(/\s/g, ""))

export const isCardCvvValid = (value: string) => CARD_CVV_REGEX.test(value)

export const isCardExpiryValid = (value: string) => {
  if (!CARD_EXPIRY_REGEX.test(value)) return false

  const [monthRaw, yearRaw] = value.split("/")
  const month = Number(monthRaw)
  const year = Number(yearRaw)

  if (!Number.isFinite(month) || !Number.isFinite(year)) return false

  const currentDate = new Date()
  const currentYear = currentDate.getFullYear() % 100
  const currentMonth = currentDate.getMonth() + 1

  return year > currentYear || (year === currentYear && month >= currentMonth)
}
