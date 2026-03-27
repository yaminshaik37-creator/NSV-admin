import { useState } from "react";

import { Form, Formik } from "formik";
import { FormikForm } from "../FormikForm";

import Modal from "@/components/UI/Modal"
import PrimaryBtn from "../UI/PrimaryBtn";
import SecondaryBtn from "../UI/SecondaryBtn";

import { TOAST_ERROR, TOAST_SUCCESS } from "@/utils/toast";

import ApiCall from "@/service/api";
import { API_ENDPOINTS } from "@/config/api-endpoints";
import { MyComponent } from "@/config/constants/schema";
import { useTranslatedConstants } from "@/config/constants";
import { passwordResetState } from "@/config/constants/initialValues";
import { useTranslation } from 'react-i18next';

const PasswordResetModal = ({ open, setOpen }) => {
    const [initialState, setInitialState] = useState(passwordResetState)
    const { passwordResetSchema } = MyComponent()
    const { MESSAGE, FormError } = useTranslatedConstants()

    const { t } = useTranslation()

    const onSubmit = async (values) => {
        try {
            const payload = { current_password: values.current_password, password: values.password }
            let res = await ApiCall({ url: API_ENDPOINTS.CHANGE_PASSWORD, body: payload, method: "POST" })
            if (!res?.success && res.status == 401) {
                TOAST_ERROR(FormError.WRONG_PASSWORD);
            } else if (res?.success) {
                TOAST_SUCCESS(MESSAGE.PASSWORD_UPDATED);
                setOpen(false);
            } else {
                TOAST_ERROR(FormError.ERROR);
            }
        } catch (error) {
            TOAST_ERROR(FormError.ERROR)
        }
    }

    return (
        <Modal open={open} setOpen={setOpen} title={t("TAGS.PASSWORD_RESET")}>
            <hr className="border border-[#DFE2E2]" />
            <div>
                <div className="absolute left-0 top-5 bottom-0 w-1 h-11 bg-[#A382E2] rounded-r-lg cursor-pointer"></div>
                <Formik
                    enableReinitialize
                    initialValues={initialState}
                    validationSchema={passwordResetSchema}
                    onSubmit={onSubmit}
                >
                    {({ handleSubmit }) => {
                        return (
                            <>
                                <Form onSubmit={handleSubmit} className="mt-5">
                                    <div >
                                        <FormikForm.PasswordInput required label={t("LABEL.CURR_PASS")} placeholder={t("LABEL.CURR_PASS")} name="current_password" />
                                        <FormikForm.PasswordInput required label={t("LABEL.NEW_PASS")} placeholder={t("LABEL.NEW_PASS")} name="password" />
                                        <FormikForm.PasswordInput required label={t("LABEL.CONFIRM_PASS")} placeholder={t("LABEL.CONFIRM_PASS")} name="confirm_password" />

                                        <div className='flex justify-end gap-4 mt-6 w-full'>
                                            <PrimaryBtn title={t("BUTTON.SAVE")} type='submit' className='w-full' />
                                            <SecondaryBtn title={t("BUTTON.CANCEL")} onClick={() => setOpen(false)} type='button' className='w-full' />
                                        </div>
                                    </div>
                                </Form>
                            </>
                        );
                    }}
                </Formik>
            </div>
        </Modal>
    )
}

export default PasswordResetModal;