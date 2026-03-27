import Modal from "../UI/Modal";
import { useState } from "react";
import { useTranslation } from "react-i18next";

const NotificationDropdown = ({ open, setOpen, buttonRef }) => {
    const { t } = useTranslation();

    // Sample notification data
    const [notifications] = useState([
        {
            id: 1,
            message: "You have a new appointment with Dr. Smith on March 15th at 2:00 PM",
            isRead: false
        },
        {
            id: 2,
            message: "Your recent blood test results are now available for review",
            isRead: false
        },
        {
            id: 3,
            message: "Your recent blood test results are now available for review",
            isRead: true
        },
        {
            id: 4,
            message: "Scheduled maintenance will occur tonight from 11 PM to 1 AM",
            isRead: true
        },
        {
            id: 4,
            message: "Scheduled maintenance will occur tonight from 11 PM to 1 AM",
            isRead: true
        },
        {
            id: 4,
            message: "Scheduled maintenance will occur tonight from 11 PM to 1 AM",
            isRead: true
        },
        {
            id: 4,
            message: "Scheduled maintenance will occur tonight from 11 PM to 1 AM",
            isRead: true
        }
    ]);

    return (
        <Modal open={open} setOpen={setOpen} title="Notification" classNames="max-w-2xl rounded-lg" isDropdown={true}>
            <hr className="border border-[#DFE2E2]" />
            
            {/* Notifications List */}
            <div className="max-h-80 overflow-y-auto">
                {notifications.length === 0 ? (
                    <div className="text-center py-8">
                        <p className="text-gray-500 manrope-regular-md">No notifications</p>
                    </div>
                ) : (
                    <div>
                        {notifications.map((notification, index) => (
                            <div key={notification.id}>
                                <div className={`py-5 cursor-pointer`}>
                                    <div className="flex items-start justify-between">
                                        <div className="flex-1">
                                            <div className="flex items-center gap-2">
                                                {!notification.isRead && (<div className="w-2 h-2 bg-[#018B85] rounded-full flex-shrink-0"></div>)}
                                                <p className="text-dark-gray manrope-medium-sm line-clamp-2">
                                                    {notification.message}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {index < notifications.length - 1 && (<hr className="border-gray-200" />)}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </Modal>
    );
};

export default NotificationDropdown;