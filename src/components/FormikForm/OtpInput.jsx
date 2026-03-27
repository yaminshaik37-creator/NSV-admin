import { useField, useFormikContext } from 'formik';
import clsx from 'clsx'
import ReactOtpInput from 'react-otp-input';

const formClasses =
  'block  appearance-none rounded-md border border-gray-200 bg-gray-50 px-3 py-2 text-gray-900 placeholder-gray-400 sm:text-sm'


const OtpInput = (props) => {
  const { name, label, onChange, numberOfDigits, inputType, required, ...rest } = props;
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
        label && <label htmlFor={name + '-id'} className="text-dark-gray manrope-medium-lg tracking-wider">
          {label}
          {required && <span className="text-dark-gray manrope-regular-md mt-1">*</span>}
        </label>
      }
      <ReactOtpInput
        inputType={inputType}
        value={field.value}
        containerStyle="mt-3 flex item-center gap-2"
        onChange={(val) => {
          if (onChange)
            onChange(val);
          setFieldTouched(name, true);
          setFieldValue(name, val);
        }}
        numInputs={numberOfDigits}
        renderSeparator={<span>&nbsp;</span>}
        renderInput={(props) => <input {...props} className='rounded-md border p-2 md:p-4 !w-12 md:!w-15 !border-[#B0B0B0] 2xl:!h-[50px] 2xl:!w-[50px] h-[50px] input-purple-focus' />}
        className={clsx(formClasses, {
          "p-invalid": meta.touched && meta.error
        })}
        {...rest}
      />
      {renderError()}
    </div>
  );

}

export default OtpInput