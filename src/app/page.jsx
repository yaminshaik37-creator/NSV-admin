"use client";

import Executive from "@/containers/home/executiveoverview";
import Hospital from "@/containers/home/ClientAdministration";
import NsvNetwork from "@/containers/home/NsvNetwork";
import { Tab } from "@headlessui/react";
import ProgramDirector from "@/containers/home/ProgramDirector";
import PolicyMaker from "@/containers/home/PolicyMaker";

export default function DashboardPage() {
  return (
    <div>
      <Tab.Group>
        <div className="bg-white border-b border-gray-200">
          <Tab.List className="flex gap-8 px-6">
            <TabItem>Nsv Executive</TabItem>
            <TabItem>NSV NETWORK</TabItem>
            <TabItem>Client Administration</TabItem>
            <TabItem>Program Director</TabItem>
            <TabItem>Policy Maker</TabItem>
          </Tab.List>
        </div>

        <Tab.Panels>
          <Tab.Panel>
            <Executive />
          </Tab.Panel>

          <Tab.Panel>
            <NsvNetwork />
          </Tab.Panel>

          <Tab.Panel>
            <Hospital />
          </Tab.Panel>

          <Tab.Panel>
            <ProgramDirector />
          </Tab.Panel>

          <Tab.Panel>
            <PolicyMaker />
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
}

/* ===== TAB BUTTON ===== */
function TabItem({ children }) {
  return (
    <Tab
      className="relative py-4 whitespace-nowrap font-medium transition-colors outline-none focus:outline-none focus-visible:outline-none focus:ring-0 focus-visible:ring-0 border-0 focus:border-0"
      style={{ outline: 'none', boxShadow: 'none' }}
    >
      {({ selected }) => (
        <>
          <span className={selected ? "text-blue-600" : "text-gray-600"}>
            {children}
          </span>
          {selected && (
            <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-blue-600"></div>
          )}
        </>
      )}
    </Tab>
  );
}
