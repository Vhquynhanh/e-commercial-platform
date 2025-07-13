import { useEffect, useMemo, useRef, useState } from "react";
import { ChevronDown, Loader2, X, Check } from "lucide-react";

export interface Option<
  T extends string | number | boolean = string | number | boolean
> {
  label: string;
  value: T;
}

interface SelectInputProps<
  T extends string | number | boolean = string | number | boolean
> {
  name?: string;
  label?: string;
  value?: T | T[];
  onChange?: (value: Option<T> | null | Option<T>[]) => void;
  options: Option<T>[];
  placeholder?: string;
  disabled?: boolean;
  required?: boolean;
  readOnly?: boolean;
  filterable?: boolean;
  strict?: boolean;
  matchFromStart?: boolean;
  noOptionsMessage?: string;
  description?: string;
  error?: string;
  fullWidth?: boolean;
  icon?: React.ReactNode;
  arrow?: boolean;
  clearable?: boolean;
  noArrow?: boolean;
  className?: string;
  inputClassName?: string;
  dropdownClassName?: string;
  errorClassName?: string;
  labelClassName?: string;
  dropdownPosition?: "top" | "bottom";
  id?: string;
  isLoading?: boolean;
  loadingMessage?: string;
  size?: "sm" | "md" | "lg";
  isMulti?: boolean; // New prop to enable multi-select
  maxSelectedDisplay?: number; // For multi-select
  showCheckbox?: boolean; // For multi-select
}

export function SelectInput<
  T extends string | number | boolean = string | number | boolean
