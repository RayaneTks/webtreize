import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-sm text-base font-bold ring-offset-cream transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98]",
  {
    variants: {
      variant: {
        default:
          "bg-orange text-white border-2 border-navy shadow-brutal hover:bg-orange-hover hover:shadow-brutal-lg hover:-translate-x-0.5 hover:-translate-y-0.5",
        secondary:
          "bg-navy text-white border-2 border-navy shadow-brutal hover:shadow-brutal-lg hover:-translate-x-0.5 hover:-translate-y-0.5",
        outline:
          "border-2 border-navy bg-cream text-navy hover:bg-navy hover:text-white",
        ghost: "hover:bg-cream-dark text-navy",
        link: "text-orange underline-offset-4 hover:underline",
      },
      size: {
        default: "h-12 px-8 py-3 w-full md:w-auto",     // 48px height min pour mobile
        sm: "h-10 px-4 w-full md:w-auto text-sm",
        lg: "h-14 px-10 w-full md:w-auto text-lg",        // Grand CTA
        icon: "h-12 w-12",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
