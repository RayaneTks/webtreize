import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-full text-base font-bold ring-offset-white transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:scale-[0.97]",
  {
    variants: {
      variant: {
        default:
          "bg-orange text-white shadow-[0_12px_24px_rgba(255,69,0,0.15)] hover:bg-orange-hover hover:shadow-[0_16px_32px_rgba(255,69,0,0.25)] hover:-translate-y-0.5",
        secondary:
          "bg-navy text-white shadow-sm hover:bg-navy/90 shadow-[0_10px_20px_rgba(0,31,63,0.15)] hover:shadow-[0_15px_30px_rgba(0,31,63,0.25)] hover:-translate-y-0.5",
        outline:
          "border-2 border-navy/10 bg-white text-navy hover:border-navy/25 hover:bg-neutral-bg",
        ghost: "hover:bg-neutral-bg text-navy",
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
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
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
