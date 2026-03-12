import Link from "next/link"

import Heading from "@/components/ui/Heading"

import s from "./Footer.module.scss"
import { FOOTER_LINKS } from "./footer.data"

const Footer = () => {
  const year =
    new Date().getFullYear() === 2026
      ? "2026"
      : `2026 - ${new Date().getFullYear()}`

  return (
    <footer className={s.footer}>
      <div className={s.footer__container}>
        <Heading view="paragraph" weight="medium" color="secondary">
          © Lalasia {year}
        </Heading>
        <nav className={s.footer__navigate}>
          {FOOTER_LINKS.map((link) => (
            <Link key={link.href} href={link.href} target={link.target}>
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </footer>
  )
}

export default Footer
