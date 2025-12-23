import { motion } from "motion/react"
import { Link } from "react-router"
import { logoLight, logoDark } from "@/assets";

const MotionLink = motion.create(Link); // MotionLink is a motion component that is created from the Link component

export const Logo = () => {
  return (
    <MotionLink
      to="/"
      className="text-primary text-lg font-semibold"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.9 }}
      viewTransition
    >
      <img
        src={logoLight}
        alt="Logo"
        width={115}
        height={115}
        className="hidden dark:block"
      />
      <img
        src={logoDark}
        alt="Logo"
        width={115}
        height={115}
        className="dark:hidden"
      />
    </MotionLink>
  )
}