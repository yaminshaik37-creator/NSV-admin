const MASTER_API_URL = process.env.MASTER_API_URL;
const USER_API_URL = process.env.USER_API_URL;
const IMAGE_API_URL = process.env.IMAGE_API_URL;
const PAYMENT_API_URL = process.env.PAYMENT_API_URL;
const UPDATES_API_URL = process.env.UPDATES_API_URL;
const NETWORK_DIRECTOR_API_URL = process.env.NETWORK_DIRECTOR_API_URL;
const CLINIC_ADMINISTRATION_API_URL = process.env.CLINIC_ADMINISTRATION_API_URL;
const PROGRAM_DIRECTOR_API_URL = process.env.PROGRAM_DIRECTOR_API_URL;
const POLICY_MAKER_API_URL = process.env.POLICY_MAKER_API_URL;


export const API_ENDPOINTS = {
    EXECUTIVE_UPDATES: UPDATES_API_URL + 'nsv-executive-executive-kpis',
    EXECUTIVE_PROCEDURES_OVER_TIME: UPDATES_API_URL + 'nsv-executive-procedure-overtime',
    DASHBOARD_ALERTS: UPDATES_API_URL + 'nsv-executive-dashboard-alerts',
    EXECUTIVE_NATIONAL_COVERAGE: UPDATES_API_URL + 'national-coverage',
    PROCEDURES_VOLUME_BY_STATE: UPDATES_API_URL + 'nsv-executive-procedure-volume-by-state',
    QUALITY_METRICS: UPDATES_API_URL + 'quality-metrics',

    // NSV NETWORK DIRECTOR

    UNDERPERFORMING_CENTER: NETWORK_DIRECTOR_API_URL + 'underperforming-center',
    NETWORK_KPIS: NETWORK_DIRECTOR_API_URL + 'network-kpis',
    CENTER_PERFORMANCE_OVERVIEW: NETWORK_DIRECTOR_API_URL + 'center-performance-overview',
    NETWORK_NATIONAL_COVERAGE: NETWORK_DIRECTOR_API_URL + 'national-coverage',
    NETWORK_PROCEDURES_OVER_TIME: NETWORK_DIRECTOR_API_URL + 'procedure-overtime',
    NETWORK_PROCEDURES_VOLUME_BY_STATE: NETWORK_DIRECTOR_API_URL + 'procedures-volume-by-state',

    // NSV CLIENT ADMINISTRATION
    CLIENT_INSIGHTS: CLINIC_ADMINISTRATION_API_URL + 'insightsAlerts',
    CLIENT_ADMISNISTRATION_CLIENT_UPDATES: CLINIC_ADMINISTRATION_API_URL + 'updatesKpis',
    DEVICE_STATUS: CLINIC_ADMINISTRATION_API_URL + 'deviceStatusCards',
    DEVICES_DASHBOARD: CLINIC_ADMINISTRATION_API_URL + 'deviceDashboard',
    DEVICE_STATUS_ACTIVE_INACTIVE: CLINIC_ADMINISTRATION_API_URL + 'deviceStatus',


    // NSV PROGRAM DIRECTOR

    UPDATES_DASHBOARD: PROGRAM_DIRECTOR_API_URL + 'updates',
    GLOBAL_COVERAGE: PROGRAM_DIRECTOR_API_URL + 'global-coverage',
    DEVICE_UTILIZATION: PROGRAM_DIRECTOR_API_URL + 'device-utilization',
    INFRASTRUCTURE_CHART: PROGRAM_DIRECTOR_API_URL + 'infrastructure-chart',

    //Policy Maker

    NATIONAL_COVERAGE: POLICY_MAKER_API_URL + 'national-coverage',
    UPDATES_KPIS: POLICY_MAKER_API_URL + 'national-updates-kpis',
    CLINICS_PERFORMANCE_DETAILS: POLICY_MAKER_API_URL + 'clinics-performance-by-state',



    LOGIN: USER_API_URL + 'login',
    SEND_OTP: USER_API_URL + 'send-otp',
    VERIFY_OTP: USER_API_URL + 'verify-otp',
    LOGIN_OTP: USER_API_URL + 'otp-login',
    PASSWORD_LOGIN: USER_API_URL + 'password-login',
    REGISTER: USER_API_URL + 'register',
    UPDATE_USER: USER_API_URL + 'update-user',
    PROFILE: USER_API_URL + 'profile',
    CHANGE_PASSWORD: USER_API_URL + 'change-password',
    RESET_PASSWORD: USER_API_URL + 'reset-password',
    RELATIONS: USER_API_URL + 'relation',
    REF_DC: USER_API_URL + 'refrence-dc',


    PINCODE_MASTER: MASTER_API_URL + 'pincode',
    NOTIFICATIONS: MASTER_API_URL + 'notification',
    DC: MASTER_API_URL + 'diagnostic-center',
    DC_LIST: MASTER_API_URL + 'dc-list',
    DC_COUNT: MASTER_API_URL + 'dc-counts',

    UPLOAD_IMG: IMAGE_API_URL + 'upload-image',

    // -------------- FOR SUBSCRIPTIONS --------------
    PLANS: PAYMENT_API_URL + 'plans',
    START_PAYMENT: PAYMENT_API_URL + 'payment',
    RAZORPAY_VERIFY: PAYMENT_API_URL + 'razorpay-verify',


    APPOINTMENT: {
        ADD: MASTER_API_URL + "appointment",
        SLOT: MASTER_API_URL + "appointment/available-slots",
        UNAVAILABLE_DATES: MASTER_API_URL + "appointment/unavailable-dates",
        LIST: MASTER_API_URL + "appointment-list",
        DETAIL: MASTER_API_URL + "appointment/{{id}}",
        REPORT_LIST: MASTER_API_URL + "get-documents",
        PAT_CONSENT: MASTER_API_URL + "appointment/patient-consent",
        UPLOAD_DOC: MASTER_API_URL + "document",
        DELETE_DOC: MASTER_API_URL + "document/{{id}}",
        UPDATE_TEST: MASTER_API_URL + "appointment/update-test-status",
        UPDATE_NOTE: MASTER_API_URL + "appointment/update-note",
        DASHBOARD: MASTER_API_URL + "appointment/dashboard",
        BEST_SLOTS: MASTER_API_URL + "appointment/slots",
    },
    MASTER_LOOKUP: {
        PINCODE_LIST: MASTER_API_URL + 'master/pincode/search',
        TEST_TYPES: MASTER_API_URL + "master/test-types/search",
        CATEGORIES: MASTER_API_URL + "master/categories/{{test_type_id}}",
        SUBCATEGORIES: MASTER_API_URL + "master/subcategories/{{test_type_id}}/{{category_id}}",
        ROLE_LIST_BY_DC: MASTER_API_URL + "master/dc/{{fk_dc_id}}/roles"
    },

    MANAGE_RESOURCE: {
        LIST: MASTER_API_URL + "resource-list",
        UPSERT: MASTER_API_URL + "resource",
        DELETE: MASTER_API_URL + "resource/{{id}}",
        SLOT_DELETE: MASTER_API_URL + "resource/time-slot/{{id}}",
    },

    MANAGE_PATIENT: {
        LIST: USER_API_URL + "patient-list",
        APPT: USER_API_URL + "patient-appt",
        UPSERT: USER_API_URL + "patient",
        DELETE: USER_API_URL + "patient/{{id}}",
        DETAIL: USER_API_URL + "patient/{{id}}",
        APPOINTMENT: MASTER_API_URL + "appointments",
    },

    MANAGE_HOLIDAY: {
        LIST: MASTER_API_URL + "holiday-list",
        UPSERT: MASTER_API_URL + "holiday",
        DELETE: MASTER_API_URL + "holiday/{{id}}",
    },
    MASTER: {
        MED_CONDITIONS: MASTER_API_URL + "medical-condition-master",
        SPECIALITY: MASTER_API_URL + "speciality-master",
        TEST_TYPE: MASTER_API_URL + "test-type",
    },

    MANAGE_STAFF: {
        LIST: USER_API_URL + "staff-list",
        UPSERT: USER_API_URL + "staff",
        DELETE: USER_API_URL + "staff/{{id}}",
        DETAIL: USER_API_URL + "staff/{{id}}",
        DASHBOARD: USER_API_URL + "staff-dashboard",
    },

    MANAGE_DOCTOR: {
        LIST: USER_API_URL + "doctor-list",
        UPSERT: USER_API_URL + "doctor",
        DELETE: USER_API_URL + "doctor/{{id}}",
        DETAIL: USER_API_URL + "doctor/{{id}}",
        DETAIL_LIST: USER_API_URL + "patient-list",
        DASHBOARD: USER_API_URL + "doctor-dashboard",
        DOCTOR_COUNT: USER_API_URL + "doctor-counts",
    },

    MANAGE_TEST: {
        SUBCATEGORY: MASTER_API_URL + "test-level-one",
        TEST: MASTER_API_URL + "test-level-two",
        EXISTING_AVAILABILITY: MASTER_API_URL + "",
        LIST: MASTER_API_URL + "test-list",
        UPSERT: MASTER_API_URL + "dc-test",
        DELETE: MASTER_API_URL + "dc-test/{{id}}",
        DETAIL: MASTER_API_URL + "dc-test/{{id}}",
        SLOT_DELETE: MASTER_API_URL + "dc-test/time-slot/{{id}}",
    },

    MANAGE_TIME_BASED_DISCOUNT: {
        LIST: MASTER_API_URL + "discount-list",
        UPSERT: MASTER_API_URL + "discount",
        DELETE: MASTER_API_URL + "discount/{{id}}",
        TEST_DISCOUNTS: MASTER_API_URL + "test-discounts",
    },

    TEST_MASTER: {
        LIST: MASTER_API_URL + "test-master-list",
        UPSERT: MASTER_API_URL + "test-master",
        DELETE: MASTER_API_URL + "test-master/{{id}}",
    },

    ACITIVITY_LOGS: {
        LIST: USER_API_URL + "/activity-list",
        INFO: USER_API_URL + "/activity",
    },

    MASTER_ROLES: {
        LIST: USER_API_URL + "role-list",
        UPSERT: USER_API_URL + "role",
        DETAIL: USER_API_URL + "role/{{id}}",
    },

    MASTER_TESTS: {
        LIST: MASTER_API_URL + "master/tests",
        CREATE: MASTER_API_URL + "master/tests",
        UPDATE: MASTER_API_URL + "master/tests/{{id}}",
        DELETE: MASTER_API_URL + "master/tests/{{id}}",
        BY_ID: MASTER_API_URL + "master/tests/{{id}}",
    },

    DC_AVAILABILITY_GROUP: {
        LIST: MASTER_API_URL + "dc/{{fk_dc_id}}/availability-groups",
        CREATE: MASTER_API_URL + "dc/availability-groups",
        UPDATE: MASTER_API_URL + "dc/availability-groups/{{id}}",
        DELETE: MASTER_API_URL + "dc/availability-groups/{{id}}",
        LOOKUP: MASTER_API_URL + "dc/{{fk_dc_id}}/availability-groups/lookup",
    },

    DC_CENTERS: {
        BY_ID: MASTER_API_URL + "centers/{{id}}",
        LIST: MASTER_API_URL + "centers",
        CREATE: MASTER_API_URL + "centers",
        UPDATE: MASTER_API_URL + "centers/{{id}}",
        DELETE: MASTER_API_URL + "centers/{{id}}",
    },

    DC_TESTS: {
        BY_ID: MASTER_API_URL + "dc/tests/{{id}}",
        LIST: MASTER_API_URL + "dc/{{fk_dc_id}}/tests",
        CREATE: MASTER_API_URL + "dc/tests",
        UPDATE: MASTER_API_URL + "dc/tests/{{id}}",
        DELETE: MASTER_API_URL + "dc/tests/{{id}}",
    },

    DC_HOLIDAYS: {
        BY_ID: MASTER_API_URL + "dc/holidays/{{id}}",
        LIST: MASTER_API_URL + "dc/{{fk_dc_id}}/holidays",
        CREATE: MASTER_API_URL + "dc/holidays",
        UPDATE: MASTER_API_URL + "dc/holidays/{{id}}",
        DELETE: MASTER_API_URL + "dc/holidays/{{id}}",
    },

    DC_SHIFTS: {
        BY_ID: MASTER_API_URL + "dc/shifts/{{id}}",
        LIST: MASTER_API_URL + "dc/{{fk_dc_id}}/shifts",
        CREATE: MASTER_API_URL + "dc/shifts",
        UPDATE: MASTER_API_URL + "dc/shifts/{{id}}",
        DELETE: MASTER_API_URL + "dc/shifts/{{id}}",
        LOOKUP: MASTER_API_URL + "dc/{{fk_dc_id}}/shifts/lookup",
    },

    DC_STAFFS: {
        BY_ID: MASTER_API_URL + "dc/staffs/{{id}}",
        LIST: MASTER_API_URL + "dc/{{fk_dc_id}}/staffs",
        CREATE: MASTER_API_URL + "dc/staffs",
        UPDATE: MASTER_API_URL + "dc/staffs/{{id}}",
        DELETE: MASTER_API_URL + "dc/staffs/{{id}}",
    },

    DC_DOCTORS: {
        BY_ID: MASTER_API_URL + "dc/doctors/{{id}}",
        LIST: MASTER_API_URL + "dc/{{fk_dc_id}}/doctors",
        CREATE: MASTER_API_URL + "dc/doctors",
        UPDATE: MASTER_API_URL + "dc/doctors/{{id}}",
        DELETE: MASTER_API_URL + "dc/doctors/{{id}}",
    },

    MY_REPORTS: {
        LIST: MASTER_API_URL + "reports-documents",
    },

}
