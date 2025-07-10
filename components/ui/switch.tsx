import React, { forwardRef, ReactNode, useEffect, useRef } from "react";
import clsx from "clsx";

export interface SwitchProps {
  checked: boolean;
  onChange?: (value: boolean) => void;
  on?: () => void;
  off?: () => void;
  disabled?: boolean;

  label?: string;
  labelClassName?: string;
  switchClassName?: string;
  containerClassName?: string;
  size?: "sm" | "md" | "lg";

  error?: string;
  errorClassName?: string;
  helperText?: string;

  autoFocus?: boolean;
  fullWidth?: boolean;
  onFocus?: () => void;
  onBlur?: () => void;

  transitionDuration?: number;
  labelPosition?: "left" | "right";
}

const Switch = forwardRef<HTMLInputElement, SwitchProps>(
  ({
    checked,
    onChange,
    on,
    off,
    disabled = false,
    label,
    labelClassName = "",
    switchClassName = "",
    containerClassName = "",
    size = "md",
    error,
    errorClassName = "",
    helperText,
    autoFocus = false,
    fullWidth = false,
    onFocus,
    onBlur,
    transitionDuration = 0.3,
    labelPosition = "right"
  }: SwitchProps) => {
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
      if (autoFocus && inputRef.current) {
        inputRef.current.focus();
      }
    }, [autoFocus]);

    useEffect(() => {
      if (checked) on?.();
      else off?.();
    }, [checked]);

    const sizes = {
      sm: "w-[32px] h-[16px]",
      md: "w-[50px] h-[23px]",
      lg: "w-[52px] h-[28px]"
    };

    const thumbSizes = {
      sm: "w-[16px] h-[16px]",
      md: "w-[23px] h-[23px]",
      lg: "w-[28px] h-[28px]"
    };

    const thumbWidths = {
      sm: 15,
      md: 22,
      lg: 27
    };

    return (
      <div
        className={clsx("flex flex-col", containerClassName, {
          "w-full": fullWidth
        })}
      >
        <label className="flex items-center gap-2 cursor-pointer select-none">
          {label && labelPosition === "left" && (
            <span className={labelClassName}>{label}</span>
          )}
          <div
            className={clsx(
              "relative rounded-full transition-colors duration-300",
              sizes[size],
              switchClassName,
              {
                "bg-primary-100": checked,
                "bg-light-300": !checked,
                "opacity-50 cursor-not-allowed": disabled
              }
            )}
            style={{
              transitionDuration: `${transitionDuration}s`
            }}
            onClick={() => {
              if (!disabled) {
                onChange?.(!checked);
              }
            }}
          >
            <div
              className={clsx(
                "absolute top-[50%] translate-y-[-50%] bg-white rounded-full shadow-md transition-all ease-in-out flex items-center justify-center",
                thumbSizes[size]
              )}
              style={{
                left: checked ? `calc(100% - ${thumbWidths[size]}px)` : "",
                transitionDuration: `${transitionDuration}s`
              }}
            ></div>
          </div>
          {label && labelPosition === "right" && (
            <span className={labelClassName}>{label}</span>
          )}
        </label>

        {helperText && (
          <span className="text-xs text-gray-500 mt-1">{helperText}</span>
        )}
        {error && (
          <span className={clsx("text-sm text-red-500 mt-1", errorClassName)}>
            {error}
          </span>
        )}
      </div>
    );
  }
);

export default Switch;
