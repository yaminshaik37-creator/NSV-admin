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
import { LOGIN_TAB, FormError } from "@/config/constants"
import { API_ENDPOINTS } from '@/config/api-endpoints'
import { passLoginSchema } from '@/config/constants/schema';
import { useUserContext } from '@/contexts/userContext';

export default function PasswordLogin({ user, setCurrentTab, setOtp, setForLogin }) {
    const { setLoading } = useUserContext();
    // const { setAccess } = useLookupContext()

    const router = useRouter()

    const onSubmit = async (values, helpers) => {
        try {
            setLoading(true)
            const res = await ApiCall({ url: API_ENDPOINTS.PASSWORD_LOGIN, body: { ...values, mobile_number: user.mobile_number.toString(), type: "aitek" }, method: "POST" })
            if (res?.success) {
                // setAccess(res.data.access)
                // delete res.data.access
                localStorage.setItem("user", JSON.stringify(res.data))
                setLoading(false)
                router.push("/dashboard")
            } else {
                setLoading(false)
                helpers.setFieldError(res.data.field, res.data.message)
            }
        } catch (err) {
        }
    }

    const sendOtp = async (forLogin) => {
        try {
            const res = await ApiCall({ url: API_ENDPOINTS.SEND_OTP, body: { mobile_number: user.mobile_number, type: "aitek" }, method: "POST" })
            if (res?.success) {
                if (forLogin) {
                    setForLogin(true)
                } else {
                    setForLogin(false)
                }
                setOtp(res.data.otp)
                setCurrentTab(LOGIN_TAB.VERIFY_OTP)
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
                            <h4 className="sr-only">Visa</h4>
                            <div className="sm:flex sm:items-start">

                                <div className="mt-3 sm:ml-4 sm:mt-0">
                                    <div className="text-sm font-medium text-gray-900">Mobile Number</div>
                                    <div className="mt-1 text-sm text-gray-600 sm:flex sm:items-center">
                                        <div>{user.mobile_number}</div>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-4 sm:ml-6 sm:mt-0 sm:flex-shrink-0">
                                <button
                                    type="button"
                                    className="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                                    onClick={() => setCurrentTab(LOGIN_TAB.INITAL)}
                                >
                                    Change
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Formik
                initialValues={{ password: "" }}
                validationSchema={passLoginSchema}
                onSubmit={onSubmit}
            >
                {({ handleSubmit }) => {
                    return (
                        <>
                            <Form onSubmit={handleSubmit} className="mt-10 grid grid-cols-1 gap-y-8">
                                <FormikForm.PasswordInput label="Enter Password" name="password" />
                                <div>
                                    <Button
                                        type="submit"
                                        variant="solid"
                                        color="blue"
                                        className="w-full"
                                        title='Login'
                                        
                                    />
                                </div>
                            </Form>
                        </>
                    );
                }}
            </Formik>

            <div className="mt-3 text-sm leading-6 lg:flex lg:justify-between">
                {/* <button
                    className="font-semibold text-indigo-600 hover:text-indigo-500"
                    onClick={() => sendOtp(true)}
                >
                    or login via otp
                </button> */}
                <button
                    className="font-semibold text-indigo-600 hover:text-indigo-500"
                    onClick={() => sendOtp(false)}
                >
                    forgot password?
                </button>
            </div>

        </>
    )
}
