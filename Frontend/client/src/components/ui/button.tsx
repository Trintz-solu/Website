import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 shadow-md hover:shadow-lg",
  {
    variants: {
      variant: {
        default: "bg-electric text-white hover:bg-electric/90 border border-electric/20 shadow-electric/25",
        destructive:
          "bg-red-600 text-white hover:bg-red-700 border border-red-500/20 shadow-red-500/25",
        outline:
          "border-2 border-electric bg-transparent text-electric hover:bg-electric hover:text-white shadow-electric/25",
        secondary:
          "bg-sandstone-200 text-sandstone-800 hover:bg-sandstone-300 border border-sandstone-300 shadow-sandstone-500/25 dark:bg-sandstone-700 dark:text-sandstone-100 dark:hover:bg-sandstone-600 dark:border-sandstone-600",
        ghost: "hover:bg-electric/10 hover:text-electric border border-transparent",
        link: "text-electric underline-offset-4 hover:underline bg-transparent border-none shadow-none",
        glass: "bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20 shadow-white/25",
        dark: "bg-gray-900 text-white hover:bg-gray-800 border border-gray-700 shadow-gray-900/25",
        light: "bg-white text-gray-900 hover:bg-gray-50 border border-gray-200 shadow-gray-500/25",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3 text-xs",
        lg: "h-12 rounded-lg px-8 py-3 text-base font-semibold",
        xl: "h-14 rounded-lg px-10 py-4 text-lg font-bold",
        icon: "h-10 w-10",
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
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
