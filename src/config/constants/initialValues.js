export const resellerCompanyVal = {
    company_name: "",
    share_capital: "",
    trade_reg_no: "",
    no_of_employees: "",
    tax_account_no: "",
    phone: "",
    creation_year: "",
    fax: "",
    tax_system: "",
    email: "",
    annual_sale: "",
    billing: "",
    city: "",
    po_box: "",
    sage_reseller_id: "",
    country: "",
    letter_approval: "",
    account_opening: "",
    general_sales: "",
    business_register: "",
    fiscal_declaration: "",
    photocopy: "",
    vouchers: "",
    admin: [
        {
            function: "",
            last_name: "",
            first_name: "",
            gsm: "",
            phone: "",
            email: "",
            receive_catalog: "",
        }
    ],
    credits: [
        // {
        //     company_credit: "",
        //     currency: "",
        // }
    ],
    acronis: "",
    asus: "",
    apc: "",
    canon: "",
    dell: "",
    "d-link": "",
    epson: "",
    hp: "",
    hpe: "",
    honeywell: "",
    kaspersky: "",
    lenovo: "",
    microsoft: "",
    nitram: "",
    sophos: "",
    symantec: "",
    transcend: "",
    in_microsoft: false,
    in_acronis: false,
    in_kaspersky: false,
    mpn_id: "",
    microsoft_account: "",
    acronis_email: "",
    min_mon_sales: 0,
    kaspersky_email: "",
    kaspersky_pin: "",
    // norton_email: "",
    uemoa: "",
    airsi: "",
    soi_meme: "",
    vente: "",
    tva: "",
    hors_uemoa: "",
    expectation: "",
    company_credit: "",
    region: "",
    entity: "",
    additional_charge: false,
    exempt_tax: false,
}
export const resellerContactVal = {
    admin: [
        {
            function: "",
            name: "",
            first_name: "",
            phone: "",
            email: "",
            receive_catalog: "",
        }
    ]
}
export const couponState = {
    coupon_code: '',
    start_date: '',
    expiry_date: '',
    max_redemptions: '',
    max_redemptions_per_user: 1,
    discount_value: '',
    region_id: '',
    description: '',
    discount_type: '',
    publish_to_website: false,
    max_discount: 0,
}
export const initial = {
    user_type: "aitek", first_name: "", last_name: "", password: "", confirm_password: "", email: "", phone: "", role: "",
}
export const loginState = { phone: "" }
export const regVals = { first_name: "", last_name: '', password: '', confirm_password: '' }
export const reqDoctorVals = { first_name: "", last_name: "", gender: "", phone: "", email: "", speciality_id: "", rmp_number: "", pincode_id: "", diagnostic_center: "", address: "" }

export const quotationVal = {
    tva: true,
    airsi: true,
    sale_person_id: "",
    entity_id: "",
    region_id: "",
    reseller_id: "",
    sale_person_id: null,
    currency: "",
    reseller_contact_id: "",
    products: [
        {
            vendor: "",
            product_id: "",
            quantity: "",
            price: 0,
            gross_profit: 0,
            gp_percent: 0,
            quote_price: 0,
        }
    ]
}

