import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/util";

const inputVariants = cva(
  "flex w-full rounded-md border border-input bg-transparent text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      size: {
        sm: "h-8 px-2 py-1 text-xs",
        md: "h-9 px-3 py-2 text-sm",
        lg: "h-10 px-4 py-2 text-base"
      },
      hasIcon: {
        left: "pl-10",
        right: "pr-10"
      }
    },
    defaultVariants: {
      size: "md"
    }
  }
);

export interface TextInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size">,
    VariantProps<typeof inputVariants> {
  label?: string;
  description?: string;
  error?: string;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
  fullWidth?: boolean;
  containerClassName?: string;
  inputClassName?: string;
  labelClassName?: string;
  descriptionClassName?: string;
  errorClassName?: string;
  iconClassName?: string;
}

const TextInput = React.forwardRef<HTMLInputElement, TextInputProps>(
  (
    {
      className,
      size,
      label,
      description,
      error,
      icon,
      iconPosition = "left",
      fullWidth = false,
      containerClassName,
      inputClassName,
      labelClassName,
      descriptionClassName,
      errorClassName,
      iconClassName,
      ...props
    },
    ref
  ) => {
    const hasIcon = icon ? iconPosition : undefined;

    return (
      <div
        className={cn(
          "flex flex-col gap-1",
          fullWidth && "w-full",
          containerClassName
        )}
      >
        {label && (
          <label
            htmlFor={props.id}
            className={cn(
              "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
              labelClassName
            )}
          >
            {label}
            {props.required && (
              <span className="text-destructive text-primary-100"> *</span>
            )}
          </label>
        )}

        <div className="relative">
          {icon && iconPosition === "left" && (
            <div
              className={cn(
                "absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground",
                iconClassName
              )}
            >
              {icon}
            </div>
          )}

          <input
            className={cn(
              inputVariants({ size, hasIcon, className: inputClassName }),
              className
            )}
            ref={ref}
            {...props}
          />

          {icon && iconPosition === "right" && (
            <div
              className={cn(
                "absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground",
                iconClassName
              )}
            >
              {icon}
            </div>
          )}
        </div>

        {description && !error && (
          <p
            className={cn(
              "text-sm text-muted-foreground",
              descriptionClassName
            )}
          >
            {description}
          </p>
        )}

        {error && (
          <p
            className={cn(
              "text-sm font-medium text-destructive",
              errorClassName
            )}
          >
            {error}
          </p>
        )}
      </div>
    );
  }
);

TextInput.displayName = "TextInput";

export { TextInput, inputVariants };
