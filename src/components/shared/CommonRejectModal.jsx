
import { MyComponent } from "@/config/constants/schema";

import { FormikForm } from "@/components/FormikForm";
import PrimaryBtn from "@/components/UI/PrimaryBtn";
import Modal from "@/components/UI/Modal"
import { useTranslation } from 'react-i18next';

import { Formik } from "formik";

const CommonRejectModal = ({ open, setOpen, cb }) => {

    const { t } = useTranslation()
    const { tagSch } = MyComponent();

    const onSubmit = async (values) => {
        try {
            cb(values.name)
            setOpen(false)
        } catch (error) {

        } finally { }
    }
    return (
        <Modal open={open} setOpen={setOpen}>
            <div className="mb-3">
                <Formik
                    initialValues={{ name: "" }}
                    validationSchema={tagSch}
                    onSubmit={onSubmit}
                    enableReinitialize
                >
                    {({ handleSubmit, }) => {
                        return (
                            <form onSubmit={handleSubmit}>
                                <div className="mb-5">
                                    <div className="mt-4">
                                        <FormikForm.Input name="name" label={t('LABEL.ADD_REASON')} />
                                    </div>
                                </div>
                                <div className="flex gap-4 rounded-b-md border-t-2 border-neutral-100 border-opacity-100 p-4 dark:border-opacity-50">
                                    <PrimaryBtn title={t("BUTTON.SAVE")} type='submit' />
                                </div>
                            </form>
                        );
                    }}
                </Formik>
            </div>
        </Modal>
    )
}

export default CommonRejectModal