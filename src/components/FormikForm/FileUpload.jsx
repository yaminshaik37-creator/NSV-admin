import { useField, useFormikContext } from "formik";

import { fileValidator } from "@/utils/helper";
import { PencilEdit } from "@/config/icons";
import FileUploadIcon from "@/images/icons/FileUploadIcon";

const FileUpload = (props) => {
  const { name, label, updateFilesCb, multiple = false, acceptTypes = "", required, onlyImg = false, hidden = false, ...rest } = props;
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
    const fileValid = fileValidator(e.target.files);
    if (fileValid != "success") return "";
    updateFilesCb(e.target.files, name);
    setFieldTouched(name, true);
    setFieldValue(name, e.target.value);
  };

  return (
    <div>
      {hidden ? (
        <input
          type="file"
          id={name + "-id"}
          name={name}
          {...field}
          {...rest}
          onChange={handleNewFileUpload}
          multiple={multiple}
          accept={
            acceptTypes ||
            (onlyImg
              ? "image/png, image/jpeg, image/jpg, image/heic"
              : "image/png, image/jpeg, image/jpg, application/pdf")
          }
          className="hidden"
        />
      ) : (
        <>
          <div className="flex justify-between items-end mb-2">
            {label && (
              <label
                htmlFor={name + "-id"}
                className="block manrope-semibold-md text-dark-primary"
              >
                {label}
                {required ? <span className="text-red-600 ml-1">*</span> : <span> (optional)</span>}
              </label>
            )}
            {/* <Link href="#" className="text-base font-medium text-tertiary">Cancel</Link> */}
          </div>
          <div className="py-15 px-15 relative border border-[#B6B4B3] rounded-md cursor-pointer overflow-hidden">
            <input
              className="mt-1 w-full py-3 px-4 relative cursor-pointer !opacity-0 text-[0px] text-transparent"
              type="file"
              id={name + "-id"}
              name={name}
              {...field}
              {...rest}
              onChange={handleNewFileUpload}
              multiple={multiple}
              accept={
                acceptTypes ||
                (onlyImg
                  ? "image/png, image/jpeg, image/jpg, image/heic"
                  : "image/png, image/jpeg, image/jpg, application/pdf")
              }
            />
            <div className="flex justify-center items-center absolute top-2 bottom-2 left-3 rounded-md right-3">
              <div className="flex flex-col justify-center gap-4 text-center items-center z-40 ">
                <label
                  htmlFor={name + "-id"}
                  className="flex flex-col justify-center items-center cursor-pointer bg-[#F7F5FD] rounded-full w-10 h-10"
                >
                  {field.value && !multiple ? (
                    <PencilEdit />
                  ) : (
                    <FileUploadIcon />
                  )}
                </label>
                {/* <div className="flex flex-col justify-center gap-2">
                  <p className="font-regular text-placeholder">
                    Drag & Drop files here
                  </p>
                  <p className="font-regular text-placeholder">or</p>
                  <p className="font-regular text-primary">Browse files</p>
                </div> */}
              </div>
            </div>
          </div>
          {renderError()}
        </>
      )}
    </div>
  );
};

export default FileUpload;