export const modalQuotationVal = ({ currency, quote_row_id, entity_id, region_id, reseller_id }) => {
    return {
        reseller_id: { label: reseller_id, value: reseller_id },
        currency: currency,
        quote_row_id: quote_row_id,
        reseller_contact_id: 0,
        entity_id: entity_id,
        region_id: region_id,
        products: [
            {
                vendor: "",
                product_id: "",
                quantity: "",
                price: 0,
                gross_profit: 0,
                gp_percent: 0,
                quote_price: 0,
            }
        ]
    }
}
export const orderVal = {
    reseller_id: "",
    // email: "",
    // first_name: "",
    // last_name: "",
    products: [
        {
            vendor: "",
            product_id: "",
            quantity: "",
            price: "",
        }
    ],

    mpn_id: "",
    microsoft_account: "",
    acronis_email: "",
    min_mon_sales: 0,
    kaspersky_email: "",
    // norton_email: "",

    // ct_mpn_id: "",
    // ct_microsoft_account: "",
    // ct_acronis_email: "",
    // ct_min_mon_sales: 0,
    // ct_kaspersky_email: "",
    // ct_norton_email: "",
}
export const productVal = {
    vendor: "",
    sku: "",
    margin: "",
    name: "",
    category: "",
    region: "",
    price: "",
    aitek_price: "",
    tax_exempt: "",
    is_enable: "",
    min_cart: "",
    max_cart: "",
    whislist_enable: "",
    buy_enable: "",
    currency: "",
    promo_price: 0,
    special_promo_price: 0,
    show_additional_info: false,
    fr_show_additional_info: false,
    priority: false,
    show_market: false,
    images: "",
    resources: [
        { title: "", link: "" },
        { title: "", link: "" },
        { title: "", link: "" },
        { title: "", link: "" },
        { title: "", link: "" },
    ]
}
export const addResellerProdVal = {
    vendor: "",
    max_cart: null,
    min_cart: null,
    tax_exempt: false,
    priority: false,
    show_market: false,
    sku: "",
    name: "",
    category: "",
    region: "",
    price: 0,
    margin: 0,
    aitek_price: 0,
    reseller_margin: 0,
    is_enable: true,
    min_cart: "",
    max_cart: "",
    whislist_enable: true,
    buy_enable: true,
    currency: "",
    promo_price: 0,
    special_promo_price: 0,
    show_additional_info: false,
    fr_show_additional_info: false,
    images: "",
    resources: [
        { title: "", link: "" },
        { title: "", link: "" },
        { title: "", link: "" },
        { title: "", link: "" },
        { title: "", link: "" },
    ]
}
export const crossSellVal = { product_id: "", published: true }
export const crossSellBundle = { discount: 0, total_price: 0, discounted_price: 0, total_vendor_price: 0 }
export const pricingVals = {
    acer: 0,
    acronis: 0,
    allot: 0,
    apc: 0,
    arista: 0,
    asus: 0,
    beyondtrust: 0,
    canon: 0,
    d_link: 0,
    dell: 0,
    divers: 0,
    epson: 0,
    gatewatcher: 0,
    honeywell: 0,
    hp: 0,
    kaspersky: 0,
    kaspersky_box: 0,
    kaspersky_esd: 0,
    kaspersky_esd_b2b: 0,
    lenovo: 0,
    lexmark: 0,
    microsoft: 0,
    microsoft_box: 0,
    microsoft_esd: 0,
    nitram: 0,
    norton: 0,
    paessler: 0,
    portdesign: 0,
    samsung: 0,
    sophos: 0,
    symantec: 0,
    transcend: 0,
    varonis: 0,
    veritas: 0,
    wallix: 0
}
export const addTicketValues = { order_number: "", description: "", files: "", issue: "" }
export const customerVal = {
    phone: "",
    email: "",
    company_name: "",
    first_name: "",
    last_name: "",
    region: "",

    in_microsoft: false,
    in_acronis: false,
    in_kaspersky: false,
    mpn_id: "",
    microsoft_account: "",
    acronis_email: "",
    kaspersky_email: "",
    entity_id: "",
    country: "",
    city: "",
}
export const passwordResetState = {
    current_password: "",
    password: "",
    confirm_password: "",
}

export const MISC_VALS = {
    acronis: true,
    allot: true,
    apc: true,
    arista: true,
    asus: true,
    beyondtrust: true,
    canon: true,
    ca_tech: true,
    divers: true,
    d_link: true,
    epson: true,
    honeywell: true,
    hp: true,
    infoblox: true,
    kaspersky_esd_b2b: true,
    kaspersky_box: true,
    kaspersky_esd: true,
    kaspersky_csp: true,
    lenovo: true,
    microsoft_box: true,
    microsoft_csp: true,
    microsoft_esd: true,
    nitram: true,
    norton: true,
    pasessler: true,
    symantec: true,
    transcend: true,
    tufin: true,
    ubika: true,
    varonis: true,
    veritas: true,
    wallix: true,
    whalebone: true
}

