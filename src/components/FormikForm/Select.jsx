// EXTERNAL LIBRARY
import { useState } from "react";
import { useField, useFormikContext } from "formik";
import clsx from "clsx";
import CalendarIcon from "@/images/icons/CalendarIcon";
import DownArrow from "@/images/icons/DownArrow";
import DownArrowPurple from "@/images/icons/DownArrowPurpleIcon";
import IndiaFlag from "@/images/icons/IndiaFlag";


const Select = (props) => {
  const { name, placeholder, label, onChange, options, disabled = false, required, styles, showLeftIcon = false, showRightIcon = true, rightIconType = "arrow", leftIconType = "calendar", inputWidth, containerStyle = "", icInput = true, ...rest } = props;
  const [field, meta] = useField(name);
  const [isFocused, setIsFocused] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const { setFieldTouched, setFieldValue } = useFormikContext();
  
  const showLabel = Boolean(isFocused || field.value);
  
  const formClasses = `capitalize block rounded-md ${icInput ? "ic-input px-5 py-3.5" : "focus:outline-[#652fcf] py-2"}  manrope-medium-md text-dark-gray`;

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
          className={`absolute z-100 left-4 -top-2 mb-2 px-2 block manrope-regular-sm text-gray bg-white w-fit`}
        >
          {label}
          {required && <span className="text-light-gray">*</span>}
        </label>
      )}
      <div className="relative">
        <select disabled={disabled} id={name + "-id"} name={name} {...field} placeholder={!showLabel ? placeholder : ""}
          onChange={(e) => {
            if (onChange) onChange(e);
            setFieldTouched(name, true);
            setFieldValue(name, e.target.value);
          }}
          onFocus={() => {
            setIsFocused(true);
            setIsOpen(true);
          }}
          onBlur={(e) => {
            if (e.target.value) {
              setIsFocused(true);
            } else {
              setIsFocused(false);
            }
            setIsOpen(false);
            field.onBlur(e);
          }}
          className={clsx(formClasses, styles, disabled ? "disabled" : "", showLeftIcon ? "ps-10" : "ps-5", showRightIcon ? "pe-10" : "pe-5", "appearance-none", inputWidth || "w-full", { "p-invalid": meta.touched && meta.error, "placeholder-style": !field.value, })}
          {...rest}
        >
          {options?.map((curr, idx) => (
            <option key={curr.value} value={curr.value} className="manrope-medium-md text-dark-gray text-left" >
              {curr.label}
            </option>
          ))}
        </select>
        {showLeftIcon && (
          <div className="flex items-center gap-4 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none">
            {(() => {
              switch (leftIconType) {
                case "calendar":
                  return <CalendarIcon />;
                case "indiaFlag":
                  return <IndiaFlag />;
                default:
                  return null;
              }
            })()}
            {leftIconType == "indiaFlag" && 91}
          </div>
        )}

        {showRightIcon && (
          <div
            className={`absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none transition-transform duration-200`}
          >
            {(() => {
              switch (rightIconType) {
                case "calendar":
                  return <CalendarIcon fill="#652FCF" />;
                case "greenArrow":
                  return <DownArrow />;

                case "arrow":
                default:
                  return <DownArrowPurple />;
              }
            })()}
          </div>
        )}
      </div>

      {renderError()}
    </div>
  );
};
export default Select;
