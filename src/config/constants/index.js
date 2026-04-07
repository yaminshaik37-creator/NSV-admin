import { useTranslation } from 'react-i18next';

import { DashboardIcon, Profile, ActivityLog, Logout, PatientIcon, DoctorIcon, TestTubeIcon, ReportsIcon, PaymentIcon, StaffIcon, HolidayCalendarIcon, AppointmentIcon, ManageCenterIcon, ResourceIcon, TimeBasedDiscountIcon, BillingIcon } from '../icons';


export const useTranslatedConstants = () => {

    const { t } = useTranslation();

    const FormError = {
        ERROR: t('ERRORS.ERROR'),
        FIELD_REQUIRED_MFA: t('ERRORS.FIELD_REQUIRED_MFA'),
        EMAIL_FORMAT: t('ERRORS.EMAIL_FORMAT'),
        FIELD_REQUIRED: t('ERRORS.FIELD_REQUIRED'),
        NUMBER_FORMAT: t('ERRORS.NUMBER_FORMAT'),
        INVALID_LENGTH: t('ERRORS.INVALID_LENGTH'),
        MIN_LENGTH: t('ERRORS.MIN_LENGTH'),
        ERR_ADD_TELEPHONE: t('ERRORS.ERR_ADD_TELEPHONE'),
        CONFIRM_PASS_REQ: t('ERRORS.CONFIRM_PASS_REQ'),
        PASS_REQ: t('ERRORS.PASS_REQ'),
        INCORRECT_PASSWORD: 'Password must be at least 8 characters long and include one uppercase letter, one lowercase letter, one number, and one special character.',
        INCORRECT_MOBILE: t('ERRORS.INCORRECT_MOBILE'),
        INCORRECT_EMAIL: t('ERRORS.INCORRECT_EMAIL'),
        SELECT_1_SERVICE: t('ERRORS.SELECT_1_SERVICE'),
        MICROSOFT_ERR: t('ERRORS.MICROSOFT_ERR'),
        STORE_PRICE_ERR: t('ERRORS.STORE_PRICE_ERR'),
        ALPHABETS: t('ERRORS.ALPHABETS'),
        EXISTING_NO: t('ERRORS.EXISTING_NO'),
        EXISTING_EMAIL: t('ERRORS.EXISTING_EMAIL'),
        WRONG_PASSWORD: t('ERRORS.WRONG_PASSWORD'),
        ERR_UPDATING_RESELLER: t('ERRORS.ERR_UPDATING_RESELLER'),
        DELETE_ADMIN_ERR: t('ERRORS.DELETE_ADMIN_ERR'),
        INVALID_NUMBER: t('ERRORS.INVALID_NUMBER'),
        INVALID_YEAR: t('ERRORS.INVALID_YEAR'),
        FUTURE_YEAR: t('ERRORS.FUTURE_YEAR'),
        ADMIN_CHECK_NO: t('ERRORS.ADMIN_CHECK_NO'),
        QUOT_PRICE_ERR: t('ERRORS.QUOT_PRICE_ERR'),
        CREDIT_ERR: t('ERRORS.CREDIT_ERR'),
        SAVED: t('SUCCESS.SAVED'),
        INVALID_URL: t('ERRORS.INVALID_URL'),
        INVALID_TIME: t('ERRORS.INVALID_TIME'),
        INVALID_TIME_RANGE: t('ERRORS.INVALID_TIME_RANGE'),
        TIME_SLOT_OVERLAP: t('ERRORS.TIME_SLOT_OVERLAP'),
        HOLIDAY_NAME_REQUIRED: t('ERRORS.HOLIDAY_NAME_REQUIRED'),
        HOLIDAY_TYPE_REQUIRED: t('ERRORS.HOLIDAY_TYPE_REQUIRED'),
        INVALID_DATE: t('ERRORS.INVALID_DATE'),
        WEEKDAY_RANGE: t('ERRORS.WEEKDAY_RANGE'),
        INVALID_EMAIL: t('ERRORS.INVALID_EMAIL'),
        MIN_LENGTH: t('ERRORS.MIN_LENGTH'),
        MAX_LENGTH: t('ERRORS.MAX_LENGTH'),
        TO_TIME: t('ERRORS.TO_TIME'),
        INVALID_LENGTH_15: t('ERRORS.INVALID_LENGTH_15'),
        MAX_DISCOUNT: t('ERRORS.MAX_DISCOUNT'),
        LESS_DISCOUNT: t('ERRORS.LESS_DISCOUNT'),
        WRONG_PASSWORD: t('ERRORS.WRONG_PASSWORD'),
        ONLY_NUMBERS: t('ERRORS.ONLY_NUMBERS'),
        NOT_DECIMAL: t('ERRORS.NOT_DECIMAL'),
    };

    const MESSAGE = {
        PROFILE_UPDATED: t("SUCCESS.PROFILE_UPDATED"),
        REPORT_SENT: t("SUCCESS.REPORT_SENT"),
        DELETE_CENTER: t("SUCCESS.DELETE_CENTER"),
        NO_REPORTS_TO_SEND: t('ERRORS.NO_REPORTS_TO_SEND'),
        SAVED: t('SUCCESS.SAVED'),
        RESELLER_ADDED: t('SUCCESS.RESELLER_ADDED'),
        RESELLER_UPDATED: t('SUCCESS.RESELLER_UPDATED'),
        ROLE_ADDED: t('SUCCESS.ROLE_ADDED'),
        AITEK_MEMBER_ADDED: t('SUCCESS.AITEK_MEMBER_ADDED'),
        AITEK_MEMBER_UPDATED: t('SUCCESS.AITEK_MEMBER_UPDATED'),
        ROLE_UPDATED: t('SUCCESS.ROLE_UPDATED'),
        EXCEL_DOWNLOAD_ERROR: t('SUCCESS.EXCEL_DOWNLOAD_ERROR'),
        QUOTATION_ADDED: t('SUCCESS.QUOTATION_ADDED'),
        QUOTATION_UPDATED: t('SUCCESS.QUOTATION_UPDATED'),
        QUOTATION_REJECTED: t('SUCCESS.QUOTATION_REJECTED'),
        IMAGE_UPLOAD_FAIL: 'Error While uploading document',
        TICKET_UPDATED_SUCCESS: t('SUCCESS.TICKET_UPDATED_SUCCESS'),
        PROFILE_UPDATED: t('SUCCESS.PROFILE_UPDATED'),
        TAG_ADDED: t('SUCCESS.TAG_ADDED'),
        TAG_UPDATED: t('SUCCESS.TAG_UPDATED'),
        CAT_ADDED: t('SUCCESS.CAT_ADDED'),
        CAT_UPDATED: t('SUCCESS.CAT_UPDATED'),
        PRODUCT_ADDED: t('SUCCESS.PRODUCT_ADDED'),
        CROSSSELL_ADDED: t('SUCCESS.CROSSSELL_ADDED'),
        CROSSSELL_UPDATED: t('SUCCESS.CROSSSELL_UPDATED'),
        PRODUCT_UPDATED: t('SUCCESS.PRODUCT_UPDATED'),
        LOGOUT_SUCCESS: t('SUCCESS.LOGOUT_SUCCESS'),
        TAX_UPDATED: t('SUCCESS.TAX_UPDATED'),
        PM_UPDATED: t('SUCCESS.PM_UPDATED'),
        PASSWORD_UPDATED: t('SUCCESS.PASSWORD_UPDATED'),
        ORDER_CREATED: t('SUCCESS.ORDER_CREATED'),
        ORDER_NOTE_CREATED: t('SUCCESS.ORDER_NOTE_CREATED'),
        REQUEST_QUOT: t('SUCCESS.REQUEST_QUOT'),
        REQUEST_QUOT_ERR: t('ERRORS.REQUEST_QUOT_ERR'),
        QUOT_ACCEPT: t('SUCCESS.QUOT_ACCEPT'),
        CUSTOMER_ADDED: t('SUCCESS.CUSTOMER_ADDED'),
        CUSTOMER_UPDATED: t('SUCCESS.CUSTOMER_UPDATED'),
        DELETE_ADMIN: t('SUCCESS.DELETE_ADMIN'),
        ENABLED: t('SUCCESS.ENABLED'),
        MFA_ENABLED: t('SUCCESS.MFA_ENABLED'),
        DISABLED: t('SUCCESS.DISABLED'),
        ORDER_PLACE: t('SUCCESS.ORDER_PLACE'),
        QTY_MODIFIED: t('SUCCESS.QTY_MODIFIED'),
        HARD_CANCEL: t('SUCCESS.HARD_CANCEL'),
        VALIDATION_ERR: t('ERRORS.VALIDATION_ERR'),
        REQ_ACCEPTED: t('SUCCESS.REQ_ACCEPTED'),
        ORDER_PAID: t('SUCCESS.ORDER_PAID'),
        ORDER_STATUS_UPDATED: t('SUCCESS.ORDER_STATUS_UPDATED'),
        ORDER_REJECTED: t('SUCCESS.ORDER_REJECTED'),
        REQUEST_APPROVED: t('SUCCESS.REQUEST_APPROVED'),
        BANK_ADD_SUCCESS: t('SUCCESS.BANK_ADDED'),
        BANK_DELETE: t('SUCCESS.BANK_DELETE'),
        REFUND_SUCCESS: t('SUCCESS.REFUND_SUCCESS'),
        MIN_MAX_ERROR: (min, max) => `Minimum quantity should be ${min} and maximum quantity should be ${max}`,
        MIN_CART_ERR: (qty) => `${t('ERRORS.MIN_CART_ERR')} ${qty}`,
        Q_MAX_CART_ERR: (qty) => `${t('ERRORS.Q_MAX_CART_ERR')} ${qty}`,
        LOGOUT_SUCCESS: t('SUCCESS.LOGOUT_SUCCESS'),
        REFUND_PROCESS: t('SUCCESS.REFUND_PROCESS'),
        BLACKLIST_SUCCESS: t('SUCCESS.BLACKLIST_SUCCESS'),
        BLACKLIST_REMOVED: t('SUCCESS.BLACKLIST_REMOVED'),
        TICKET_STATUS_SUCCESS: t('SUCCESS.TICKET_STATUS_SUCCESS'),
        SELECT_1_IMG: t('ERRORS.SELECT_1_IMG'),
        DOMAIN_COPIED: t('SUCCESS.DOMAIN_COPIED'),
        DOMAIN_COPY_FAILED: (err) => `${t('ERRORS.DOMAIN_COPY_FAILED')} ${err}`,
        PASSWORD_UPDATED: t('SUCCESS.PASSWORD_UPDATED'),
        LINK_COPY: 'Link Copied Successfully',
    };

    const REGISTER_TAB = {
        INITAL: t('REGISTER_TAB.INITAL'),
        VERIFY_OTP: t('REGISTER_TAB.VERIFY_OTP'),
        UPDATE_USER: t('REGISTER_TAB.UPDATE_USER'),
        ADD_ADDRESS: t('REGISTER_TAB.ADD_ADDRESS'),
    };


    const ADMIN_NAVIGATIONS = [
        { name: t('NAVIGATIONS.DASHBOARD'), href: '/dashboard', icon: DashboardIcon, default: true },
        { name: t('NAVIGATIONS.CENTERS'), href: '/manage-centers', icon: ManageCenterIcon, default: true },
        { name: t('NAVIGATIONS.DOCTORS'), href: '/manage-doctors', icon: DoctorIcon, default: true },
        { name: t('NAVIGATIONS.PATIENTS'), href: '/manage-patients', icon: PatientIcon, default: true },
        { name: 'Test Master', href: '/test-master', icon: TestTubeIcon, default: true },
        // { name: 'Reports', href: '/reports', icon: ReportsIcon, default: true },
        { name: t('NAVIGATIONS.ACTIVITY_LOG'), href: '/activity-log', icon: ActivityLog, default: true },
        { name: t('NAVIGATIONS.PROFILE'), href: '/profile', icon: Profile, default: true },
        { name: 'Logout', href: '/logout', icon: Logout, default: true, },
    ];

    const DC_NAVIGATIONS = [
        { name: t('NAVIGATIONS.DASHBOARD'), href: '/dashboard', icon: DashboardIcon, default: true },
        { name: t('NAVIGATIONS.APPOINTMENTS'), href: '/appointments', icon: AppointmentIcon, default: true },
        { name: t('NAVIGATIONS.DOCTORS'), href: '/manage-doctors', icon: DoctorIcon, default: true },
        { name: t('NAVIGATIONS.PATIENTS'), href: '/manage-patients', icon: PatientIcon, default: true },
        { name: t('NAVIGATIONS.TEST_CATALOG'), href: '/manage-tests', icon: TestTubeIcon, default: true },
        { name: t('NAVIGATIONS.MANAGE_RESOURCES'), href: '/manage-resources', icon: ResourceIcon, default: true },
        { name: t('NAVIGATIONS.STAFF'), href: '/manage-staffs', icon: StaffIcon, default: true },
        { name: t('NAVIGATIONS.MANAGE_HOLIDAY'), href: '/manage-holidays', icon: HolidayCalendarIcon, default: true },
        { name: t('NAVIGATIONS.MANAGE_TIME_BASED_DISCOUNTS'), href: '/manage-time-based-discounts', icon: TimeBasedDiscountIcon, default: true },
        // { name: 'Reports', href: '/reports', icon: ReportsIcon, default: true },
        { name: t('NAVIGATIONS.PROFILE'), href: '/profile', icon: Profile, default: true },
        { name: 'Logout', href: '/logout', icon: Logout, default: true, },
    ]

    const DOCTOR_NAVIGATIONS = [
        { name: t('NAVIGATIONS.DASHBOARD'), href: '/dashboard', icon: DashboardIcon, default: true },
        { name: t('NAVIGATIONS.PATIENTS'), href: '/manage-patients', icon: PatientIcon, default: true },
        { name: t('NAVIGATIONS.APPOINTMENTS'), href: '/appointments', icon: AppointmentIcon, default: true },
        { name: t('NAVIGATIONS.PROFILE'), href: '/profile', icon: Profile, default: true },
        { name: 'Payments', href: '/doctor-payments', icon: PaymentIcon, default: true },
        { name: 'Reports', href: '/my-reports', icon: ReportsIcon, default: true },
        { name: 'Logout', href: '/logout', icon: Logout, default: true, },
    ];

    const PATIENT_NAVIGATIONS = [
        { name: t('NAVIGATIONS.DASHBOARD'), href: '/dashboard', icon: DashboardIcon, default: true },
        { name: 'Tests', href: '/my-tests', icon: AppointmentIcon, default: true },
        { name: t('NAVIGATIONS.PROFILE'), href: '/profile', icon: Profile, default: true },
        { name: 'Reports', href: '/my-reports', icon: ReportsIcon, default: true },
        { name: 'Logout', href: '/logout', icon: Logout, default: true, },
    ];

    const USERNAVIGATION = [
        { name: t('USERNAVIGATION.PROFILE'), href: '/profile' },
        { name: t('USERNAVIGATION.SIGN_OUT'), href: '/logout' },
    ]


    return {
        FormError,
        MESSAGE,
        REGISTER_TAB,
        UNPROTECTEDROUTES,
        USERNAVIGATION,
        DEFAULT_MAX_FILE_SIZE_IN_BYTES,
        FORMATS,
        ADMIN_NAVIGATIONS,
        DC_NAVIGATIONS,
        DOCTOR_NAVIGATIONS,
        PATIENT_NAVIGATIONS
    };
};

