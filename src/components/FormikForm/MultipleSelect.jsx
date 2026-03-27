// EXTERNAL LIBRARY
import { useField, useFormikContext } from 'formik';
import ReactSelect from 'react-select';

import makeAnimated from "react-select/animated";

import CalendarIcon from "@/images/icons/CalendarIcon";
import { DEFAULT_ALL } from '@/config/constants';

export const animatedComponents = makeAnimated();

const MultipleSelect = (props) => {

    const { name, label, onChange, options, className, onInputChange, required, singleSelect = false, containerStyle = "", showLeftIcon = false, isMulti, ...rest } = props;
    const [field, meta] = useField(name);
    const { setFieldTouched, setFieldValue } = useFormikContext();

    const renderError = () => {
        return meta.error ? (
            <p className="text-red manrope-regular-xs mt-1">{meta.error}</p>
        ) : (
            <div className="mt-1" />
        );
    };

    const customStyles = {
        valueContainer: (base) => ({
            ...base,
            maxHeight: 120,
            overflowY: 'auto',
            paddingTop: 4,
        }),
        indicatorsContainer: (base) => ({
            ...base,
            alignItems: 'flex-start',
            paddingTop: 6,
        }),
    };

    return (
        <div className={`relative ${containerStyle}`}>
            <ReactSelect
                id={name + '-id'}
                name={name}
                isMulti={isMulti}
                styles={customStyles}
                options={isMulti ? DEFAULT_ALL.concat(options) : options}
                placeholder={label}
                components={animatedComponents}
                isClearable={(singleSelect || isMulti) ? true : false}
                {...field}
                value={singleSelect ? options.find(e => e.value == field.value) || null : field.value}
                onChange={(val, g) => {
                    setFieldTouched(name, true);
                    if (singleSelect) {
                        setFieldValue(name, val?.value || '');
                    } else {
                        if (g?.option?.value === "all") {
                            setFieldValue(name, options);
                        } else {
                            setFieldValue(name, val ? val : []);
                        }
                    }

                    if (onChange) onChange({ target: { value: val?.value || '', name, config: val?.config, obj_config: g?.option || {} }, ids: val || [] });
                }}
                className={`ic-input py-0.5 manrope-medium-md text-dark-gray rounded-md ${className} ${showLeftIcon ? "ps-5" : ""}`}
                onInputChange={(val) => {
                    if (onInputChange && val) onInputChange({ target: { value: val, name } });
                }}
                onMenuOpen={() => {
                    setFieldTouched(name, true);
                }}
                {...rest}
            />
            {showLeftIcon && (
                <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none">
                    <CalendarIcon />
                </div>
            )}
            {
                label && <label
                    htmlFor={name + '-id'}
                    className={`input-label manrope-regular-md text-gray bg-white w-fit ${(field.value || field.value === 0) && 'input-label-focused'}`}
                >
                    {label}
                    {required && <span className="text-light-gray">*</span>}
                </label>
            }
            {renderError()}
        </div>
    );
}


export default MultipleSelect