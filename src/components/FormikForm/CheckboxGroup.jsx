import React from 'react';

// EXTERNAL LIBRARY
import { useField, useFormikContext } from 'formik';

const CheckboxGroup = (props) => {

  const { name, label, onChange, options, ...rest } = props;
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
    <div>
      {
        label && <label
          htmlFor={name + '-id'}

        >
          {label}
        </label>
      }
      <div className='flex flex-wrap'>
        {options.map((option, index) => {
          return (
            <div key={option.value + '-key-' + index}>
              <input
                id={option.value + '-id'}

                {...field}
                value={option.value}
                checked={field.value.includes(option.value)}
                type={"checkbox"}
                onChange={(e) => {
                  if (onChange)
                    onChange(e);
                  setFieldTouched(name, true);
                  if (e.target.checked) {
                    let arr = (field.value || []);
                    arr.push(e.target.value);
                    setFieldValue(name, arr);
                  } else {
                    setFieldValue(name, (field.value || []).filter(val => val != e.target.value));
                  }
                }}
                {...rest}
              />
              <label htmlFor={option.value + '-id'} className=''>{option.label}</label>
            </div>)
        })}
      </div>
      {renderError()}
    </div>
  )
}

export default CheckboxGroup