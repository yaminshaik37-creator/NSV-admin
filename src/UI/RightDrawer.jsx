"use client";

import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import Cross from "@/images/icons/Cross";
import DrawerTitle from "@/components/UI/DrawerTitle";

const RightDrawer = ({ open, onClose, children, title, maxWidth }) => {
  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" onClose={onClose} className="relative z-50">
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-25"
          leave="ease-in duration-200"
          leaveFrom="opacity-25"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-900 opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden flex justify-end">
            <Transition.Child
              as={Fragment}
              enter="transform transition ease-in-out duration-300"
              enterFrom="translate-x-full"
              enterTo="translate-x-0"
              leave="transform transition ease-in-out duration-300"
              leaveFrom="translate-x-0"
              leaveTo="translate-x-full"
            >
              <Dialog.Panel
                className={`pointer-events-auto relative w-screen max-w-[30rem] bg-white border-2 border-[#A382E2] rounded-s-lg shadow-lg overflow-hidden`}
              >

                <div className="relative flex justify-between items-center mt-4 mb-2 px-4">
                  <div className="flex items-center gap-3">
                    <div className="absolute left-0 w-1 h-9 rounded-e-sm bg-[#A382E2]" />
                    <DrawerTitle title={title} className="px-2" />
                  </div>

                  <button
                    type="button"
                    className="flex w-8 h-8 p-2 justify-center items-center text-primary"
                    onClick={onClose}
                  >
                    <Cross />
                  </button>
                </div>

                <hr className="border border-[#DFE2E2] mx-6" />

                <div className="ps-6 pe-5 pb-18 h-full overflow-y-auto">
                  {children}
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default RightDrawer;