export const FORMATS = ['jpg', 'png', 'bmp', 'jpeg', 'tiff', 'pdf', 'doc', 'docx', 'heic'];
export const DAY_LABELS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

export const DEFAULT_MAX_FILE_SIZE_IN_BYTES = 10 * 1024 * 1024;

export const UNPROTECTEDROUTES = {
    LOGIN: "/login",
    REGISTER: "/register",
    LOGOUT: "/logout",
};
export const SETTINGS = {
    dots: true,
    infinite: true,
    speed: 300,
    slidesToShow: 1,
    adaptiveHeight: true,
    responsive: [
        {
            breakpoint: 1024,
            settings: {
                dots: true,
                infinite: true,
                speed: 300,
                slidesToShow: 1,
                adaptiveHeight: true,
            }
        },
        {
            breakpoint: 600,
            settings: {
                dots: true,
                infinite: true,
                speed: 300,
                slidesToShow: 1,
                adaptiveHeight: true,
            }
        },
        {
            breakpoint: 480,
            settings: {
                dots: true,
                infinite: true,
                speed: 300,
                slidesToShow: 1,
                adaptiveHeight: true,
            }
        }

    ]
};


export const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export const FILTER_VENDORS = []

export const CENTER_STATUS = [
    { label: "Invited", value: "Invited" },
    { label: "Active", value: "Active" },
    { label: "Expired", value: "Expired" },
]
export const MSG = {
    OTP_SUCCESS: 'OTP sent successfully.',
    PASSWORD_UPDATED: 'Password updated successfully.',
    ERR_OTP: 'Invalid OTP.',
    ERR_PSWD: 'Invalid password.',
    DC_ADDED: 'Diagnostic Center added successfully.',
    APPT_BOOKED: 'Appointment has been successfully booked.',
    IMAGE_UPLOAD_FAIL: 'Error While uploading document',

}

