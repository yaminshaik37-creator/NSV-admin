// EXTERNAL LIBRARY
import { useField, useFormikContext } from "formik";
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import { convertTo24Hr } from "@/utils/helper";
import { useState } from "react";
import TimeIcon from "@/images/icons/TimeIcon";

const TimePickerForm = (props) => {
  const { name, label, onChange, required, placeholder, showTimeIcon = false, TimeIconFill, } = props;
  const [field, meta] = useField(name);
  const { setFieldTouched, setFieldValue } = useFormikContext();

  const renderError = () => {
    return meta.touched && meta.error ? (
      <p className="text-red manrope-regular-xs mt-1">{meta.error}</p>
    ) : (
      <div className="mt-1" />
    );
  };

  return (
    <div className="relative">

      <Flatpickr
        value={field.value}
        name={name}
        id={name + "-id"}
        onChange={(selectedDates, dateStr, instance) => {
          if (onChange) onChange(dateStr);
          setFieldTouched(name, true);
          setFieldValue(name, convertTo24Hr(dateStr));
        }}
        options={{
          closeOnSelect: false,
          enableTime: true,
          noCalendar: true,
          dateFormat: "h:i K",
          time_24hr: false,
          allowInput: false,
          disableMobile: true,
          clickOpens: true,
          onClose: (selectedDates, dateStr, instance) => {
            if (!dateStr || dateStr.trim() === "" || selectedDates.length === 0) {
              setFieldValue(name, "");
            }
          },
        }}
        className={`w-full border border-gray-300 rounded-lg ic-input p-4 manrope-medium-md text-dark-gray flatpickr-custom-time-icon ${field.value ? "has-value" : ""}`}
      />
      <label
        htmlFor={name + "-id"}
        className={`input-label manrope-medium-md text-gray bg-white px-2`}
      >
        {label}
        {required && <span className="text-light-gray">*</span>}
      </label>
      {showTimeIcon && (
        <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
          <TimeIcon fill={TimeIconFill} />
        </div>
      )}

      {renderError()}
    </div>
  );
};
export default TimePickerForm;
