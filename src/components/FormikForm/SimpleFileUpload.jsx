// EXTERNAL LIBRARY
import { fileValidator } from '@/utils/helper';
import { useField, useFormikContext } from 'formik';
import FileUploadIcon from '@/images/icons/FileUploadIcon';

const SimpleFileUpload = (props) => {

    const { name, label, updateFilesCb, onlyImg = false, acceptTypes = "", showIcon = false, ...rest } = props;
    const [field, meta] = useField(name);
    const { setFieldTouched, setFieldValue } = useFormikContext();

    const renderError = () => {
        return meta.touched && meta.error ? (
            <p className="text-red manrope-regular-xs mt-1">{meta.error}</p>
        ) : (
            <div className="mt-1" />
        );
    };

    const handleNewFileUpload = (e) => {
        // if (!e.target.files[0].name) return;
        const fileValid = fileValidator(e.target.files)
        if (fileValid != 'success') return
        updateFilesCb(e.target.files);
        setFieldTouched(name, true);
        setFieldValue(name, e.target.value);
    };

    return (
        <div>
            <div className='flex items-center gap-2 text-primary manrope-semibold-md cursor-pointer'>
                {
                    label && <label htmlFor={name + '-id'} className="cursor-pointer mb-1 flex gap-1.5">
                        {showIcon && <FileUploadIcon />} {label}
                    </label>
                }
            </div>
            <input
                type="file"
                id={name + '-id'}
                name={name}
                className="form-control"
                {...field}
                filename={field.value}
                {...rest}
                onChange={handleNewFileUpload}
                multiple
                accept={
                    acceptTypes ||
                    (onlyImg
                        ? 'image/png, image/jpeg, image/jpg, image/heic'
                        : 'image/png, image/jpeg, image/jpg, application/pdf, application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document')
                }
            />
            {renderError()}
        </div>
    )
}

export default SimpleFileUpload