export const DAY_OPTIONS = [
    { value: 1, label: "Monday" },
    { value: 2, label: "Tuesday" },
    { value: 3, label: "Wednesday" },
    { value: 4, label: "Thursday" },
    { value: 5, label: "Friday" },
    { value: 6, label: "Saturday" },
    { value: 7, label: "Sunday" },
];

export const WEEK_OF_MONTH_OPTIONS = [
    { value: 6, label: "All" },
    { value: 1, label: "First" },
    { value: 2, label: "Second" },
    { value: 3, label: "Third" },
    { value: 4, label: "Fourth" },
    // { value: 5, label: "Fifth" },
];
export const DAYS_OBJ = {
    1: "Monday",
    2: "Tuesday",
    3: "Wednesday",
    4: "Thursday",
    5: "Friday",
    6: "Saturday",
    7: "Sunday",
}

export const MED_CONDITIONS = [
    { label: "Asthma", value: 3 },
    { label: "Cancer", value: 4 },
    { label: "Diabetes", value: 1 },
    { label: "Heart Disease", value: 6 },
    { label: "Hypertension", value: 2 },
    { label: "Kidney Disease", value: 5 },
    { label: "Stroke", value: 7 },
];

export const SPECIALITY_OPTIONS = [
    { value: 'cardiology', label: 'Cardiology' },
    { value: 'neurology', label: 'Neurology' },
    { value: 'orthopedics', label: 'Orthopedics' },
    { value: 'pediatrics', label: 'Pediatrics' },
    { value: 'gynecology', label: 'Gynecology' },
];