>(props: SelectInputProps<T>) {
  const ALL_VALUE = "" as T; // cast sang T để không lỗi generic
  const {
    name,
    label,
    value,
    onChange,
    options,
    placeholder = "Select",
    disabled = false,
    required = false,
    readOnly = false,
    filterable = false,
    strict = true,
    matchFromStart = false,
    noOptionsMessage = "No results found",
    description,
    error,
    fullWidth = false,
    icon,
    arrow = true,
    noArrow = false,
    clearable = false,
    className = "",
    inputClassName = "",
    dropdownClassName = "",
    errorClassName = "text-red-500 text-sm",
    labelClassName = "text-sm font-medium text-dark900_light100",
    dropdownPosition = "bottom",
    id,
    isLoading = false,
    loadingMessage = "Loading...",
    size = "md",
    isMulti = false,
    maxSelectedDisplay = 2,
    showCheckbox = true
  } = props;
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const inputRef = useRef<HTMLDivElement>(null);

  // Handle both single and multi values
  const selectedValues = useMemo(() => {
    if (isMulti) {
      return Array.isArray(value) ? value : [];
    }
    return value !== undefined && value !== null ? [value] : [];
  }, [value, isMulti]);

  const selectedOptions = useMemo(
    () => options.filter((opt) => selectedValues.includes(opt.value)),
    [selectedValues, options]
  );

  const singleSelected = useMemo(
    () =>
      !isMulti ? options.find((opt) => opt.value === value) || null : null,
    [value, options, isMulti]
  );

  const filteredOptions = useMemo(() => {
    if (!filterable || !search) return options;
    return options.filter((opt) =>
      matchFromStart
        ? opt.label.toLowerCase().startsWith(search.toLowerCase())
        : opt.label.toLowerCase().includes(search.toLowerCase())
    );
  }, [options, search, filterable, matchFromStart]);

  const handleSelect = (opt: Option<T>) => {
    if (readOnly) return;

    if (isMulti) {
      const currentValues = Array.isArray(value) ? (value as T[]) : [];

      const isAllOption = opt.value === ALL_VALUE;

      let newSelectedOptions: Option<T>[];

      if (isAllOption) {
        // Chọn "Tất cả" ⇒ clear hết và KHÔNG lưu "" trong state
        newSelectedOptions = [];
      } else {
        // Bỏ "Tất cả" khỏi danh sách hiện hành (nếu đang có)
        const withoutAll = selectedOptions.filter((o) => o.value !== ALL_VALUE);

        if (currentValues.includes(opt.value)) {
          // Đang chọn → bỏ chọn
          newSelectedOptions = withoutAll.filter((o) => o.value !== opt.value);
        } else {
          // Chưa chọn → thêm
          newSelectedOptions = [...withoutAll, opt];
        }
      }

      onChange?.(newSelectedOptions);
    } else {
      onChange?.(opt);
      setOpen(false);
    }

    setSearch("");
  };

  const handleRemoveTag = (
    valueToRemove: string | number | boolean,
    e: React.MouseEvent
  ) => {
    e.stopPropagation();
    if (!isMulti) return;

    const newSelectedOptions = selectedOptions.filter(
      (opt) => opt.value !== valueToRemove
    );
    onChange?.(newSelectedOptions);
  };

  const handleClear = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();

    if (isMulti) {
      onChange?.([]);
    } else {
      onChange?.(null);
    }
    setSearch("");
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
        setSearch("");
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const getSizeClasses = () => {
    switch (size) {
      case "sm":
        return isMulti ? "min-h-8 px-2 py-1 text-xs" : "h-8 px-2 py-1 text-xs";
      case "lg":
        return isMulti
          ? "min-h-10 px-4 py-2 text-base"
          : "h-10 px-4 py-2 text-base";
      default:
        return isMulti ? "min-h-9 px-3 py-2 text-sm" : "h-9 px-3 py-2 text-sm";
    }
  };

  const getTagSize = () => {
    switch (size) {
      case "sm":
        return "px-1.5 py-0.5 text-xs";
      case "lg":
        return "px-2.5 py-1 text-sm";
      default:
        return "px-2 py-0.5 text-xs";
    }
  };

  const renderSelectedTags = () => {
    if (!isMulti || selectedOptions.length === 0) return null;

    const displayedOptions = selectedOptions.slice(0, maxSelectedDisplay);
    const remainingCount = selectedOptions.length - maxSelectedDisplay;

    return (
      <div className="flex flex-wrap gap-1">
        {displayedOptions.map((opt) => (
          <span
            key={String(opt.value)}
            className={`inline-flex items-center gap-1 bg-blue-100 text-blue-800 rounded-md ${getTagSize()}`}
          >
            {opt.label}
            {!readOnly && (
              <X
                className="w-3 h-3 cursor-pointer hover:text-blue-600"
                onClick={(e) => handleRemoveTag(opt.value, e)}
              />
            )}
          </span>
        ))}
        {remainingCount > 0 && (
          <span
            className={`inline-flex items-center background-light150_dark600 text-dark600_light200 rounded-md ${getTagSize()}`}
          >
            +{remainingCount} more
          </span>
        )}
      </div>
    );
  };

  const renderSingleValue = () => {
    if (isMulti) return null;

    return (
      <input
        id={id}
        name={name}
        className="bg-transparent outline-none text-sm text-dark900_light100 placeholder:text-gray-400 w-full"
        placeholder={placeholder}
        disabled={disabled || !filterable || readOnly}
        value={
          filterable && open
            ? search
            : singleSelected
            ? singleSelected.label
            : ""
        }
        onChange={(e) => {
          if (!filterable) return;
          setSearch(e.target.value);
        }}
        readOnly={!filterable}
      />
    );
  };

  const hasValue = isMulti
    ? selectedOptions.length > 0
    : singleSelected !== null;

  return (
    <div
      className={`${
        fullWidth ? "w-full" : ""
      } flex flex-col gap-1 ${className}`}
    >
      {label && (
        <label
          htmlFor={id}
          className={`text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ${labelClassName}`}
        >
          {label} {required && <span className="text-primary-500">*</span>}
        </label>
      )}
      <div ref={inputRef} className="relative">
        <div
          className={`relative flex items-center justify-between border rounded-md border-light300_dark700 cursor-pointer ${getSizeClasses()} ${
            disabled ? "opacity-50 cursor-not-allowed" : ""
          } ${inputClassName}`}
          onClick={() => !disabled && !readOnly && setOpen((prev) => !prev)}
        >
          <div className="flex items-center gap-2 flex-1 min-w-0">
            {icon && <div className="flex-shrink-0">{icon}</div>}

            <div className="flex-1 min-w-0">
              {isMulti ? (
                selectedOptions.length > 0 ? (
                  renderSelectedTags()
                ) : (
                  <input
                    id={id}
                    name={name}
                    className="bg-transparent outline-none text-sm text-dark900_light100 w-full"
                    placeholder={placeholder}
                    disabled={disabled || !filterable || readOnly}
                    value={filterable && open ? search : ""}
                    onChange={(e) => {
                      if (!filterable) return;
                      setSearch(e.target.value);
                    }}
                    readOnly={!filterable}
                  />
                )
              ) : (
                renderSingleValue()
              )}
            </div>
          </div>

          <div className="flex items-center gap-1 flex-shrink-0">
            {(clearable || isMulti) && hasValue && (
              <X
                className="w-4 h-4 text-dark600_light300 hover:text-red-500 cursor-pointer"
                onClick={handleClear}
              />
            )}
            {!noArrow && arrow && (
              <ChevronDown
                className={`w-4 h-4 text-dark600_light300 transition-transform ${
                  open ? "rotate-180" : ""
                }`}
              />
            )}
          </div>
        </div>

        {open && (
          <ul
            className={`absolute z-20 mt-1 max-h-56 w-full overflow-y-auto border border-light300_dark700 rounded-md background-light100_dark100 shadow-md ${dropdownClassName} ${
              dropdownPosition === "top" ? "bottom-full mb-2" : "top-full"
            }`}
          >
            {filterable && (
              <li className="p-2 border-b border-light300_dark700">
                <input
                  className="w-full px-2 py-1 text-sm rounded outline-none focus:ring-1 focus:ring-blue-500 background-light100_dark100 text-dark900_light100"
                  placeholder="Search..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  onClick={(e) => e.stopPropagation()}
                />
              </li>
            )}

            {isLoading ? (
              <li className="p-2 text-center text-dark900_light100">
                <Loader2 className="w-4 h-4 animate-spin inline mr-2" />
                {loadingMessage}
              </li>
            ) : filteredOptions.length > 0 ? (
              filteredOptions.map((opt) => {
                const isSelected =
                  selectedValues.length === 0
                    ? opt.value === ALL_VALUE
                    : selectedValues.includes(opt.value);

                return (
                  <li
                    key={String(opt.value)}
                    onClick={() => handleSelect(opt)}
                    className={`px-3 py-2 text-sm cursor-pointer hover:background-light150_dark800 text-dark900_light100 ${
                      isMulti ? "flex items-center gap-2" : ""
                    }`}
                  >
                    {isMulti && showCheckbox && (
                      <div
                        className={`w-4 h-4 rounded flex items-center justify-center ${
                          isSelected
                            ? "bg-primary-700 text-dark900_light100"
                            : "border-light300_dark700 border"
                        }`}
                      >
                        {isSelected && <Check className="w-3 h-3 text-white" />}
                      </div>
                    )}
                    {opt.label}
                  </li>
                );
              })
            ) : (
              <li className="p-2 text-center text-light500_light200">
                {noOptionsMessage}
              </li>
            )}
          </ul>
        )}
      </div>
      {description && (
        <p className="text-xs text-light500_light200">{description}</p>
      )}
      {error && <p className={`${errorClassName}`}>{error}</p>}
    </div>
  );
}
