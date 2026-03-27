import { Fragment, useRef } from "react";
import { Dialog, Transition } from "@headlessui/react";
import CrossPurpleIcon from "@/images/icons/CrossPurpleIcon";
import { useTranslation } from "react-i18next";
import PrimaryBtn from "./PrimaryBtn";
import SecondaryBtn from "./SecondaryBtn";

export default function Modal({
  open,
  setOpen,
  classNames,
  children,
  isConfirmationModal = false,
  cb,
  title,
  primaryTitle,
  secondaryTitle,
  primaryDisabled = false,
  secondaryDisabled = false,
  isDropdown = false,
  buttonRef = null,
}) {
  const cancelButtonRef = useRef(null);
  const { t } = useTranslation();

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" initialFocus={cancelButtonRef} onClose={setOpen}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo={isDropdown ? "opacity-0" : "opacity-100"}
          leave="ease-in duration-200"
          leaveFrom={isDropdown ? "opacity-0" : "opacity-100"}
          leaveTo="opacity-0"
        >
          <div
            className={`fixed rounded-lg inset-0 bg-gray-500 transition-opacity z-[200] ${
              isConfirmationModal 
                ? "opacity-25" 
                : isDropdown 
                ? "bg-transparent opacity-0" 
                : "opacity-75"
            }`}
          />
        </Transition.Child>

        <div className={`fixed inset-0 z-[200] overflow-y-auto ${isDropdown ? 'pointer-events-none' : ''}`}>
          <div className={`flex min-h-full ${
            isDropdown 
              ? 'items-start justify-end pt-16 px-4 md:pr-60' 
              : 'items-center justify-center p-4'
          } text-center sm:items-center sm:p-0`}>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel
                className={`${isDropdown ? 'absolute right-0 top-12 md:right-20 lg:right-60 pointer-events-auto shadow-[0px_0px_20px_rgba(0,0,0,0.25)] inset-shadow-sm mx-4 md:mx-0 md:min-w-2xl' : 'relative shadow-xl sm:my-8 sm:w-full'} transform overflow-hidden bg-white text-left transition-all ${classNames ? classNames : "sm:max-w-lg"}`}
              >
                <div className="relative flex flex-col m-6 gap-4">
                  <div className="flex justify-between items-center">
                    <p className="manrope-bold-xl text-dark-gray">{title}</p>
                    <button
                      type="button"
                      className="flex items-center cursor-pointer"
                      onClick={() => setOpen(false)}
                      aria-label="Close"
                    >
                      <div className="flex justify-center items-center w-8 h-8">
                        <CrossPurpleIcon width={34} height={34} />
                      </div>
                    </button>
                  </div>
                </div>
                {isConfirmationModal && <div className="absolute left-0 top-5 bottom-0 w-1 h-11 bg-[#A382E2] rounded-r-lg cursor-pointer"></div>}
                <div className="flex flex-col m-6">
                  {isConfirmationModal && <hr className="border border-[#DFE2E2]" />}
                  <div className="bg-white rounded-lg">{children}</div>
                  {isConfirmationModal && (
                    <div className="flex w-full justify-center gap-4 my-6">
                      <>
                        <SecondaryBtn
                          title={secondaryTitle ?? t("BUTTON.NO")}
                          type="button"
                          onClick={() => setOpen(false)}
                          className="w-full"
                          disabled={secondaryDisabled}
                        />
                        <PrimaryBtn
                          title={primaryTitle ?? t("BUTTON.YES")}
                          type="button"
                          onClick={() => cb()}
                          className="w-full"
                          disabled={primaryDisabled}
                        />
                      </>
                    </div>
                  )}
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