export const resellerDBVal = {
    revendeur: '',
    country: '',
    dealer: '',
    no_of_transaction: '',
    turnover: '',
    median: '',
    percentile: '',
    deal_max: '',
    unpaid: '',
    avg_delay: '',
    disputes: '',
    litigation: '',
    account_year: '',
    seniority: '',
    unpaid_rating: '',
    delay_rating: '',
    rating_transactions: '',
    rating_volume: '',
    rating_litigation: '',
    reputation: '',
    twenty_eighty: '',
}

export const personalizationVals = {
    brand_name: "",
    sub_domain: "",
    about_us_link: "",
    facebook_link: "",
    instagram_link: "",
    twitter_link: "",
    youtube_link: "",
    linkedin_link: "",
    company_logo: "",
    display_company_name: "",
    display_email: "",
    banner: [{ id: "", name: "", valid_from: "", valid_from: "", description: "", region: [], banner_logo: "", signin_state: false }],
}
export const bundleVals = { name: '', description: '', region_id: '', entity_id: '', products: [{ product_id: '', discount: 0, promo_price: 0, price: 0, vendor_price: 0 }] }

export const addDCVals = { domain: '', center_name: '', license_number: '', address_line_1: '', address_line_2: '', pincode: '', city: '', state: '', phone: '', last_name: '', first_name: '', email: '' }

export const resourceVals = {
    name: "",
    description: "",
    duration: "",
    time_slots: [
        {
            day_of_week: [],
            from_time: "",
            to_time: "",
        },
    ],
};

export const managetestVals = {
    concurrency: 1,
    type: "",
    level_1: "",
    test_id: "",
    description: "",
    cost: "",
    duration: "",
    duration_type: "",
    instructions: "",
    resource_id: "",
    time_slots: [
        {
            day_of_week: [],
            from_time: "",
            to_time: "",
            discount: 0
        }
    ]
};

export const staffVals = {
    first_name: "",
    last_name: "",
    pincode_id: "",
    phone: "",
    email: "",
    address: "",
    role_id: "",
    image: "",
    time_slots: [
        {
            day_of_week: [],
            from_time: "",
            to_time: "",
        }
    ]
};

export const managetestfilterVals = {
    category: "",
    subcategory: "",
    search: "",
}

export const holidayVals = {
    name: "",
    holiday_date: "",
    holiday_type: "",
    day_of_week: "",
    week_of_month: "",
}

export const doctorVals = {
    first_name: "",
    last_name: "",
    email: "",
    address: "",
    rmp_number: "",
    phone: "",
    speciality_id: "",
    max_discount: "",
    pincode_id: "",
    points_allowed: null,
};

export const patientVals = {
    first_name: "",
    last_name: "",
    gender: "",
    pincode_id: "",
    email: "",
    address: "",
    phone: "",
    med_condition: []
};

export const profileVals = {
    first_name: "",
    last_name: "",
    phone: "",
    email: "",
}

export const discountVals = {
    tests: [],
    day_of_week: [],
    from_time: "",
    to_time: "",
    discount: "",
    type: "",
}


export const testmasterVals = {
    type: '',
    level_1: '',
    level_2: '',
    description: '',
    instructions: '',
}

export const PatientSmartDiagnosist = {
    DC_name: "",
    contact_person: "",
    phone: "",
    email: "",
    city: "",
};

export const DoctorSmartDiagnosist = {
    first_name: "",
    last_name: "",
    phone: "",
    email: "",
    city: "",
    location: ""
};

export const DcSmartDiagnosist = {
    full_name: "",
    phone: "",
    email: "",
    city: "",
};