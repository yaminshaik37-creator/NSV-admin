"use client";
import { Fragment, useState, useEffect, useMemo, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import "leaflet/dist/leaflet.css";
import { Tooltip } from '@mui/material';

import { Dialog, Menu, Transition, Disclosure } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import CollapseArrowIcon from "@/images/icons/CollapseArrowIcon";
import ExpandArrowIcon from "@/images/icons/ExpandArrowIcon";
import Logout from "../shared/LogoutModal";
import NotificationDropdown from "../shared/NotificationModal";
import { useUserContext } from "@/contexts/userContext";
import AsyncImage from "../shared/AsyncImage";
import logo from "@/images/logos/LogoIcon.svg";
import diagnosticLogo from "@/images/logos/Diagnostic-Center-Logo.png";
import BellGreenIcon from "@/images/icons/BellGreenIcon";
import DefaultImg from "@/images/DP-Avatar.jpg"

import { USER_TYPES, useTranslatedConstants } from "@/config/constants";
import { getImageUrl, getInitials, } from "@/utils/helper";
import DCLists from "../shared/DCLists";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Sidebar({ pathname, children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [openLogout, setOpenLogout] = useState(false);
  const [openNotifications, setOpenNotifications] = useState(false);
  const bellButtonRef = useRef(null);
  const [access, setAccess] = useState({});
  const [users, setUser] = useState({});

  const path = usePathname();
  const { user: userInfo, setUser: setUSER, refrenceDC } = useUserContext();

  const { ADMIN_NAVIGATIONS, DC_NAVIGATIONS, DOCTOR_NAVIGATIONS, USERNAVIGATION, PATIENT_NAVIGATIONS } = useTranslatedConstants();

  const sidebar = useMemo(() => userInfo.user_type === USER_TYPES.OWNER_ADMIN ? ADMIN_NAVIGATIONS : userInfo.user_type === USER_TYPES.DC ? DC_NAVIGATIONS : userInfo.user_type === USER_TYPES.DOC ? DOCTOR_NAVIGATIONS : userInfo.user_type === USER_TYPES.PATIENT ? PATIENT_NAVIGATIONS : [], [userInfo]);

  const updateProfile = async () => {
    users.image = await getImageUrl(userInfo.image);
    setUser(userInfo);
  };
  useEffect(() => {
    updateProfile();
    window.addEventListener("update_profile", updateProfile);
    return () => {
      window.removeEventListener("update_profile", updateProfile);
    };
  }, [userInfo]);

  return (
    <>
      {true && (
        <>
          {/* <InactivityMonitor /> */}
          <>
            {/* MOBILE VIEW */}
            <Transition.Root show={sidebarOpen} as={Fragment}>
              <Dialog as="div" className="relative z-50 lg:hidden" onClose={setSidebarOpen}  >
                <Transition.Child
                  as={Fragment}
                  enter="transition-opacity ease-linear duration-300"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="transition-opacity ease-linear duration-300"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <div className="fixed inset-0 bg-gray-900/80" />
                </Transition.Child>

                <div className="fixed inset-0 flex">
                  <Transition.Child
                    as={Fragment}
                    enter="transition ease-in-out duration-300 transform"
                    enterFrom="-translate-x-full"
                    enterTo="translate-x-0"
                    leave="transition ease-in-out duration-300 transform"
                    leaveFrom="translate-x-0"
                    leaveTo="-translate-x-full"
                  >
                    <Dialog.Panel className="relative mr-16 flex w-full max-w-xs flex-1">
                      <Transition.Child
                        as={Fragment}
                        enter="ease-in-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in-out duration-300"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                      >
                        <div className="absolute right-0 top-0 flex w-16 justify-center pt-5">
                          <button type="button" className="-m-2.5 p-2.5" onClick={() => setSidebarOpen(prev => !prev)}   >
                            <span className="sr-only">Close sidebar</span>
                            <XMarkIcon className="h-6 w-6 text-black" aria-hidden="true" />
                          </button>
                        </div>
                      </Transition.Child>
                      <div className="flex grow flex-col overflow-y-auto bg-white px-6 pb-4">
                        <div className="flex items-center mt-10">
                          <div className="flex items-center">
                            <Image className="w-20 h-20" src={logo} alt="Internal Capsule" />
                            <div className="flex flex-col gap-2">
                              <p className="text-lg text-gray tracking-wide font-light">   INTERNAL
                                <p className="text-lg font-bold text-tertiary">   CAPSULE  </p>
                              </p>
                            </div>
                            <div>
                            </div>
                          </div>
                        </div>
                        <nav className="flex flex-1 flex-col">
                          <ul role="list" className="flex flex-1 flex-col gap-y-7"   >
                            <li>
                              <ul role="list" className="-mx-2 space-y-1">
                                {sidebar.map((item) => (item.default || (item?.roles || []).some((e) => Object.keys(access).includes(e))) && (
                                  <li key={item.name}>
                                    {!item.children ? (
                                      <Link target={item.openInNewTab ? "_blank" : ""} href={item.href} onClick={() => setSidebarOpen(prev => !prev)} className={classNames(path === item.href ? " text-[#F7F5FD] bg-[#F7F5FD]" : "text-light-gray", item.current ? "bg-gray-50 text-[#F7F5FD]" : "hover:bg-[#F7F5FD]", `group flex rounded-md p-4 items-center ${collapsed ? "justify-center" : "justify-start"} gap-4`)} >
                                        <div className={classNames("flex justify-center items-center md:p-2 rounded-md border border-[#BFC4C5] w-8 h-8 md:w-6 md:h-6", path === item.href ? "bg-[#4C239C]" : "group-hover:text-[#331869] group-hover:border-[#4C239C]")}  >
                                          <item.icon className={classNames(item.current ? "text-[#F7F5FD] bg-[#4C239C]" : "", "h-8 w-8 md:h-6 md:w-6 shrink-0 ")} aria-hidden="true" />
                                        </div>
                                        {!collapsed && (
                                          <span
                                            className={`${classNames(
                                              path === item.href
                                                ? "text-active"
                                                : "text-light-gray group-hover:text-[#331869]"
                                            )} transition-all transition-discrete duration-300 manrope-semibold-lg`}
                                          >
                                            {item.name}
                                          </span>
                                        )}
                                      </Link>
                                    ) : (
                                      <Disclosure as="div">
                                        {({ open }) => (
                                          <>
                                            <Disclosure.Button
                                              className={classNames(
                                                path === item.href
                                                  ? "text-active bg-[#F7F5FD]"
                                                  : "",
                                                item.current
                                                  ? "bg-[#F7F5FD] text-active"
                                                  : "text-dark-gray hover:text-active hover:bg-[#F7F5FD]",
                                                "group flex gap-x-3 rounded-md p-2 w-full"
                                              )}
                                            >
                                              <item.icon
                                                className="h-6 w-6 shrink-0"
                                                aria-hidden="true"
                                              />
                                              {item.name}
                                            </Disclosure.Button>
                                            <Disclosure.Panel
                                              as="ul"
                                              className="mt-1 px-2"
                                            >
                                              {item.children.map(
                                                (subItem) =>
                                                  (item.default ||
                                                    subItem.default ||
                                                    Object.keys(
                                                      access
                                                    ).includes(
                                                      subItem.roles
                                                    )) && (
                                                    <li key={subItem.name}>
                                                      <Disclosure.Panel>
                                                        {({ close }) => (
                                                          <Disclosure.Button
                                                            as="button"
                                                            onClick={() => {
                                                              close();
                                                            }}
                                                            className={
                                                              "w-[100%] text-left"
                                                            }
                                                          >
                                                            <Link
                                                              href={
                                                                subItem.href
                                                              }
                                                              className={classNames(
                                                                path.includes(
                                                                  subItem.href
                                                                )
                                                                  ? "text-indigo-700 bg-[#F7F5FD]"
                                                                  : "",
                                                                subItem.current
                                                                  ? "bg-gray-50"
                                                                  : "text-gray-700 hover:text-indigo-700 hover:bg-[#F7F5FD]",
                                                                " rounded-md py-2 block pl-9 text-sm leading-6 text-gray-700"
                                                              )}
                                                              onClick={() => { setSidebarOpen(prev => !prev); }}
                                                            >
                                                              {subItem.name}
                                                            </Link>
                                                          </Disclosure.Button>
                                                        )}
                                                      </Disclosure.Panel>
                                                    </li>
                                                  )
                                              )}
                                            </Disclosure.Panel>
                                          </>
                                        )}
                                      </Disclosure>
                                    )}
                                  </li>
                                )
                                )}
                              </ul>
                            </li>
                          </ul>
                        </nav>
                      </div>
                    </Dialog.Panel>
                  </Transition.Child>
                </div>
              </Dialog>
            </Transition.Root>

            <div className={`hidden lg:fixed lg:inset-y-0 lg:z-120 lg:flex ${collapsed ? "lg:w-25" : "md:w-58"} lg:flex-col transition-all duration-300`} >
              <div className={`relative flex h-15 shrink-0 bg-white ${collapsed ? "justify-center" : "justify-start"} items-center border-1 border-[#DFE2E2] p-5 transition-all transition-discrete duration-300`}  >
                <div className="flex items-center cursor-pointer">
                  {refrenceDC.logo ? <AsyncImage img={refrenceDC.logo} /> :
                    <>
                      {userInfo.user_type === USER_TYPES.DC ? (
                        <Image className="w-8 h-8 mr-1" src={diagnosticLogo} width={10} height={10} alt="" />
                      ) : (
                        <Image className="w-14 h-14" src={logo} width={15} height={15} alt="" />
                      )}
                    </>}

                  {!collapsed && userInfo.user_type === USER_TYPES.DC ? (
                    <span className="text-sm text-[#720AFF]">
                      Star Health
                      <span className="text-sm text-[#FF0078]">
                        Diagnostics
                      </span>
                    </span>
                  ) : (
                    !collapsed && (
                      <div>
                        <p className="text-md text-gray tracking-wide font-light">
                          INTERNAL
                        </p>
                        <p className="text-md font-bold text-tertiary">
                          CAPSULE
                        </p>
                      </div>
                    )
                  )}
                </div>
                <button className="border border-[#BFC4C5] bg-white rounded-full absolute -right-2 top-1/2 -translate-y-1/2 transition-all duration-300" onClick={() => setCollapsed((prev) => !prev)}  >
                  {!collapsed ? <CollapseArrowIcon /> : <ExpandArrowIcon />}
                </button>
              </div>
              <div className="flex grow flex-col gap-y-2 overflow-y-auto border-r border-gray-200 bg-white">
                <nav className="flex flex-col">
                  <ul
                    role="list"
                    className={`flex flex-col ${collapsed ? "items-center" : ""}`}>
                    <li className="w-full">
                      <ul role="list">
                        {sidebar.map(
                          (item) =>
                            (item.default ||
                              (item?.roles || []).some((e) =>
                                Object.keys(access).includes(e)
                              )) && (
                              <li key={item.name} className="w-full">
                                {!item.children ? (
                                  <Tooltip
                                    title={item.name}
                                    placement="right"
                                    disableHoverListener={!collapsed}
                                    slotProps={{
                                      tooltip: {
                                        sx: {
                                          bgcolor: '#3F1E821A',
                                          color: '#652FCF',
                                          fontSize: '14px',
                                          fontWeight: 600,
                                          fontFamily: 'Manrope, sans-serif',
                                          border: '1px solid #E0D5F5',
                                          borderRadius: '10px',
                                          padding: '10px',
                                          backdropFilter: 'blur(5px)',
                                        }

                                      }
                                    }}
                                  >
                                    <Link
                                      target={item.openInNewTab ? "_blank" : ""}
                                      href={item.href}
                                      className={classNames(
                                        path === item.href
                                          ? " text-[#F7F5FD] bg-[#F7F5FD]"
                                          : "text-light-gray",
                                        `group flex rounded-md py-2 items-center ${collapsed
                                          ? "justify-center"
                                          : "justify-start ps-4"
                                        } gap-4 manrope-medium-md whitespace-nowrap`
                                      )}
                                    >
                                      <div
                                        className={classNames(
                                          "flex justify-center items-center rounded-md border border-[#BFC4C5] w-8 h-8",
                                          path === item.href
                                            ? "bg-[#4C239C]"
                                            : "group-hover:text-[#331869] group-hover:border-[#4C239C]"
                                        )}
                                      >
                                        <item.icon
                                          className={classNames(
                                            item.current
                                              ? "text-[#F7F5FD] bg-[#4C239C]"
                                              : "",
                                            "h-6 w-6 shrink-0 "
                                          )}
                                          aria-hidden="true"
                                        />
                                      </div>
                                      {!collapsed && (
                                        <span
                                          className={`${classNames(
                                            path === item.href
                                              ? "text-active"
                                              : "text-light-gray group-hover:text-[#331869]"
                                          )} transition-all transition-discrete duration-300 manrope-medium-md`}
                                        >
                                          {item.name}
                                        </span>
                                      )}
                                    </Link>
                                  </Tooltip>
                                ) : (
                                  <Disclosure as="div">
                                    {({ open }) => (
                                      <>
                                        <Disclosure.Button
                                          className={classNames(
                                            path === item.href
                                              ? "text-indigo-700 bg-indigo-50"
                                              : "",
                                            item.current
                                              ? "bg-gray-50 text-indigo-700"
                                              : "text-gray-700 hover:text-[#331869] hover:bg-[#F7F5FD]",
                                            "group flex gap-x-3 rounded-md p-2 w-full"
                                          )}
                                        >
                                          <item.icon
                                            className="h-6 w-6 shrink-0"
                                            aria-hidden="true"
                                          />
                                        </Disclosure.Button>
                                        <Disclosure.Panel
                                          as="ul"
                                          className="mt-1 px-2"
                                        >
                                          {item.children.map(
                                            (subItem) =>
                                              (item.default ||
                                                subItem.default ||
                                                Object.keys(access).includes(
                                                  subItem.roles
                                                )) && (
                                                <li key={subItem.name}>
                                                  <Disclosure.Panel>
                                                    {({ close }) => (
                                                      <Disclosure.Button
                                                        as="button"
                                                        onClick={() => {
                                                          close();
                                                        }}
                                                        className={
                                                          "w-[100%] text-left"
                                                        }
                                                      >
                                                        <Link
                                                          href={subItem.href}
                                                          className={classNames(
                                                            path.includes(
                                                              subItem.href
                                                            )
                                                              ? "text-indigo-700 bg-indigo-50"
                                                              : "",
                                                            subItem.current
                                                              ? "text-gray-700"
                                                              : "text-gray-700 hover:text-indigo-700 hover:bg-indigo-50",
                                                            " rounded-md py-2 block pl-9 text-sm leading-6 text-gray-700"
                                                          )}
                                                          onClick={() => {
                                                            setSidebarOpen(
                                                              false
                                                            );
                                                          }}
                                                        >
                                                          {subItem.name}
                                                        </Link>
                                                      </Disclosure.Button>
                                                    )}
                                                  </Disclosure.Panel>
                                                </li>
                                              )
                                          )}
                                        </Disclosure.Panel>
                                      </>
                                    )}
                                  </Disclosure>
                                )}
                              </li>
                            )
                        )}
                      </ul>
                    </li>
                  </ul>
                </nav>
              </div>
            </div>
          </>

          <div className={`fixed top-0 right-0 ${collapsed ? "lg:left-25" : "lg:left-58"} left-0 z-30 flex h-15 items-center gap-x-4 border-b border-gray-200 bg-white px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8 transition-all duration-300`}>
            {pathname == "/finance-simulator" && (
              <div className="flex h-30 shrink-0 items-center justify-center mt-10">
                <div className="flex items-center space-x-4">
                  <Image
                    className="w-10 h-10"
                    src={logo}
                    alt="Internal Capsule"
                  />
                  <span className="text-2 xl font-bold bg-gradient-to-r from-indigo-600 to-sky-500 text-transparent bg-clip-text">
                    Internal Capsule
                  </span>
                </div>
              </div>
            )}
            <button
              type="button"
              className="-m-2.5 p-2.5 text-gray-700 lg:hidden"
              onClick={() => setSidebarOpen(prev => !prev)}
            >
              <span className="sr-only">Open sidebar</span>
              <Bars3Icon className="h-6 w-6" aria-hidden="true" />
            </button>

            <div className="h-6 w-px bg-gray-200 lg:hidden" aria-hidden="true" />
            <div className="flex flex-1 justify-between items-center gap-x-4 self-stretch">
              <div className="flex flex-1 items-center justify-end gap-x-4 lg:gap-x-6">
                <div className="flex items-center gap-4">
                  <div className="hidden lg:block h-6 w-[1px] bg-[#BFC4C5]" aria-hidden="true" />
                  <div className="relative">
                    <button className="border border-[#BFC4C5] rounded-sm w-7 h-7 flex justify-center items-center cursor-pointer" ref={bellButtonRef} onClick={() => setOpenNotifications(true)}>
                      <BellGreenIcon />
                    </button>
                    <NotificationDropdown open={openNotifications} setOpen={setOpenNotifications} buttonRef={bellButtonRef} />
                  </div>
                  <div className="block h-6 w-[1px] bg-[#BFC4C5]" aria-hidden="true" />
                  <DCLists />
                </div>

                {(
                  <Menu as="div" className="">
                    <Menu.Button className="flex items-center gap-2 mt-2">
                      <span className="sr-only">Open users menu</span>
                      {users.image ? <AsyncImage img={users.image || null} className="h-8 w-8 rounded-full bg-gray-50 object-cover" alt="profile image" /> : <Image src={DefaultImg} alt="profile image" className="h-8 w-8 rounded-full bg-gray-50 object-cover" />}
                      <span className="hidden lg:flex lg:items-center">
                        <div className="flex flex-col">
                          <p className="manrope-semibold-md leading-6 text-dark-gray" aria-hidden="true" >
                            {getInitials(users.first_name, users.last_name)}
                          </p>
                        </div>
                        <ChevronDownIcon
                          className="ml-2 h-5 w-5 text-primary"
                          aria-hidden="true"
                        />
                      </span>
                    </Menu.Button>

                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-100"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <Menu.Items className="absolute right-6 z-[999] mt-2.5 w-32 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-[#652FCF] focus:outline-none">
                        {(USERNAVIGATION).map((item) => (
                          <Menu.Item key={item.name}>
                            {({ active }) =>
                              item.href === "/logout" ? (
                                <button
                                  onClick={() => setOpenLogout(true)}
                                  className={`w-full text-left block px-3 py-1 manrope-medium-md text-dark-gray hover:text-[#331869] ${active ? "bg-[#F7F5FD] text-[#331869]" : ""}`}
                                >
                                  {item.name}
                                </button>
                              ) : (
                                <Link
                                  href={item.href}
                                  className={`block px-3 py-1 manrope-medium-md text-dark-gray hover:text-[#331869] ${active ? "bg-[#F7F5FD] text-[#331869]" : ""}`}
                                >
                                  {item.name}
                                </Link>
                              )
                            }
                          </Menu.Item>
                        ))}
                      </Menu.Items>
                    </Transition>
                  </Menu>
                )}
              </div>
            </div>
          </div>

          <div className={`${collapsed ? "lg:pl-25" : "lg:pl-58"} pt-15 min-h-screen transition-all duration-300`}>
            <main className="bg-gradient-to-b from-[#F7F8F8] to-[#FBF7F4] p-4 min-h-[calc(100vh-60px)]">
              <div>{children}</div>
            </main>
          </div>
          <Logout open={openLogout} setOpen={setOpenLogout} />
        </>
      )}
    </>
  );
}
