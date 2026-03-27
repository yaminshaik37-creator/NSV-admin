

import { useEffect, useState } from 'react';

import { useField, useFormikContext } from 'formik';
import { DateRange } from 'react-date-range';

import { addDate, formatTime, isNumberic } from '@/utils/helper';
// import { addDate, formatTime, getDisabledDates, isNumberic } from '@/utils/helper';
// import ApiCall from '@/service/api';
// import { API_ENDPOINTS } from '@/config/api-endpoints';

const DateRangePicker = (props) => {
    const { name, label, onChange, required, location_id, calendarClass = "", ...rest } = props;

    const [showCalendar, setShowCalendar] = useState(false);
    const [bookedRanges, setBookedRanges] = useState([]);

    useEffect(() => {
        if (isNumberic(location_id)) {
            getBookingDates(location_id)
        }
    }, [])


    const [field, meta] = useField(name);
    const { setFieldTouched, setFieldValue } = useFormikContext();

    // const currentRange = field.value && field.value.startDate && field.value.endDate ? field.value : null;

    const currentRange = field.value || {
        startDate: new Date(),
        endDate: new Date(),
    };
    // const getBookingDates = async (id) => {
    //     try {
    //         const res = await ApiCall({ url: API_ENDPOINTS.LOCATION_BOOKING_DATES, body: { id }, method: 'POST' })
    //         if (res.success) {
    //             setBookedRanges(getDisabledDates(res.data || []))
    //         }
    //     } catch (error) {

    //     }
    // }

    // const renderError = () => {
    //     return (
    //         meta.touched && meta.error ? (
    //             <p className="text-red-600 text-xs">{meta.error}</p>
    //         ) : null
    //     )
    // }
    // const handleChange = (ranges) => {
    //     const { startDate, endDate } = ranges.selection;

    //     setFieldTouched(name, true);
    //     setFieldValue(name, {
    //         startDate,
    //         endDate,
    //     });
    //     if (onChange) {
    //         onChange({ startDate, endDate });
    //     }
    //     // if (startDate && endDate && startDate.getTime() !== endDate.getTime()) {
    //     //     setShowCalendar(false);
    //     // }
    // }

    const renderError = () => {
        return meta.touched && meta.error ? (
            <p className="text-red manrope-regular-xs mt-1">{meta.error}</p>
        ) : (
            <div className="mt-1" />
        );
    };

    const handleChange = (ranges) => {
        const { startDate, endDate } = ranges.selection;

        // Update Formik field
        setFieldTouched(name, true);
        setFieldValue(name, {
            startDate,
            endDate,
        });
        // Custom onChange if needed
        if (onChange) {
            onChange({ startDate, endDate });
        }
    }

    return (
        <div>
            {/* {
                label &&
                <label
                    htmlFor={name + '-id'}
                    className="mb-2 block text-base font-DM_Sans_Medium text-[#180B0B]"
                >
                    {label}
                    {required && <span className="text-red-600 ml-1">*</span>}
                </label>
            }
            <input
                type="text"
                readOnly
                onClick={() => setShowCalendar(!showCalendar)}
                value={currentRange ? `${formatTime(currentRange.startDate, 'DD/MM/YYYY')} - ${formatTime(currentRange.endDate, 'DD/MM/YYYY')}` : ''}
                placeholder="Select date range"
                className="block w-full rounded-md border border-gray-200 bg-gray-50 px-3 py-2 text-gray-900 cursor-pointer"
            /> */}
            {/* {showCalendar && ( */}
            <div className={`absolute top-2 left-0 z-50 bg-white border border-gray-200 rounded-lg placeholder-style ${calendarClass}`}>
                <DateRange
                    ranges={[
                        {
                            startDate: currentRange?.startDate || addDate(3),
                            endDate: currentRange?.endDate || addDate(3),
                            key: 'selection',
                            color: '#652FCF'
                        },
                    ]}
                    onChange={handleChange}
                    moveRangeOnFirstSelection={false}
                    editableDateInputs={false}
                    name={name}
                    
                // minDate={addDate(3)}
                // disabledDates={bookedRanges}
                />
            </div>

            {renderError()}
        </div>
    );
}
export default DateRangePicker