export const DATE_FILTER = [
    { value: 'last_week', label: 'Last Week' },
    { value: 'last_month', label: 'Last Month' },
    { value: 'custom', label: 'Custom Date' },
];

export const timeInMinutes = [
    { label: 'Minutes', value: 1 },
    { label: 'Hours', value: 60 },
    { label: 'Days', value: 1440 },
    { label: 'Weeks', value: 10080 },
];


export const TAB_CONTENT = [
    { label: "Appointments", icon: <AppointmentIcon /> },
    { label: "Billing", icon: <BillingIcon /> },
    { label: "Reports", icon: <ReportsIcon /> },
];

export const STAFF_UPLOADTYPE = "image/png, image/jpeg, image/jpg, image/heic"

export const GENDER_OPTIONS = [
    { value: 'male', label: 'Male' },
    { value: 'female', label: 'Female' },
    { value: 'other', label: 'Other' },
];

export const STATUS = ["upcoming", "pending", "completed"];

export const USER_TYPES = {
    OWNER_ADMIN: 'owner_admin',
    DC: 'dc_admin',
    DOC: 'doctor',
    PATIENT: 'patient',
}

export const COVERS = {
    owner_admin: 'dc-login-image.png',
    dc_admin: 'dc-login-image.png',
    doctor: 'doc-login-image.png',
    patient: 'patient-login-image.png',
}

