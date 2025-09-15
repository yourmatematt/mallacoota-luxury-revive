import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium ring-offset-background transition-all duration-200 ease-in-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        // Primary CTA - Deep navy brand color
        default: "bg-primary text-primary-foreground hover:bg-primary/90 active:bg-primary/80 shadow-medium hover:shadow-strong active:scale-95",

        // Accent CTA - Hammond Properties red accent
        accent: "bg-accent-red text-white hover:bg-accent-red/90 active:bg-accent-red/80 shadow-medium hover:shadow-strong hover:scale-105 active:scale-100",

        // Secondary actions
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80 active:bg-secondary/70 shadow-soft hover:shadow-medium active:scale-95",

        // Outline for less prominent actions
        outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground active:bg-accent/80 shadow-soft hover:shadow-medium active:scale-95",

        // Ghost for subtle actions
        ghost: "hover:bg-accent hover:text-accent-foreground active:bg-accent/80 active:scale-95",

        // Link style
        link: "text-primary underline-offset-4 hover:underline active:text-primary/80",

        // Destructive actions
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90 active:bg-destructive/80 shadow-medium hover:shadow-strong active:scale-95",

        // Premium gradient button for special CTAs
        premium: "bg-gradient-to-r from-accent-red to-accent-red/80 text-white hover:from-accent-red/90 hover:to-accent-red/70 active:from-accent-red/80 active:to-accent-red/60 shadow-strong hover:shadow-xl hover:scale-105 active:scale-100",
      },
      size: {
        sm: "h-9 rounded-md px-3 text-xs",
        default: "h-10 px-4 py-2 rounded-md",
        lg: "h-11 rounded-md px-8 text-base",
        xl: "h-12 rounded-lg px-10 py-3 text-lg",
        icon: "h-10 w-10 rounded-md",
      },
      rounded: {
        default: "",
        full: "rounded-full",
        lg: "rounded-lg",
        xl: "rounded-xl",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      rounded: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, rounded, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, rounded, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }