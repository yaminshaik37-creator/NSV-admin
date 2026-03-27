import React from 'react';

// EXTERNAL LIBRARY
import { useField, useFormikContext } from 'formik';
import ReactAsyncSelect from 'react-select/async';

import makeAnimated from "react-select/animated";
import { components } from 'react-select';
export const animatedComponents = makeAnimated();

const AsyncSelect = (props) => {

  const { name, label, onChange, options, containerStyle, inlineStyle, onInputChange, ...rest } = props;
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
    <div className={containerStyle ? containerStyle : ""} style={inlineStyle}>
      {
        label && <label
          htmlFor={name + '-id'}
          className="mb-1 block text-sm font-medium text-gray-700"
        >
          {label}
        </label>
      }

      <ReactAsyncSelect
        id={name + '-id'}
        components={{ MenuList: SelectMenuButton }}
        className='mb-3'
        onInputChange={(e) => {
          if (onInputChange) onInputChange(e)
        }}
        name={name}
        // components={animatedComponents}
        {...field}
        onChange={(val) => {
          if (onChange)
            onChange({ target: { value: val.value, name, label: val.label, config: val.config } });
          setFieldTouched(name, true);
          setFieldValue(name, val ? val : []);
        }}
        onMenuOpen={() => {
          setFieldTouched(name, true);
        }}
        {...rest}
      />
      {renderError()}
    </div>
  );
}
const SelectMenuButton = (props) => {
  return (
    <components.MenuList  {...props}>
      {props.children}
      <button onClick={() => addnewOption()} className='flex w-full justify-center items-center font-semibold text-indigo-600 hover:text-indigo-500'>Load More</button>
    </components.MenuList >
  )
}

export default AsyncSelect