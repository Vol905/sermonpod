
import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "bg-gradient-to-tr from-blue-500 to-indigo-600 text-primary-foreground shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40 hover:from-blue-600 hover:to-indigo-700 focus-visible:ring-blue-500",
        secondary:
          "bg-gradient-to-tr from-purple-500 to-pink-600 text-secondary-foreground shadow-lg shadow-purple-500/20 hover:shadow-purple-500/40 hover:from-purple-600 hover:to-pink-700 focus-visible:ring-purple-500",
        destructive:
          "bg-gradient-to-tr from-red-500 to-orange-600 text-destructive-foreground shadow-lg shadow-red-500/20 hover:shadow-red-500/40 hover:from-red-600 hover:to-orange-700 focus-visible:ring-red-500",
        outline:
          "border-2 border-primary bg-transparent hover:bg-primary/10 text-primary shadow-sm",
        ghost:
          "bg-transparent text-primary hover:bg-muted hover:text-primary",
      },
      size: {
        default: "h-11 px-6 py-3",
        sm: "h-9 px-3 py-2",
        lg: "h-14 px-8 py-4 text-lg",
        icon: "h-9 w-9",
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
  href?: string;
  target?: string;
  rel?: string;
}

const GradientButton = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, href, target, rel, ...props }, ref) => {
    if (href) {
      // Create proper HTML attributes for anchor element, excluding button-specific props
      const anchorProps: React.AnchorHTMLAttributes<HTMLAnchorElement> = {
        href,
        target,
        rel,
        className: cn(buttonVariants({ variant, size, className })),
      };
      
      // Only copy over props that are valid for anchor elements
      // This approach avoids TypeScript errors from copying button props to anchor elements
      const { disabled, form, formAction, formEncType, formMethod, formNoValidate, formTarget, name, type, value, ...validAnchorProps } = props;
      
      return (
        <a
          {...anchorProps}
          {...validAnchorProps as React.AnchorHTMLAttributes<HTMLAnchorElement>}
        />
      );
    }
    
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
