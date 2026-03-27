// Create: src/components/FormikForm/MultiSelectWithCheckboxes.jsx
import { useState } from "react";
import { useField, useFormikContext } from "formik";
import clsx from "clsx";
import DownArrowPurple from "@/images/icons/DownArrowPurpleIcon";

const formClasses = "block w-full ic-input px-5 py-4";

const MultiSelectWithCheckboxes = (props) => {
  const { name, placeholder, label, onChange, options = [], disabled = false, required, styles, inputWidth, containerStyle, groupTitles = [], showRightIcon = true, showDuration = false, showCost = false, ...rest } = props;

  const [field, meta] = useField(name);
  const [isFocused, setIsFocused] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const { setFieldTouched, setFieldValue } = useFormikContext();

  const selectedValues = field.value || [];
  const showLabel =
    (isFocused || isOpen) && selectedValues.length === 0
      ? true
      : selectedValues.length > 0;

  const handleCheckboxChange = (optionValue, isChecked) => {
    const newValues = isChecked
      ? [...selectedValues, optionValue]
      : selectedValues.filter((val) => val !== optionValue);

    setFieldTouched(name, true);
    setFieldValue(name, newValues);

    if (newValues.length === 0) {
      setIsFocused(isOpen);
    } else {
      setIsFocused(true);
    }

    if (onChange) {
      onChange({ target: { name, value: newValues } });
    }
  };

  const getDisplayText = () => {
    if (selectedValues.length === 0) return "";
    if (selectedValues.length === 1) {
      const option = options.find((opt) => opt.value === selectedValues[0]);
      return option ? option.label : selectedValues[0];
    }
    return `${selectedValues.length} selected`;
  };

  const renderError = () => {
    return meta.touched && meta.error ? (
      <p className="text-red manrope-regular-xs mt-1">{meta.error}</p>
    ) : (
      <div className="mt-1" />
    );
  };

  return (
    <div className={`relative ${containerStyle}`}>
      {showLabel && (
        <label
          htmlFor={name + "-id"}
          className={`absolute z-10 left-4 -top-2 mb-2 block manrope-regular-sm text-gray bg-white px-2`}
        >
          {label}
          {required && <span className="text-light-gray">*</span>}
        </label>
      )}

      <div className="relative">
        <div
          id={name + "-id"}
          tabIndex={0}
          placeholder={label}
          onClick={() => {
            if (!disabled) {
              setIsOpen(!isOpen);
              setIsFocused(true);
            }
          }}
          onFocus={() => setIsFocused(true)}
          onBlur={() => {
            setIsOpen(false);
            if (selectedValues.length === 0) setIsFocused(false);
          }}
          className={clsx(
            formClasses,
            styles,
            disabled ? "disabled cursor-not-allowed" : "cursor-pointer",
            "appearance-none pr-10 rounded-md border border-gray-300",
            inputWidth || "w-full",
            "flex items-center justify-between placeholder:manrope-regular-md",
            {
              "border-[#4C239C]": isOpen,
              "border-red-500": meta.touched && meta.error,
              "placeholder-style": selectedValues.length === 0,
            }
          )}
          {...rest}
        >
          <span
            className={`manrope-medium-md ${selectedValues.length === 0 ? "text-placeholder" : "text-gray"
              }`}
          >
            {selectedValues.length === 0
              ? !isFocused && !isOpen
                ? placeholder || label
                : "\u00A0"
              : getDisplayText()}
          </span>
        </div>

        {showRightIcon && (
          <div
            className={`absolute right-3 top-5 pointer-events-none transition-transform ${isOpen ? "rotate-180" : ""
              }`}
          >
            <DownArrowPurple />
          </div>
        )}

        {isOpen && (
          <div
            className="bg-white border border-[#DFE2E2] rounded-lg mt-2 p-4 overflow-y-scroll max-h-90"
            onMouseDown={(e) => e.preventDefault()}
          >
            <div>
              {options.map((option, idx) => {
                const isChecked = selectedValues.includes(option.value);
                const checkboxId = `${name}-${option.value}-${idx}`;
                const groupTitleObj = groupTitles.find((g) => g.index === idx);
                return (
                  <div key={idx}>
                    {/* Title for the option group -- comment for reference */}
                    {groupTitleObj && (
                      <div
                        className={`py-2 px-3 manrope-medium-xs text-dark-gray bg-[#EFF0F0] rounded-md mb-2 ${idx !== 0 ? "mt-6" : ""
                          }`}
                      >
                        {groupTitleObj.title}
                      </div>
                    )}
                    <div onClick={() => handleCheckboxChange(option.value, !isChecked)} className={`flex justify-between items-center p-3 hover:bg-gray-50 rounded-md cursor-pointer ${isChecked ? "bg-[#F7F5FD]" : ""}`}>
                      <div className="flex gap-2 items-center">
                        <input
                          id={checkboxId}
                          type="checkbox"
                          className="custom-checkbox"
                          checked={isChecked}
                        // onChange={(e) =>
                        //   handleCheckboxChange(option.value, e.target.checked)
                        // }
                        />
                        <div className="flex flex-col gap-2">
                          <label
                            htmlFor={checkboxId}
                            className={`cursor-pointer capitalize manrope-medium-md ${isChecked ? "text-primary" : "text-dark-gray"
                              }`}
                            onClick={(e) => e.preventDefault()}
                          >
                            {option.label}
                          </label>
                          {/* Duration below label - comment for reference */}
                          {showDuration && option.duration && (
                            <span className={`manrope-regular-xs ${isChecked ? "text-primary" : "text-light-gray"}`}>
                              {option.duration}
                            </span>
                          )}
                        </div>
                      </div>
                      {/* Cost to the right - comment for reference */}
                      {showCost && option.cost && (
                        <span className={`manrope-bold-sm ${isChecked ? "text-primary" : "text-dark-gray"}`}>
                          ₹{option.cost}
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {renderError()}
    </div>
  );
};

export default MultiSelectWithCheckboxes;
