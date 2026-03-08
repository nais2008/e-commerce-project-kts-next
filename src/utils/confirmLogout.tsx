import { toast } from "react-toastify"

import Button from "@/components/ui/Button"

export const confirmLogout = (onConfirm: () => void) => {
  toast(
    ({ closeToast }) => (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "12px",
        }}
      >
        <span>Are you sure you want to logout?</span>

        <div style={{ display: "flex", gap: "8px" }}>
          <Button
            isPrimary
            onClick={() => {
              closeToast()
            }}
          >
            Cancel
          </Button>

          <Button
            onClick={() => {
              onConfirm()
              closeToast()
            }}
          >
            Logout
          </Button>
        </div>
      </div>
    ),
    {
      autoClose: false,
      closeOnClick: false,
      draggable: false,
      style: { width: "320px" },
    }
  )
}
