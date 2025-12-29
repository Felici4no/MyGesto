import * as React from "react"
import { Slot } from "@radix-ui/react-slot" // Need to install this or remove Slot
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

// Removing Slot dependency for MVP to avoid extra installs unless crucial
// We can simple use basic props, but cva is from a dependency I didn't install explicitly? 
// Wait, I didn't install class-variance-authority or radix-slot. 
// I should stick to simple button for MVP to minimize dependencies.

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'outline' | 'ghost'
    size?: 'sm' | 'md' | 'lg'
    block?: boolean
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant = 'primary', size = 'md', block, ...props }, ref) => {
        return (
            <button
                ref={ref}
                className={cn(
                    "inline-flex items-center justify-center rounded-2xl font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-slate-950 disabled:pointer-events-none disabled:opacity-50",
                    {
                        'bg-slate-900 text-white hover:bg-slate-800 shadow-sm': variant === 'primary',
                        'bg-slate-100 text-slate-900 hover:bg-slate-200': variant === 'secondary',
                        'border border-slate-200 bg-white hover:bg-slate-100 hover:text-slate-900': variant === 'outline',
                        'hover:bg-slate-100 hover:text-slate-900': variant === 'ghost',
                        'h-9 px-4 text-sm': size === 'sm',
                        'h-12 px-8 text-base': size === 'md',
                        'h-14 px-10 text-lg': size === 'lg',
                        'w-full': block,
                    },
                    className
                )}
                {...props}
            />
        )
    }
)
Button.displayName = "Button"
