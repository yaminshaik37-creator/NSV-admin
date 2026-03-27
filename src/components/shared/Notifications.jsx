'use client'
import { useEffect, useState } from "react";

import { API_ENDPOINTS } from "@/config/api-endpoints";
import ApiCall from "@/service/api";

import BellGreenIcon from "@/images/icons/BellGreenIcon"

const Notifications = () => {
    const [notification, setNotification] = useState([]);

    useEffect(() => {
        getNotification()
    }, []);

    const getNotification = async () => {
        try {
            const res = await ApiCall({ url: API_ENDPOINTS.NOTIFICATIONS });
            if (res.success) { setNotification(res.data || []) }
        } catch (err) { }
    };

    return (
        <>
            <div className="bg-white rounded-lg p-4 mt-8">
                <div className="flex items-center gap-2 mt-2">
                    <div className="w-4 h-4 flex justify-center items-center">
                        <BellGreenIcon />
                    </div>
                    <h2 className="manrope-bold-xl text-dark-gray">
                        Notification ({notification.length})
                    </h2>
                </div>
                <hr className="border border-[#DFE2E2] my-4" />
                {notification?.map((notification, index) => (
                    <div
                        key={index}
                        className="flex mb-4 justify-between items-center border border-[#DFE2E2] rounded-lg p-4 text-base text-dark-gray"
                    >
                        <div className="flex flex-col gap-0.5">
                            <p className="text-sm font-semibold text-primary-600">{notification.subject}</p>
                            <p className="text-sm text-gray-700">{notification.message}</p>
                        </div>
                    </div>
                ))}
            </div>
        </>
    )
}

export default Notifications