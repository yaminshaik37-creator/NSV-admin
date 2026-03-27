import { useTranslation } from "react-i18next";
import Modal from "./Modal";

const Delete = ({ open, setOpen, itemName = '', cb }) => {
    const { t } = useTranslation()
    return (
        <>
            <Modal open={open} setOpen={setOpen}>
                <div className="fixed inset-0 z-1000 overflow-y-auto">
                    <div className="flex md:min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                        <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 w-full sm:max-w-sm">
                            <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                                <div >
                                    <div className="text-center sm:text-left">
                                        <div className="modal-body relative overflow-y-auto">
                                            <div className='text-center m-5 text-lg text-[#333] font-medium'>{t("LABEL.DELETE")}</div>
                                            <div className='text-center'><p>{t("LABEL.DELETE_ITEM")} {itemName}?</p></div>
                                        </div>
                                    </div>
                                </div>
                                <div className='mt-5 mb-5'>
                                    <button className='btn btn-primary-blue w-full mb-3 text-center' onClick={() => cb()}>{t("TABLE_COLUMNS.YES")}</button>
                                    <button className='btn btn-primary-white w-full text-center' onClick={() => setOpen(false)}>{t("BUTTON.NO")}</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Modal>
        </>
    )
}
export default Delete;