export const LOGOS = {
    doctor: 'login-logo-dc.png',
    owner_admin: 'IC-logo-horizontal.svg',
    dc_admin: 'IC-logo-horizontal.svg',
    patient: 'IC-logo-horizontal.svg',
}

export const STATUS_TYPE = [{ value: true, label: 'Allow' }, { value: false, label: 'Not Allow' }]

export const DC_PAYMENT_TYPE = [{ value: 'dc_offline', label: 'DC Offline' }, { value: 'patient_online', label: 'Patient Online' }]
export const DOC_PAYMENT_TYPE = [{ value: 'doctor_points', label: 'Clinician Offline' }, { value: 'doctor_online', label: 'Clinician Online' }, { value: 'patient_online', label: 'Patient Online' }]
export const DOC_PAYMENT_TYPE_NO_PTS = [{ value: 'doctor_online', label: 'Clinician Online' }, { value: 'patient_online', label: 'Patient Online' }]
export const TBC_RADIO = [{ value: 'discount', label: 'Discount' }, { value: 'premium', label: 'Premium' }]

export const DEFAULT_ALL = [{ value: "all", label: "Select All" }]

export const APPT_STATUS = {
    booked: 'Booked',
    no_show: 'No Show',
    completed: 'Completed',
    partial_completed: 'Partially Completed',
    paid: 'Paid',
    partial_paid: 'Partial Paid',
    partial_report_sent: 'Partial Report Sent',
    report_sent: 'Report Sent',
    deleted: 'Deleted',
}

