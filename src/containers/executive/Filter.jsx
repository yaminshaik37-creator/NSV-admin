"use client";

import { Fragment } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";

const STATES = [
    "All States",
    "Andhra Pradesh",
    "Bihar",
    "Delhi",
    "Gujarat",
    "Karnataka",
    "Maharashtra",
    "Rajasthan",
    "Tamil Nadu",
    "Telangana",
    "Uttar Pradesh",
    "West Bengal",
];

export default function DashboardHeader({ selectedState, setSelectedState }) {
    return (
        <div className="w-full bg-gray-100 px-6 py-3 flex items-center gap-6">

            {/* Title */}
            <h1 className="text-lg font-semibold text-gray-800">
                SRL Diagnostics
            </h1>

            {/* State Dropdown */}
            <Listbox value={selectedState} onChange={setSelectedState}>
                <div className="relative w-44">
                    <Listbox.Button className="relative w-full bg-white border border-gray-300 rounded-md py-1.5 pl-3 pr-8 text-left text-sm">
                        <span className="block truncate">{selectedState}</span>

                        <span className="absolute inset-y-0 right-2 flex items-center">
                            <ChevronDownIcon className="h-4 w-4 text-gray-500" />
                        </span>
                    </Listbox.Button>

                    <Transition
                        as={Fragment}
                        enter="transition duration-100"
                        enterFrom="opacity-0 scale-95"
                        enterTo="opacity-100 scale-100"
                        leave="transition duration-75"
                        leaveFrom="opacity-100 scale-100"
                        leaveTo="opacity-0 scale-95"
                    >
                        <Listbox.Options className="absolute z-10 mt-1 w-full max-h-60 overflow-auto bg-white border border-gray-200 rounded-md shadow-lg">
                            {STATES.map((state) => (
                                <Listbox.Option
                                    key={state}
                                    value={state}
                                    className={({ active }) =>
                                        `cursor-pointer px-3 py-2 text-sm ${active ? "bg-blue-50 text-blue-700" : "text-gray-900"
                                        }`
                                    }
                                >
                                    {state}
                                </Listbox.Option>
                            ))}
                        </Listbox.Options>
                    </Transition>
                </div>
            </Listbox>

        </div>
    );
}
