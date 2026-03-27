import DownArrow from "@/images/icons/DownArrow";
import DownArrowPurple from "@/images/icons/DownArrowPurpleIcon";
import { useField, useFormikContext } from "formik";

const formClasses =
  "capitalize relative items-center rounded-md ic-input manrope-medium-md text-dark-gray";

const CustomGroupedSelect = ({
  name,
  label,
  options = [],
  placeholder,
  disabled = false,
  required = false,
  inputWidth,
  containerStyle,
  styles,
  ...rest
}) => {
  const [field, meta] = useField(name);
  const { setFieldTouched, setFieldValue, values } = useFormikContext();

  // Use Formik's state for dropdown open/close
  const dropdownFieldName = `${name}_dropdown_open`;
  const isOpen = values[dropdownFieldName] || false;

  const selectedLabel = (() => {
    for (const group of options) {
      const found = group.options.find((opt) => opt.value === field.value);
      if (found) return found.label;
    }
    return "";
  })();

  const handleSelect = (optionValue) => {
    setFieldValue(name, optionValue);
    setFieldTouched(name, true);
    setFieldValue(dropdownFieldName, false);
  };

  const toggleDropdown = () => {
    if (!disabled) {
      setFieldValue(dropdownFieldName, !isOpen);
    }
  };

  const renderError = () => {
    return meta.touched && meta.error ? (
      <p className="text-red manrope-regular-xs mt-1">{meta.error}</p>
    ) : (
      <div className="mt-1" />
    );
  };

  return (
    <div className={`relative ${containerStyle}`}>
      <div>
        <div
          className={`${formClasses} ${selectedLabel ? "p-4" : "p-7"} text-left flex justify-between items-center cursor-pointer ${styles} ${disabled ? "disabled bg-gray-100 cursor-not-allowed" : ""
            } ${inputWidth || "w-full"} ${meta.touched && meta.error ? "border-red-500" : "border-[#DFE2E2]"
            } ${field.value ? 'has-value' : ''}`}
          onClick={toggleDropdown}
          tabIndex={0}
          {...rest}
        >
          <span className={selectedLabel ? "text-dark-gray" : "text-placeholder"}>
            {selectedLabel || placeholder}
          </span>
        </div>

        <label
          htmlFor={name + "-id"}
          className="input-label manrope-regular-md text-gray bg-white"
        >
          {label}
          {required && <span className="text-gray-700 ml-1">*</span>}
        </label>

        {isOpen && (
          <div
            className="absolute w-full mt-1 p-4 bg-white border border-[#DFE2E2] rounded-lg shadow-lg max-h-60 overflow-auto z-50"
          >
            {options.map((group, groupIdx) => (
              <div key={groupIdx}>
                <div className="bg-[#EFF0F0] px-3 py-2 manrope-medium-xs text-dark-gray rounded-md">
                  {group.title}
                </div>
                {group.options.map((opt) => (
                  <div
                    key={opt.value}
                    className={`px-2 py-1 cursor-pointer hover:bg-[#F7F5FD] hover:text-[#4C239C] flex flex-col gap-1 my-3 ${field.value === opt.value ? "bg-[#ECE6F7] text-[#4C239C]" : ""
                      }`}
                    onClick={() => handleSelect(opt.value)}
                  >
                    <span className="manrope-regular-sm">{opt.label}</span>
                    <span className="manrope-regular-xs text-light-gray">
                      {opt.speciality}
                    </span>
                  </div>
                ))}
              </div>
            ))}
          </div>
        )}

        <div className={`absolute right-3 top-5 pointer-events-none transition-transform ${isOpen ? 'rotate-180' : ''}`}>
          <DownArrowPurple />
        </div>
      </div>

      {renderError()}
    </div>
  );
};

export default CustomGroupedSelect;