import { useState } from "react";

import ReactDatePicker from "react-datepicker";
import { useField, useFormikContext } from "formik";
import { range } from "lodash";
import clsx from "clsx";

import { formatTime, isNthWeekday } from "@/utils/helper";
import CalendarIcon from "@/images/icons/CalendarIcon";
import DownArrow from "@/images/icons/DownArrow";
import DownArrowPurple from "@/images/icons/DownArrowPurpleIcon";

const years = range(1950, 2051);
const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December",];

const DatePicker = (props) => {

  const { excludeDates = [], disableRules = [], required, name, label, disabled, interval, dateFormat, onChange, timeOnly, minTime, maxTime, showCalendarIcon = true, showRightIcon = true, rightIconType = "arrow", inputWidth, formWidth, calendarFill, ...rest } = props;

  const [field, meta] = useField(name);
  const { setFieldTouched, setFieldValue } = useFormikContext();
  const [isFocused, setIsFocused] = useState(false);

  const showLabel = isFocused || (field.value);

  const renderError = () => {
    return meta.touched && meta.error ? (
      <p className="text-red manrope-regular-xs mt-1">{meta.error}</p>
    ) : (
      <div className="mt-1" />
    );
  };

  // Conditionally include time-only props
  const timeOnlyProps = timeOnly
    ? {
      showTimeSelect: true,
      showTimeSelectOnly: true,
      timeIntervals: interval || 30,
      timeFormat: "hh:mm aa",
      dateFormat: dateFormat || "hh:mm aa",
      minTime: minTime,
      maxTime: maxTime,
    }
    : {
      dateFormat: dateFormat || "dd/MM/yyyy",
    };

  return (
    <div className={clsx("relative", formWidth)}>
      {showLabel && (
        <label
          htmlFor={`${name}-id`}
          className={`absolute left-4 -top-2 mb-2 manrope-medium-md text-gray block  bg-white px-2 z-100`}
        >
          {label}
          {required && <span className="text-light-gray">*</span>}
        </label>
      )}

      <ReactDatePicker
        placeholderText={!showLabel ? required ? `${label}*` : label : ""}
        minDate={new Date()}
        excludeDates={excludeDates}
        filterDate={(date) => {
          if (Array.isArray(disableRules) && disableRules.length > 0) {
            for (const rule of disableRules) {
              if (isNthWeekday(date, rule.weekday, rule.nth)) {
                return false;
              }
            }
            return true;
          } else {
            return true
          }

        }}
        renderCustomHeader={({
          date,
          changeYear,
          changeMonth,
          decreaseMonth,
          increaseMonth,
          prevMonthButtonDisabled,
          nextMonthButtonDisabled,
        }) =>
          !timeOnly ? (
            <div className="m-2 flex justify-between">
              <button
                type="button"
                onClick={decreaseMonth}
                disabled={prevMonthButtonDisabled}
              >
                {"<"}
              </button>
              <select
                value={formatTime(date, "YYYY")}
                onChange={({ target: { value } }) => changeYear(value)}
              >
                {years.map((yr) => (
                  <option key={yr} value={yr}>
                    {yr}
                  </option>
                ))}
              </select>

              <select
                value={months[formatTime(date, "M") - 1]}
                onChange={({ target: { value } }) =>
                  changeMonth(months.indexOf(value))
                }
              >
                {months.map((mo) => (
                  <option key={mo} value={mo}>
                    {mo}
                  </option>
                ))}
              </select>
              <button
                type="button"
                onClick={increaseMonth}
                disabled={nextMonthButtonDisabled}
              >
                {">"}
              </button>
            </div>
          ) : (
            <></>
          )
        }
        selected={field.value}
        onChange={(date) => {
          if (onChange) onChange(date);
          setFieldTouched(name, true);
          setFieldValue(name, date);
        }}
        onFocus={() => setIsFocused(true)}
        onBlur={(e) => {
          if (e.target.value) {
            setIsFocused(true);
          } else {
            setIsFocused(false);
          }
          field.onBlur(e);
        }}
        className={`ic-input rounded-sm ${showCalendarIcon ? "ps-10" : "ps-4"
          } ${showRightIcon ? "pe-10" : "pe-4"} py-3 text-placeholder manrope-regular-md ${inputWidth || "w-full"
          } placeholder:text-placeholder placeholder:manrope-regular-md`}
        disabled={disabled}
        autoComplete="off"
        {...rest}
        {...timeOnlyProps}
      />

      {/* Left Calendar Icon */}
      {showCalendarIcon && (
        <div className="absolute left-3 top-1/2 -translate-y-1/2">
          <CalendarIcon />
        </div>
      )}

      {/* Right Icon */}
      {showRightIcon && (
        <div className="absolute right-3 top-1/2 -translate-y-1/2">
          {rightIconType === "calendar" ? (
            <CalendarIcon fill={calendarFill} />
          ) : (
            <DownArrowPurple />
          )}
        </div>
      )}

      {renderError()}
    </div>
  );
};

export default DatePicker;
