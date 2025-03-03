
import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "relative z-10 overflow-hidden bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-[0_4px_10px_rgba(0,0,0,0.03)] before:absolute before:inset-0 before:-z-10 before:translate-y-[100%] before:bg-gradient-to-r before:from-indigo-600 before:to-purple-600 before:transition-transform before:duration-300 hover:before:translate-y-0",
        destructive:
          "relative z-10 overflow-hidden bg-gradient-to-r from-red-500 to-pink-500 text-white shadow-[0_4px_10px_rgba(0,0,0,0.03)] before:absolute before:inset-0 before:-z-10 before:translate-y-[100%] before:bg-gradient-to-r before:from-pink-500 before:to-red-500 before:transition-transform before:duration-300 hover:before:translate-y-0",
        outline:
          "relative z-10 overflow-hidden border border-input bg-background shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground",
        secondary:
          "relative z-10 overflow-hidden bg-gradient-to-r from-teal-500 to-emerald-500 text-white shadow-[0_4px_10px_rgba(0,0,0,0.03)] before:absolute before:inset-0 before:-z-10 before:translate-y-[100%] before:bg-gradient-to-r before:from-emerald-500 before:to-teal-500 before:transition-transform before:duration-300 hover:before:translate-y-0",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
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

const GradientButton = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);

GradientButton.displayName = "GradientButton";

export { GradientButton, buttonVariants };
