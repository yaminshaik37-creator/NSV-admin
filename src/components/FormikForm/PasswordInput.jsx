import { useField, useFormikContext } from 'formik';
import clsx from 'clsx'
import { useState } from 'react';
import { EyeClosed, EyeOpen } from '@/config/icons';


const formClasses = 'block w-full ic-input px-5 py-4'


const PasswordInput = (props) => {

    const [togglePassword, setTogglePassword] = useState(false)
    const { name, placeholder, inlineStyle, label, type = "text", onChange, disabled = false, required, ...rest } = props;
    const [field, meta] = useField(name);
    const [isFocused, setIsFocused] = useState(false);

    const showLabel = isFocused || (field.value !== undefined && field.value !== null && field.value !== '');

    const { setFieldTouched, setFieldValue } = useFormikContext();
    const renderError = () => {
        return meta.touched && meta.error ? (
            <p className="text-red manrope-regular-xs mt-1">{meta.error}</p>
        ) : (
            <div className="mt-1" />
        );
    };

    return (
        <div className='relative mb-3' style={inlineStyle}>
            {
                showLabel &&
                <label
                    htmlFor={name + '-id'}
                    className={`absolute z-100 left-4 -top-2 mb-2 block text-sm font-medium ${isFocused && (field.value === undefined || field.value === null || field.value === '')
                        ? 'text-light-gray'
                        : 'text-active'
                        } bg-white px-2`}>

                    {label}
                    {required && <span className="text-gray-700"> *</span>}
                </label>
            }
            <div className='relative'>
                <input
                    disabled={disabled}
                    id={name + '-id'}
                    name={name}
                    {...field}
                    type={togglePassword ? "text" : "password"}
                    autoComplete="off"
                    onChange={(e) => {
                        if (onChange) onChange(e);
                        setFieldTouched(name, true);
                        setFieldValue(name, e.target.value);
                    }}
                    className={clsx(formClasses, "text-base placeholder:text-dark-gray", {
                        "p-invalid": meta.touched && meta.error
                    })}
                    placeholder={!showLabel ? placeholder : ""}
                    // onKeyDown={handleKeyDown}
                    onFocus={() => setIsFocused(true)}
                    onBlur={(e) => {
                        if (e.target.value !== undefined && e.target.value !== null && e.target.value !== '') {
                            setIsFocused(true);
                        } else {
                            setIsFocused(false);
                        }
                        field.onBlur(e);
                    }}
                    {...rest}
                />
                <div className='absolute place-eye cursor-pointer'>
                    <button type='button' onClick={() => setTogglePassword(prev => !prev)}>{togglePassword ? <EyeOpen /> : <EyeClosed />}</button>
                </div>
            </div>


            {renderError()}
        </div>
    );
}

export default PasswordInput
