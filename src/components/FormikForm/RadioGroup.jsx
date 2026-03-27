// EXTERNAL LIBRARY
import { useField, useFormikContext } from 'formik';

const RadioGroup = (props) => {

  const { name, label, onChange, options, className, required, ...rest } = props;
  const [field, meta] = useField(name);

  const { setFieldTouched, setFieldValue } = useFormikContext();

  const renderError = () => {
    return meta.error ? (
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
          className="manrope-medium-md text-gray"
        >
          {label}
        </label>
      }
      <div className={` ${className} flex mt-2`}>
        {options.map((option, index) => {
          return (
            <div className="flex gap-2 items-center min-w-[100px]" key={option.value + '-key-' + index}>
              <input
                id={option.value + '-id'}
                {...field}
                value={option.value}
                checked={option.value == field.value}
                type={"radio"}
                onChange={(e) => {
                  if (onChange)
                    onChange(e);
                  setFieldTouched(name, true);
                  setFieldValue(name, option.value);
                }}
                className="radio-custom"
                {...rest}
              />
              <label htmlFor={option.value + '-id'} className="manrope-regular-md text-dark-gray cursor-pointer mr-4"
              >{option.label}</label>
              <p></p>
            </div>)
        })}
      </div>
      {renderError()}
    </div>
  )
}

export default RadioGroup