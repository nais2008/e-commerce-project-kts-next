"use client"

import React from "react"
import { createPortal } from "react-dom"

import cn from "classnames"
import { X } from "lucide-react"

import s from "./Modal.module.scss"

type ModalProps = {
  isOpen: boolean
  onClose: () => void
  children: React.ReactNode
  title?: React.ReactNode
  className?: string
  overlayClassName?: string
  size?: "s" | "m" | "l"
  closeOnOverlay?: boolean
  showCloseButton?: boolean
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  children,
  title,
  className,
  overlayClassName,
  size = "m",
  closeOnOverlay = true,
  showCloseButton = true,
}) => {
  const CLOSE_ANIMATION_DURATION_MS = 220
  const [mounted, setMounted] = React.useState(false)
  const [shouldRender, setShouldRender] = React.useState(isOpen)
  const closeTimerRef = React.useRef<ReturnType<typeof setTimeout> | null>(null)
  const titleId = React.useId()

  const clearCloseTimer = React.useCallback(() => {
    if (!closeTimerRef.current) return

    clearTimeout(closeTimerRef.current)
    closeTimerRef.current = null
  }, [])

  React.useEffect(() => {
    setMounted(true)
  }, [])

  React.useEffect(() => {
    if (!mounted) return

    if (isOpen) {
      clearCloseTimer()
      setShouldRender(true)
      return
    }

    if (!shouldRender) return

    closeTimerRef.current = setTimeout(() => {
      setShouldRender(false)
      closeTimerRef.current = null
    }, CLOSE_ANIMATION_DURATION_MS)

    return clearCloseTimer
  }, [
    CLOSE_ANIMATION_DURATION_MS,
    clearCloseTimer,
    isOpen,
    mounted,
    shouldRender,
  ])

  React.useEffect(() => {
    return clearCloseTimer
  }, [clearCloseTimer])

  React.useEffect(() => {
    if (!shouldRender) return

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = "hidden"

    return () => {
      document.body.style.overflow = previousOverflow
    }
  }, [shouldRender])

  React.useEffect(() => {
    if (!shouldRender) return

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose()
      }
    }

    window.addEventListener("keydown", onKeyDown)

    return () => {
      window.removeEventListener("keydown", onKeyDown)
    }
  }, [onClose, shouldRender])

  const handleOverlayMouseDown = React.useCallback(() => {
    if (!closeOnOverlay) return

    onClose()
  }, [closeOnOverlay, onClose])

  if (!mounted || !shouldRender) return null

  const shouldRenderHeader = Boolean(title) || showCloseButton
  const modalStateClass = isOpen ? s.modal_open : s.modal_closing

  return createPortal(
    <div
      className={cn(s.modal, modalStateClass, overlayClassName)}
      onMouseDown={handleOverlayMouseDown}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? titleId : undefined}
        className={cn(s.modal__dialog, s[`modal__dialog_${size}`], className)}
        onMouseDown={(event) => event.stopPropagation()}
      >
        {shouldRenderHeader && (
          <div className={s.modal__header}>
            {title ? (
              <h2 id={titleId} className={s.modal__title}>
                {title}
              </h2>
            ) : (
              <span />
            )}
            {showCloseButton && (
              <button
                type="button"
                className={s.modal__close}
                onClick={onClose}
                aria-label="Close modal"
              >
                <X size={18} />
              </button>
            )}
          </div>
        )}
        <div className={s.modal__content}>{children}</div>
      </div>
    </div>,
    document.body
  )
}

export default Modal