export const STAFF_DASH_BTNS = [
    {
        label: "Total",
        value: "total_staff",
        tab: 0,
        status: "",
        color: "text-teal"
    },
    {
        label: "Active",
        value: "active_staff",
        tab: 1,
        status: "active",
        color: "text-blue"
    },
    {
        label: "Non-active",
        value: "invited_staff",
        tab: 2,
        status: "in_active",
        color: "text-green"
    }
]


export const APPT_STEPS = [
    { label: "Mobile" },
    { label: "Details" },
    { label: "Tests" },
    { label: "Payment" },
];
export const PATIENT_APPT_STEPS = [
    { label: "Details" },
    { label: "Tests" },
    { label: "Payment" },
];

export const stateCoordinates = {
    andhra_pradesh: [15.9129, 79.7400],
    arunachal_pradesh: [28.2180, 94.7278],
    assam: [26.2006, 92.9376],
    bihar: [25.0961, 85.3131],
    chhattisgarh: [21.2787, 81.8661],
    goa: [15.2993, 74.1240],
    gujarat: [22.2587, 71.1924],
    haryana: [29.0588, 76.0856],
    himachal_pradesh: [31.1048, 77.1734],
    jharkhand: [23.6102, 85.2799],
    karnataka: [15.3173, 75.7139],
    kerala: [10.8505, 76.2711],
    madhya_pradesh: [22.9734, 78.6569],
    maharashtra: [19.7515, 75.7139],
    manipur: [24.6637, 93.9063],
    meghalaya: [25.4670, 91.3662],
    mizoram: [23.1645, 92.9376],
    nagaland: [26.1584, 94.5624],
    odisha: [20.9517, 85.0985],
    punjab: [31.1471, 75.3412],
    rajasthan: [27.0238, 74.2179],
    sikkim: [27.5330, 88.5122],
    tamil_nadu: [11.1271, 78.6569],
    telangana: [18.1124, 79.0193],
    tripura: [23.9408, 91.9882],
    uttar_pradesh: [26.8467, 80.9462],
    uttarakhand: [30.0668, 79.0193],
    west_bengal: [22.9868, 87.8550],

    // ✅ Union Territories
    andaman_and_nicobar_islands: [11.7401, 92.6586],
    chandigarh: [30.7333, 76.7794],
    dadra_and_nagar_haveli_and_daman_and_diu: [20.4283, 72.8397],
    delhi: [28.7041, 77.1025],
    jammu_and_kashmir: [33.7782, 76.5762],
    ladakh: [34.1526, 77.5770],
    lakshadweep: [10.5667, 72.6417],
    puducherry: [11.9416, 79.8083]
};

