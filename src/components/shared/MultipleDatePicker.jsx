import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';


const MultipleDatePicker = ({ onSelectDate, days, maxDates, fromDate, toDate }) => {
    return (
        <>
            <DayPicker
                mode="multiple"
                max={maxDates}
                selected={days}
                onSelect={onSelectDate}
                fromDate={fromDate ||new Date()}
                toDate={toDate}
            />
        </>
    )
}

export default MultipleDatePicker