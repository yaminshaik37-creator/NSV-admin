import { useField, useFormikContext } from "formik";
import clsx from "clsx";

const formClasses = "block w-full ic-input px-5 py-4";

const Input = (props) => {
  const { name, placeholder, label, styles, type = "text", onChange, disabled, required, rightText, textColor, formWidth = "w-full", ...rest } = props;
  const [field, meta] = useField(name);
  const { setFieldTouched, setFieldValue } = useFormikContext();


  const renderError = () => {
    return meta.error ? (
      <p className="text-red manrope-regular-xs mt-1">{meta.error}</p>
    ) : (
      <div className="mt-1" />
    );
  };

  const numberInputOnWheelPreventChange = (e) => e.target.blur();
  return (
    <div className={clsx("relative", formWidth)}>
      {type === "textarea" ? (
        <textarea
          rows={4}
          id={name + "-id"}
          name={name}
          {...field}
          disabled={disabled}
          autoComplete="off"
          onChange={(e) => {
            if (disabled) return;
            if (onChange) onChange(e);
            setFieldTouched(name, true);
            setFieldValue(name, e.target.value);
          }}
          className={clsx(formClasses, "manrope-medium-md text-dark-gray placeholder:text-placeholder placeholder:manrope-regular-md text-dark-gray", {
            "p-invalid": meta.touched && meta.error,
          })}
          {...rest}
        />
      ) : (
        <>
          <input
            disabled={disabled}
            id={name + "-id"}
            name={name}
            {...field}
            type={type ? type : "text"}
            autoComplete="off"
            onWheel={numberInputOnWheelPreventChange}
            step={"any"}
            onChange={(e) => {
              if (onChange) onChange(e);
              setFieldTouched(name, true);
              setFieldValue(name, e.target.value);
            }}
            className={clsx(formClasses, "manrope-medium-md text-dark-gray placeholder:text-placeholder placeholder:manrope-regular-md", styles, disabled ? "disabled" : "", { "p-invalid": meta.touched && meta.error, },)}
            {...rest}
          />
          {/* Right text/icon */}
          {rightText && (
            <div className={`absolute right-4 top-5 ${textColor || "text-primary"} manrope-medium-xs`}   >
              {rightText}
            </div>
          )}
        </>
      )}
      <label htmlFor={name + "-id"} className={`input-label manrope-medium-md text-gray bg-white px-2 ${(field.value || field.value === 0) && 'input-label-focused'}`}>
        {label}
        {required && <span className="text-light-gray">*</span>}
      </label>
      {renderError()}
    </div>
  );
};

export default Input;
