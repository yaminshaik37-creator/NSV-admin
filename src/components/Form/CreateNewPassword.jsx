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
import { useTranslation } from 'react-i18next';

// constant
import { API_ENDPOINTS } from '@/config/api-endpoints'
import { newPassSchema } from '@/config/constants/schema';
import { EyeClosed, EyeOpen } from '@/config/icons';
import { LOGIN_TAB } from '@/config/constants';
import { useUserContext } from '@/contexts/userContext';

export default function CreateNewPassword({ user, setCurrentTab }) {
    const { setLoading } = useUserContext();
    const { t } = useTranslation()

    const onSubmit = async (values) => {
        try {
            setLoading(true)
            const payload = {
                id: user.id,
                mobile_number: user.mobile_number,
                password: values.password,
                type: "aitek"
            }
            const res = await ApiCall({ url: API_ENDPOINTS.CREATE_NEW_PASSWORD, body: payload, method: "POST" })
            if (res?.success) {
                setLoading(false)
                setCurrentTab(LOGIN_TAB.INITAL)
            } else {
                setLoading(false)
            }
        } catch (err) {
        }
    }
    return (
        <>
            <Formik
                initialValues={{ confirm_password: "", password: "" }}
                validationSchema={newPassSchema}
                onSubmit={onSubmit}
            >
                {({ handleSubmit }) => {
                    return (
                        <>
                            <Form onSubmit={handleSubmit} className="mt-10 grid grid-cols-1 gap-y-8">
                                <FormikForm.PasswordInput label={t('LABEL.ENTER_PASSWORD')} name="password" />
                                <FormikForm.PasswordInput label={t('LABEL.CONFIRM_NEW_PASS')} name="confirm_password" />
                                <div>
                                    <Button
                                        type="submit"
                                        variant="solid"
                                        color="blue"
                                        className="w-full"
                                        title={t('BUTTON.VERIFY')}
                                     
                                    />
                                </div>
                            </Form>
                        </>
                    );
                }}
            </Formik>
        </>
    )
}
