import { useState } from 'react';
import { useField, useFormikContext } from 'formik';
import { DateRange } from 'react-date-range';

import { formatTime } from '@/utils/helper';
import { DATE_FILTER } from '@/config/constants';

import ReactSelect from 'react-select';
import makeAnimated from 'react-select/animated';
import CalendarIcon from '@/images/icons/CalendarIcon';

export const animatedComponents = makeAnimated();

const DateFilterSelect = ({ name, label, onChange, options = DATE_FILTER, className, onInputChange, required, singleSelect = false, containerStyle = "", showLeftIcon = false, isClearable = false, ...rest }) => {
    const [field, meta] = useField(name);
    const { setFieldTouched, setFieldValue } = useFormikContext();
    const [showDateRange, setShowDateRange] = useState(false);
    const [dateRange, setDateRange] = useState([{ startDate: new Date(), endDate: new Date(), key: 'selection' }]);

    const formatDate = (date) => formatTime(date, "DD MMM YYYY");

    const handleDateRangeChange = (ranges) => {
        const { selection } = ranges;
        setDateRange([selection]);
        const hasStartDate = selection.startDate, hasEndDate = selection.endDate, isRangeSelected = hasStartDate && hasEndDate && selection.startDate !== selection.endDate;
        if (isRangeSelected) {
            const dateValue = { startDate: selection.startDate, endDate: selection.endDate, type: 'custom' };
            const customOption = { value: 'custom', label: `${formatDate(selection.startDate)} - ${formatDate(selection.endDate)}`, startDate: selection.startDate, endDate: selection.endDate };
            setFieldValue(name, dateValue);
            setFieldTouched(name, true);
            if (onChange) onChange({ target: { value: dateValue, name, config: customOption } });
            setShowDateRange(false);
        }
    };

    const handleSelectChange = (val, g) => {
        if (val?.value === 'custom') { setShowDateRange(true); return; }
        setShowDateRange(false);
        if (onChange) onChange({ target: { value: val?.value || '', name, config: val?.config, obj_config: g?.option || {} }, ids: val });
        setFieldTouched(name, true);
        setFieldValue(name, singleSelect ? (val?.value || '') : val ? val : []);
    };

    const renderError = () => meta.touched && meta.error ? <p className="text-red manrope-regular-xs mt-1">{meta.error}</p> : <div className="mt-1" />;

    const getDisplayValue = () => {
        if (singleSelect) {
            if (field.value?.type === 'custom' && field.value?.startDate && field.value?.endDate) {
                const startDate = new Date(field.value.startDate), endDate = new Date(field.value.endDate);
                return { value: 'custom', label: `${formatDate(startDate)} - ${formatDate(endDate)}`, startDate, endDate };
            }
            return options.find(e => e.value == field?.value);
        }
        return field.value;
    };

    return (
        <div className={`relative ${containerStyle}`}>
            <ReactSelect id={name + '-id'} name={name} options={options} placeholder={label} components={animatedComponents} {...field} value={getDisplayValue()} onChange={handleSelectChange} className={`bg-white py-0.5 border manrope-medium-md text-dark-gray rounded-md ${className} ${showLeftIcon ? "ps-5" : ""}`} onInputChange={(val) => { if (onInputChange && val) onInputChange({ target: { value: val, name } }); }} onMenuOpen={() => setFieldTouched(name, true)} isClearable={isClearable} {...rest} />
            {showLeftIcon && <div className="absolute left-3 top-4 pointer-events-none"><CalendarIcon /></div>}
            {showDateRange && <div className="absolute top-full left-0 mt-2 z-50 bg-white border border-gray-300 rounded-lg shadow-lg p-4"><DateRange editableDateInputs={true} onChange={handleDateRangeChange} moveRangeOnFirstSelection={false} ranges={dateRange} className="date-range-wrapper" /></div>}
            {label && <label htmlFor={name + '-id'} className={`input-label manrope-regular-md text-gray bg-white w-fit ${(field.value || field.value === 0) && 'input-label-focused'}`}>{label}{required && <span className="text-light-gray">*</span>}</label>}
            {renderError()}
        </div>
    );
};

export default DateFilterSelect;
