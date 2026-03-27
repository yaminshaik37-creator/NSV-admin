"use client"

import { useState } from 'react'
import { useRouter } from 'next/navigation';

//components
import { Button } from '@/components/UI/Button'
import { FormikForm } from "@/components/FormikForm"

//service
import ApiCall from '@/service/api'

// library
import { Formik, Form } from 'formik';
import { toast } from 'react-toastify';

// constant
import { FormError, LOGIN_TAB, REGISTER_TAB } from "@/config/constants"
import { API_ENDPOINTS } from '@/config/api-endpoints'
import { OtpSchema } from '@/config/constants/schema';
import { currentHour } from '@/utils/helper';
import { useUserContext } from '@/contexts/userContext';

export default function VerifyOTP({ user, setCurrentTab, setRegisterTab, otp, forLogin, forRegister }) {

    const { setLoading } = useUserContext();
    const router = useRouter()
    const initialState = { otp: "" }

    const onSubmit = async (values, helpers) => {
        try {
            setLoading(true)
            const res = await ApiCall({ url: API_ENDPOINTS.VERIFY_OTP, body: { ...values, mobile_number: user.mobile_number, type: "aitek" }, method: "POST" })
            if (res?.success) {
                setLoading(false)
                if (forLogin) {
                    localStorage.setItem("user", JSON.stringify(res.data))
                    router.push("/dashboard")
                } else {
                    setCurrentTab && setCurrentTab(LOGIN_TAB.CREATE_NEW_PASSWORD)
                    setRegisterTab && setRegisterTab(REGISTER_TAB.UPDATE_USER)
                }
            } else {
                helpers.setFieldError(res.data.field, res.data.message)
            }
        } catch (err) {
            setLoading(false)
        }
    }
    const sendOtp = async () => {
        try {
            const res = await ApiCall({ url: API_ENDPOINTS.SEND_OTP, body: { mobile_number: user.mobile_number, type: "aitek" }, method: "POST" })
            if (res?.success) {
                TOAST_SUCCESS(`Your OTP ${res.data.otp}`)
            }
        } catch (error) {
            TOAST_ERROR(FormError.ERROR)
        }
    }
    return (
        <>
            <div className="bg-white shadow sm:rounded-lg">
                <div className="p-4">
                    <div>
                        <div className="rounded-md bg-gray-50 px-6 py-5 sm:flex sm:items-start sm:justify-between">
                            <div className="sm:flex sm:items-start">

                                <div className="mt-3 sm:ml-4 sm:mt-0">
                                    <div className="text-sm font-medium text-gray-900">Mobile Number</div>
                                    <div className="mt-1 text-sm text-gray-600 sm:flex sm:items-center">
                                        <div>{user?.mobile_number}</div>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-4 sm:ml-6 sm:mt-0 sm:flex-shrink-0">
                                <button
                                    type="button"
                                    className="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                                    onClick={() => setCurrentTab ? setCurrentTab(LOGIN_TAB.INITAL) : setRegisterTab(REGISTER_TAB.INITAL)}
                                >
                                    Change
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Formik
                initialValues={initialState}
                validationSchema={OtpSchema}
                onSubmit={onSubmit}
            >
                {({ handleSubmit }) => {
                    return (
                        <>
                            <Form onSubmit={handleSubmit} className="mt-10 grid grid-cols-1 gap-y-8">
                                <FormikForm.Input
                                    label="Enter OTP"
                                    id="otp"
                                    name="otp"
                                    type="text"
                                />
                                <div>
                                    <Button
                                        type="submit"
                                        variant="solid"
                                        color="blue"
                                        className="w-full"
                                        title='Verify'
                                       
                                    />
                                </div>
                            </Form>
                        </>
                    );
                }}
            </Formik>
            {forRegister && <>
                <div className='lg:flex lg:justify-between mt-5'>
                    <p className="manrope-regular-md leading-7 text-gray-600">OTP sent to {user?.mobile_number} at {currentHour()}</p>
                    <button
                        type="button"
                        className="relative inline-flex items-center rounded-l-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-10"
                        onClick={sendOtp}
                    >
                        Resend OTP
                    </button>

                </div>
            </>}

            {forLogin && <div className="mt-3 text-sm leading-6 lg:flex lg:justify-between">
                <button className="font-semibold text-indigo-600 hover:text-indigo-500"
                    onClick={() => setCurrentTab(LOGIN_TAB.PASSWORD_LOGIN)}>
                    or login via password
                </button>
            </div>}

        </>
    )
}
