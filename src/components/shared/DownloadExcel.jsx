import { useState } from "react";

import { FormikForm } from "../FormikForm";
import { Button } from "../UI/Button";


import { Form, Formik } from "formik";
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import { useTranslation } from 'react-i18next';

import ApiCall from "@/service/api";
import { formatTime } from "@/utils/helper";
import { TOAST_ERROR } from "@/utils/toast";
import { useTranslatedConstants } from "@/config/constants";
import SecondaryBtn from "../UI/SecondaryBtn";
import { MyComponent } from "@/config/constants/schema";
import Modal from "../UI/Modal";
import { useUserContext } from "@/contexts/userContext";

const DownloadExcel = ({ fileName, apiEndPoint, payload, }) => {
    const [open, setOpen] = useState(false);
    const { setLoading } = useUserContext();

    const { t } = useTranslation()
    const { MESSAGE } = useTranslatedConstants()
    const { dateSchema } = MyComponent()

    const onSubmit = async (values) => {
        try {
            setLoading(true)
            const api_payload = {
                s_date: formatTime(values.start, 'YYYY-MM-DD'),
                e_date: formatTime(values.end, 'YYYY-MM-DD'),
                ...payload
            }
            const res = await ApiCall({ url: apiEndPoint, body: api_payload, method: 'POST' })
            if (res?.success) {
                if ((res.data || []).length > 0) {
                    convertToExcel(res.data)
                } else {
                    TOAST_ERROR(MESSAGE.EXCEL_DOWNLOAD_ERROR)
                }
            }
        } catch (error) {

        } finally { setLoading(false) }
    }

    const convertToExcel = (data) => {
        try {
            let EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';

            // Create a new worksheet
            const ws = XLSX.utils.json_to_sheet(data);

            // Create a workbook and add the worksheet
            const wb = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(wb, ws, 'Sheet 1');

            // Add header with "from" and "to" dates
            // const header = [
            //     ['From', 'To',],
            //     ['fromDate', 'toDate'],
            // ];

            // Insert the header at the beginning of the worksheet
            // XLSX.utils.sheet_add_aoa(ws, header);

            // Convert the workbook to a Blob
            const blob = XLSX.write(wb, { bookType: 'xlsx', type: 'array', mimeType: EXCEL_TYPE });
            const excelBlob = new Blob([blob], { type: EXCEL_TYPE });

            saveAs(excelBlob, `${fileName}-${formatTime(new Date(), "DD-MM-YYYY (hh:mm a)")}.xlsx`);
            setOpen(false)
        } catch (error) {

        }
    };
    return (
        <>
            <SecondaryBtn type="button" title={t('BUTTON.EXPORT')} onClick={() => setOpen(true)} />
            {open &&
                <Modal open={open} setOpen={setOpen}>
                    <div>
                        <Formik
                            enableReinitialize
                            initialValues={{ start: "", end: "" }}
                            validationSchema={dateSchema}
                            onSubmit={onSubmit}
                        >
                            {({ handleSubmit }) => {
                                return (
                                    <>
                                        <Form onSubmit={handleSubmit}>
                                            <div className="grid grid-cols-3 gap-3 mt-3 mb-8 items-start ">
                                                <FormikForm.DatePicker label={t('LABEL.START_DATE')} name="start" />
                                                <FormikForm.DatePicker label={t('LABEL.END_DATE')} name="end" />
                                                <Button type="submit" variant="solid" color="blue" className="w-fit mt-6" title={t('BUTTON.SUBMIT')} />
                                            </div>
                                        </Form>
                                    </>
                                );
                            }}
                        </Formik>
                    </div>
                </Modal>}
        </>
    )
}

export default DownloadExcel