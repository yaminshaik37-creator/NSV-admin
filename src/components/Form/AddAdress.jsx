'use client'
import { useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
//components
import { Button } from '@/components/UI/Button'
import { FormikForm } from '@/components/FormikForm'
//service
import ApiCall from '@/service/api'
// library
import { Formik, Form } from 'formik'
// constant
import { API_ENDPOINTS } from '@/config/api-endpoints'
import { addressSchema } from '@/config/constants/schema'
import { addressInitialState } from '@/config/constants/initialValues'
import { useUserContext } from '@/contexts/userContext'


export default function AddAddress({ user }) {
    const { setLoading } = useUserContext();
    const router = useRouter()
    const ref = useRef()

    const onSubmit = async (values) => {
        try {
            setLoading(true)
            const payload = { ...values, user_id: user_id, city: values.city, state: values.state, postal_code: values.postal_code.value }
            const res = await ApiCall({ url: API_ENDPOINTS.ADD_ADDRESS, body: payload, method: 'POST', })
            if (res?.success) {
                router.push('/dashboard')
            } else {
                // helpers.setFieldError(res.data.field, res.data.message)
            }
        } catch (err) {
        } finally {
            setLoading(false)
        }
    }
    const handleChangePincode = (e) => {
        const { target: { config: { state, city } } } = e
        ref.current.setFieldValue('city', city)
        ref.current.setFieldValue('state', state)
    }
    return (
        <>
            <Formik
                initialValues={addressInitialState}
                validationSchema={addressSchema}
                onSubmit={onSubmit}
            >
                {({ handleSubmit }) => {
                    return (
                        <>
                            <Form
                                onSubmit={handleSubmit}
                                className="mt-10 grid grid-cols-1 gap-y-1"
                            >
                                <FormikForm.Input
                                    label="Flat, House no., Building, Company, Apartment"
                                    id="street_line_one"
                                    name="street_line_one"
                                    type="text"
                                />
                                <FormikForm.Input
                                    label="Area, Street, Sector, Village"
                                    id="street_line_two"
                                    name="street_line_two"
                                    type="text"
                                />
                                <FormikForm.Input
                                    label="Landmark"
                                    id="location"
                                    name="location"
                                    type="text"
                                />
                                <FormikForm.Input label="State" name="state" placeholder="Select state" disabled />
                                <FormikForm.Input label="City" name="city" placeholder="Select city" disabled />
                                <div className="flex justify-between">
                                    <Button
                                        type="submit"
                                        variant="solid"
                                        color="blue"
                                        className="mt-3 w-full px-0"
                                        title="Submit"
                                    />
                                    <button
                                        type="button"
                                        className="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                                        onClick={() => router.push('/dashboard')}
                                    >
                                        Skip for now
                                    </button>
                                </div>
                            </Form>
                        </>
                    )
                }}
            </Formik>
        </>
    )
}
