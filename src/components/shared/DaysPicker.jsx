
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';

const DaysPicker = ({ selected, setSelected }) => {
    return (
        <DayPicker mode="multiple" selected={selected} onSelect={setSelected} disabled={{ before: new Date() }} />
    );
}

export default DaysPicker