export const stateAliasMap = {
    // ✅ Common misspellings
    gujrat: "gujarat",
    gujraat: "gujarat",
    maharastra: "maharashtra",
    delhi_ncr: "delhi",
    uttrakhand: "uttarakhand",
    uttarkhand: "uttarakhand",
    telengana: "telangana",
    andhrapradesh: "andhra_pradesh",
    keral: "kerala",
    tamilnadu: "tamil_nadu",
    bengal: "west_bengal",
    orissa: "odisha",
    chattisgarh: "chhattisgarh",

    // ✅ Major city → state mappings
    mumbai: "maharashtra",
    pune: "maharashtra",
    nagpur: "maharashtra",

    ahmedabad: "gujarat",
    surat: "gujarat",
    vadodara: "gujarat",

    bangalore: "karnataka",
    bengaluru: "karnataka",
    mysore: "karnataka",

    chennai: "tamil_nadu",
    coimbatore: "tamil_nadu",
    madurai: "tamil_nadu",

    hyderabad: "telangana",
    warangal: "telangana",

    kolkata: "west_bengal",
    howrah: "west_bengal",

    jaipur: "rajasthan",
    udaipur: "rajasthan",

    lucknow: "uttar_pradesh",
    kanpur: "uttar_pradesh",
    varanasi: "uttar_pradesh",

    patna: "bihar",
    gaya: "bihar",

    bhopal: "madhya_pradesh",
    indore: "madhya_pradesh",

    raipur: "chhattisgarh",

    ranchi: "jharkhand",

    chandigarh_city: "chandigarh",

    shimla: "himachal_pradesh",

    dehradun: "uttarakhand",

    guwahati: "assam",

    imphal: "manipur",

    shillong: "meghalaya",

    aizawl: "mizoram",

    kohima: "nagaland",

    agartala: "tripura",

    gangtok: "sikkim",

    panaji: "goa",

    kochi: "kerala",
    trivandrum: "kerala",
    thiruvananthapuram: "kerala",

    // ✅ UT mappings / variations
    pondicherry: "puducherry",
    puduchery: "puducherry",

    daman_diu: "dadra_and_nagar_haveli_and_daman_and_diu",
    dadra_nagar_haveli: "dadra_and_nagar_haveli_and_daman_and_diu",

    andaman: "andaman_and_nicobar_islands",
    nicobar: "andaman_and_nicobar_islands",

    kashmir: "jammu_and_kashmir",
    jammu: "jammu_and_kashmir",

    ladakh_region: "ladakh",

    lakshadweep_islands: "lakshadweep"
};