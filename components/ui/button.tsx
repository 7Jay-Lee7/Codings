import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow hover:bg-primary/90",
        destructive:
          "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
        outline:
          "border border-input bg-transparent shadow-sm hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
        ghost: "hover:bg-red-200/20 hover:text-red-700 font-extrabold text-slate-500",
        link: "text-primary underline-offset-4 hover:underline",
        course: "hover:bg-green-700 hover:text-white font-extrabold text-red-500 bg-[#121212]",
        continue: "hover:bg-green-700 hover:text-white font-extrabold text-green-700 bg-[#121212]",
        cancel: "hover:bg-red-700 hover:text-white font-extrabold text-red-700 bg-[#121212]",
        edit: "hover:bg-slate-200 hover:text-[#121212] font-bold text-slate-500 bg-transparent rounded-full",
        save: "hover:bg-emerald-600 hover:text-[#121212] font-bold text-emerald-400 bg-transparent rounded-full",
        combo: "border border-input border-[#121212] bg-slate-600 shadow-sm hover:bg-slate-400 hover:text-black font-bold",
        publish: "hover:bg-emerald-600 hover:text-[#121212] font-bold text-emerald-400 bg-[#121212] rounded-full",
        delete: "hover:bg-red-500 bg-red-900",
        move: "hover:bg-[#121212] hover:text-slate-200 font-bold text-[#121212] bg-slate-600 rounded-full",
        sort: "bg-foreground hover:text-white text-[#121212] font-extrabold rounded-full",
        new: "hover:bg-green-700 hover:text-white font-extrabold text-green-700 bg-[#121212] rounded-full",
        more: "bg-foreground font-extrabold text-[#121212] hover:text-white",
        enrol: "shadow-xl bg-[#121212] text-slate-200 hover:text-emerald-500",
        success: "hover:bg-emerald-600 hover:text-slate-200 font-bold text-emerald-400 bg-[#121212] rounded-full",
        uncompleted: "hover:bg-red-600 hover:text-slate-200 font-bold text-red-400 bg-[#121212] rounded-full",
        teacher: "hover:bg-emerald-200/20 hover:text-emerald-700 font-extrabold text-slate-300",
        exit: "hover:bg-red-200/20 hover:text-red-700 font-extrabold text-slate-300",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-full px-3 text-xs",
        lg: "h-10 rounded-full px-8",
        icon: "h-9 w-9",
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
