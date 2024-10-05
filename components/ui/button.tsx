import { Slot } from "@radix-ui/react-slot"
import { type VariantProps, cva } from "class-variance-authority"
import * as React from "react"

import { cn } from "@/lib/utils"

export const Button = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "active:pb-[2px] active:pt-[4px] active:outline-1 active:outline-black active:outline-dotted active:-outline-offset-8 size-full bg-material shadow-out justify-center items-center flex active:shadow-button",
      className
    )}
    {...props}
  />
))
Button.displayName = "Button"
