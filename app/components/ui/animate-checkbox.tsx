"use client"

import React from "react"
import * as CheckboxPrimitive from "@radix-ui/react-checkbox"
import { motion } from "motion/react"

export function AnimateCheckbox({
  className = "",
  checked: checkedProp,
  onCheckedChange: setCheckedProp,
  disabled,
  defaultChecked,
  ...props
}: React.ComponentProps<typeof CheckboxPrimitive.Root>) {
  const [_checked, _setChecked] =
    React.useState<CheckboxPrimitive.CheckedState>(defaultChecked ?? false)

  const checked = checkedProp ?? _checked

  const setChecked = React.useCallback(
    (value: CheckboxPrimitive.CheckedState | ((v: CheckboxPrimitive.CheckedState) => boolean)) => {
      const checkedState = typeof value === "function" ? value(checked) : value
      if (setCheckedProp) setCheckedProp(checkedState)
      else _setChecked(checkedState)
    },
    [setCheckedProp, checked],
  )

  return (
    <motion.div
      whileTap={disabled ? undefined : { scale: 0.9 }}
      whileHover={disabled ? undefined : { scale: 1.1 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
    >
      <CheckboxPrimitive.Root
        checked={checked}
        onCheckedChange={(value) => setChecked(!!value)}
        disabled={disabled}
        className={[
          "flex items-center justify-center w-5 h-5 shrink-0 rounded-full border transition-all duration-200 outline-none",
          "border-white/20 hover:border-white/50",
          "data-[state=checked]:bg-white data-[state=checked]:border-white data-[state=checked]:text-black",
          "disabled:cursor-not-allowed disabled:opacity-50",
          className,
        ].join(" ")}
        {...props}
      >
        <motion.svg
          className="h-full w-full p-1"
          viewBox="0 0 12 12"
          fill="none"
          initial={false}
        >
          <motion.path
            d="M2.5 6L4.5 8L9.5 3"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
            animate={checked ? "checked" : "unchecked"}
            variants={{
              checked: {
                pathLength: 1,
                opacity: 1,
                transition: {
                  pathLength: { duration: 0.2, ease: "easeInOut", delay: 0.05 },
                  opacity: { duration: 0.1 },
                },
              },
              unchecked: {
                pathLength: 0,
                opacity: 0,
                transition: {
                  pathLength: { duration: 0.2, ease: "easeInOut" },
                  opacity: { duration: 0.15, delay: 0.05 },
                },
              },
            }}
          />
        </motion.svg>
      </CheckboxPrimitive.Root>
    </motion.div>
  )
}
