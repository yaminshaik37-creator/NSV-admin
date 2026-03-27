import React from 'react';

// EXTERNAL LIBRARY
import { useState } from 'react';
import { useField, useFormikContext } from 'formik';
import ReactAsyncSelect from 'react-select/async';
import clsx from "clsx";
import makeAnimated from "react-select/animated";

import CalendarIcon from "@/images/icons/CalendarIcon";
import DownArrow from "@/images/icons/DownArrow";
import DownArrowPurple from "@/images/icons/DownArrowPurpleIcon";
import IndiaFlag from "@/images/icons/IndiaFlag";

export const animatedComponents = makeAnimated();

const formClasses =
  "capitalize block rounded-md ic-input px-5 py-4 manrope-medium-md text-dark-gray !outline-none";

const AsyncSelect = (props) => {

  const {
    name,
    label,
    placeholder,
    onChange,
    options,
    containerStyle,
    inlineStyle,
    onInputChange,
    formClasses = "",
    disabled = false,
    styles,
    inputWidth,
    showLeftIcon = false,
    showRightIcon = true,
    rightIconType = "arrow", // 'arrow', 'calendar' or 'greenArrow' ---- pass any of this three for the rightIcon to be displayed {comment is for reference}
    leftIconType = "calendar", // 'calendar' or 'indiaFlag' ---- pass any of this two for the leftIcon to be displayed {comment is for reference}
    required,
    ...rest
  } = props;
  const [field, meta] = useField(name);
  const { setFieldTouched, setFieldValue, values } = useFormikContext();

  const renderError = () => {
    return meta.touched && meta.error ? (
      <p className="text-red manrope-regular-xs mt-1">{meta.error}</p>
    ) : (
      <div className="mt-1" />
    );
  };

  return (
    <>
      <div className={`relative ${containerStyle}`}>
        <ReactAsyncSelect
          isClearable={true}
          className={clsx(
            formClasses,
            styles,
            disabled ? "disabled" : "",
            inputWidth || "relative w-full bg-white",
            showLeftIcon ? "ps-6" : "",
            // showRightIcon ? "pe-10" : "pe-5",
            { "has-value": field.value },
            {
              "p-invalid": meta.touched && meta.error,
              "placeholder-style": !field.value,
            }
          )}
          id={name + '-id'}
          defaultOptions={options}
          onInputChange={(e) => {
            if (onInputChange) onInputChange(e)
          }}
          name={name}
          components={animatedComponents}
          {...field}
          onChange={(val) => {
            if (onChange) onChange({ target: { value: val?.value, name, label: val?.label, config: val?.config } });
            setFieldTouched(name, true);
            setFieldValue(name, val ? val : "");
          }}
      
          onMenuOpen={() => setFieldTouched(name, true)}
          placeholder={placeholder}
          {...rest}
        />
        <label
          htmlFor={name + '-id'}
          className={`input-label manrope-medium-md text-gray bg-white w-fit`}
        >
          {label}
          {required && <span className="text-light-gray">*</span>}
        </label>

        {/* Left Calendar Icon - conditionally rendered */}
        {showLeftIcon && (
          <div className="absolute left-3 top-1/4 pointer-events-none">
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
          </div>
        )}

        {/* Right Icon - conditionally rendered */}
        {/* {showRightIcon && (
          <div
            className={`absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none transition-transform duration-200 ${isOpen && rightIconType !== "calendar" ? "rotate-180" : ""
              }`}
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
        )} */}

      {renderError()}
      </div>
    </>
  );
}


export default AsyncSelect