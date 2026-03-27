import { useTranslation } from "react-i18next";
import Modal from "../UI/Modal";
import PrimaryBtn from "../UI/PrimaryBtn";
import SecondaryBtn from "../UI/SecondaryBtn";

const CancelSubscription = ({ open, setOpen, itemName = '', cb, isLoading, isLicense = false }) => {
    const { t } = useTranslation()
    return (
        <>
            <Modal open={open} setOpen={setOpen}>
                <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                    <div>
                        <div className="text-center sm:text-left">
                            <div className="modal-body relative overflow-y-auto">
                                <div className='text-center m-5 text-lg text-[#333] font-medium'>{isLicense ? t("BUTTON.CANCEL_LICENSE") : t("TITLE.STOP_SUBSCRIPTION")}</div>
                                <div className='text-center'><p>{isLicense ? t("LABEL.CANCEL_LICENSE") : t("LABEL.CANCEL_SUBSCRIPTION")} {itemName}?</p></div>
                            </div>
                        </div>
                    </div>
                    <div className='mt-5 mb-5 flex gap-4 justify-center'>
                        <PrimaryBtn title={t("TABLE_COLUMNS.YES")} isLoading={isLoading} onClick={() => cb()} />
                        <SecondaryBtn title={t("BUTTON.NO")} onClick={() => setOpen(false)} />
                    </div>
                </div>
            </Modal>
        </>
    )
}
export default CancelSubscription;