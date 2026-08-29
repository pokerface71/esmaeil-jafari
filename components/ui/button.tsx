import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-xl text-sm font-semibold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-500 bg-[length:200%_100%] text-white hover:animate-[gradient-shift_2s_ease_infinite] hover:shadow-lg hover:shadow-indigo-500/25 hover:-translate-y-0.5",
        destructive:
          "bg-red-500/90 text-white hover:bg-red-500 hover:shadow-lg hover:shadow-red-500/25",
        outline:
          "glass-light border border-white/10 text-gray-300 hover:bg-white/10 hover:text-white",
        secondary:
          "bg-white/5 text-gray-300 border border-white/5 hover:bg-white/10",
        ghost: "hover:bg-white/5 hover:text-white",
        link: "text-indigo-400 underline-offset-4 hover:text-indigo-300",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-lg px-3",
        lg: "h-11 rounded-xl px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
