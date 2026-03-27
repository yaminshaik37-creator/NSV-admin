
// EXTERNAL LIBRARY
import { useField, useFormikContext } from 'formik';

const CheckBox = (props) => {

  const { name, label, labelClass, onChange, ...rest } = props;
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
      <div className='flex gap-1 items-center'>
        <input
          id={name}
          type="checkbox"
          className="custom-checkbox"
          name={name}
          {...field}
          onChange={(e) => {
            if (onChange) {
              onChange({ target: { name, value: e.target.checked, checked: e.target.checked }, value: e.target.value });
            }
            setFieldTouched(name, true);
            setFieldValue(name, e.target.checked);
          }}
          checked={field.value ? true : false}
          {...rest}
        />
        <label htmlFor={name} className={`cursor-pointer manrope-regular-sm capitalize ${labelClass ? labelClass : 'text-dark-gray'}`}>{label}</label>
      </div>
      {renderError()}
    </div>
  );
}

export default CheckBox
