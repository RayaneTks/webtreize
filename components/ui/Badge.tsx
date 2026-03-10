import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-4 py-1.5 text-xs md:text-sm font-bold transition-colors focus:outline-none focus:ring-2 focus:ring-orange focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-navy text-white hover:bg-navy/90",
        secondary:
          "border-transparent bg-neutral-bg text-navy hover:bg-gray-200",
        destructive:
          "border-transparent bg-red-500 text-white hover:bg-red-600",
        outline: "text-navy border-navy/20",
        accent: "border-transparent bg-orange text-white hover:bg-orange-hover",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }
