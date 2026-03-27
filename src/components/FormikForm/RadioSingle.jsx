import { useField, useFormikContext } from 'formik';
import { useState } from 'react';

const RadioSingle = (props) => {

  const { name, onChange, className, value, label, ...rest } = props;
  const [field, meta] = useField(name);
  const [isFocused, setIsFocused] = useState(false);
  const { setFieldTouched, setFieldValue } = useFormikContext();

  const isChecked = field.value === value;

  const handleClick = () => {
    setFieldTouched(name, true);
    setFieldValue(name, value);
  };

  const renderError = () => {
    return meta.touched && meta.error ? (
      <p className="text-red manrope-regular-xs mt-1">{meta.error}</p>
    ) : (
      <div className="mt-1" />
    );
  };

  return (
    <div className={`${className}`}>
      <div className="flex gap-2 items-center cursor-pointer" onClick={handleClick}>
        <div className="relative">
          <input
            id={`${name}-${value}`}
            name={name}
            type="radio"
            value={value}
            checked={isChecked}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            className="sr-only"
            {...rest}
          />

          <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all duration-200 ${isChecked
            ? 'border-[#4C239C] bg-white'
            : isFocused
              ? 'border-[#8459D9] bg-white'
              : 'border-[#DFE2E2] bg-white hover:border-[#C1ACEC]'
            } ${isFocused ? 'ring-2 ring-[#E0D5F5] ring-opacity-50' : ''
            }`}>
            <div className={`w-2.5 h-2.5 rounded-full ${isChecked ? 'bg-[#4C239C]' : 'bg-transparent border border-[#DFE2E2]'} transition-all duration-200`}></div>
          </div>
        </div>

        <label
          className={`manrope-regular-sm leading-7 cursor-pointer transition-colors duration-200 whitespace-nowrap ${isChecked
            ? 'text-active'
            : isFocused
              ? 'text-dark-gray'
              : 'text-[#525D5E] hover:text-dark-gray'
            }`}
          htmlFor={`${name}-${value}`}
        >
          {label || rest.label}
        </label>
      </div>
      {renderError()}
    </div>
  )
}

export default RadioSingle;
