import { useTranslation } from "react-i18next";
import Modal from "../UI/Modal";
import PrimaryBtn from "../UI/PrimaryBtn";
import { Form, Formik } from "formik";
import { FormikForm } from "../FormikForm";

const LicenseCancel = ({ open, setOpen, cb,isLoading }) => {
    const { t } = useTranslation()
    const onSubmit = async () => {
        try {
            cb()
        } catch (error) {

        }
    }
    return (
        <>
            <Modal open={open} setOpen={setOpen}>
                <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                    <div>
                        <Formik
                            enableReinitialize
                            initialValues={{ confirmation: '' }}
                            onSubmit={onSubmit}
                        >
                            {({ handleSubmit, values }) => {
                                return (
                                    <>
                                        <Form onSubmit={handleSubmit}>
                                            <div >
                                                <FormikForm.Input required label={t("LABEL.TYPE_CANCEL")} name="confirmation" />
                                                <div className='flex justify-end gap-4 my-6'>
                                                    <PrimaryBtn isLoading={isLoading} disabled={values.confirmation?.toLowerCase() != 'cancel'} title={t("BUTTON.CONFIRM")} type='submit' />
                                                </div>
                                            </div>
                                        </Form>
                                    </>
                                );
                            }}
                        </Formik>
                    </div>
                </div>
            </Modal>
        </>
    )
}
export default LicenseCancel;