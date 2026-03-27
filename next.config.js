/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    env: {
        // USER_API_URL: "https://dev-api.fastrecce.com/auth/",
        // PRODUCT_API_URL: "https://dev-api.fastrecce.com/product/",
        // IMAGE_API_URL: "https://dev-api.fastrecce.com/image/",
        // MASTER_API_URL: "https://dev-api.fastrecce.com/master/",
        // COUPON_API_URL: "https://dev-api.fastrecce.com/coupon/",
        // ORDER_API_URL: "https://dev-api.fastrecce.com/order/",
        // BOOKING_API_URL: "https://dev-api.fastrecce.com/booking",
        // BOOKING_API_URL: "http://localhost:8007/booking/",

        // USER_API_URL: "http://localhost:8007/auth/",
        // PRODUCT_API_URL: "http://localhost:8007/product/",
        // IMAGE_API_URL: "https://dev-api.aitekcenter.com/image/",
        // MASTER_API_URL: "http://localhost:8007/master/",
        // COUPON_API_URL: "https://dev-api.aitekcenter.com/coupon/",
        // ORDER_API_URL: "http://localhost:8007/order/",
        // BOOKING_API_URL: "http://localhost:8007/booking/",
        UPDATES_API_URL: "http://localhost:8000/nsv-executive/",
        NETWORK_DIRECTOR_API_URL: "http://localhost:8000/nsv-network-director/",
        CLINIC_ADMINISTRATION_API_URL: "http://localhost:8000/nsv-clinic-administration/",
        PROGRAM_DIRECTOR_API_URL: "http://localhost:8000/nsv-programdirector/",
        POLICY_MAKER_API_URL: "http://localhost:8000/nsv-policymaker/",


        AES_SECRET_KEY: "91f0c702eda64d8eedd556c0930",
        JWT_SECRET: "b9b340b52f485b931d5a164545849",
        HASH_KEY: '1f0c569e871d8d8a1c6e78aa78f2dc',
        GOOGLE_MAP_API_KEY: 'AIzaSyAkvNq9W8lIszL_Jwg_cVeFua-FCje7-U8',
        PUBLIC_CDN_URL: 'https://d3ntxdq3ipyd66.cloudfront.net/',
    },
    images: {
        remotePatterns: [

        ],
    },
};

module.exports =  nextConfig;
