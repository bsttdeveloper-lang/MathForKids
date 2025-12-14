import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-2xl text-lg font-bold font-fredoka transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-5 [&_svg]:shrink-0 active:scale-95",
  {
    variants: {
      variant: {
        default:
          "gradient-button text-primary-foreground shadow-button hover:shadow-lg hover:-translate-y-1",
        secondary:
          "gradient-pink text-secondary-foreground shadow-soft hover:shadow-lg hover:-translate-y-1",
        accent:
          "gradient-accent text-accent-foreground shadow-soft hover:shadow-lg hover:-translate-y-1",
        success:
          "gradient-green text-success-foreground shadow-soft hover:shadow-lg hover:-translate-y-1",
        purple:
          "gradient-purple text-purple-foreground shadow-soft hover:shadow-lg hover:-translate-y-1",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "border-4 border-primary bg-card text-foreground hover:bg-primary hover:text-primary-foreground",
        ghost: 
          "hover:bg-muted hover:text-foreground",
        link: 
          "text-primary underline-offset-4 hover:underline",
        store:
          "bg-foreground text-background rounded-xl px-6 py-3 hover:opacity-90 hover:-translate-y-1 shadow-card",
      },
      size: {
        default: "h-14 px-8 py-4",
        sm: "h-10 rounded-xl px-4 text-base",
        lg: "h-16 rounded-2xl px-10 text-xl",
        xl: "h-20 rounded-3xl px-12 text-2xl",
        icon: "h-12 w-12 rounded-full",
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
Button.displayName = "Button";

export { Button, buttonVariants };
