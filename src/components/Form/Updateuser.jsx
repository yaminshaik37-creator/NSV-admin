"use client"
import { useState } from 'react'
//components
import { Button } from '@/components/UI/Button'
import { FormikForm } from "@/components/FormikForm"

//service
import ApiCall, { handleUploadImages } from '@/service/api'
// import { useLookupContext } from '@/contexts/lookupcontext'
// library
import { Formik, Form } from 'formik';

// constant
import { REGISTER_TAB } from "@/config/constants"
import { API_ENDPOINTS } from '@/config/api-endpoints'
import { updateUserSchema } from '@/config/constants/schema'
import { updateUserState } from '@/config/constants/initialValues'
import { useUserContext } from '@/contexts/userContext'


const Updateuser = ({ user, setCurrentTab, userRoles }) => {

    const [files, setFiles] = useState({})
    const [showUploadSignature, setShowUploadSignature] = useState(false)
    const [showLicense, setShowLicense] = useState(false)
    const { setLoading } = useUserContext();
    // const { setAccess } = useLookupContext()

    const onSubmit = async (values, helpers) => {
        try {
            setLoading(true)
            let uploadedSignature = ''
            if (values.role === "Doctor" || values.role === "Pharmacist") {
                //upload signature
                uploadedSignature = await handleUploadImages(files)
            }
            const payload = {
                ...values,
                id: user.id,
                uploaded_signature: uploadedSignature
            }
            const res = await ApiCall({ url: API_ENDPOINTS.UPDATE_USER, body: payload, method: "PUT" })
            if (res?.success) {
                localStorage.setItem("user", JSON.stringify(res.data))
                setCurrentTab(REGISTER_TAB.ADD_ADDRESS)
                setLoading(false)
            } else {
                helpers.setFieldError(res.data.field, res.data.message)
                setLoading(false)
            }
        } catch (err) {
            setLoading(false)
        }
    }
    const handleChangeRole = (e) => (setShowUploadSignature(e.target.value === "Doctor"), setShowLicense(e.target.value === "Pharmacist"))
    const updateFilesCb = (files) => { setFiles(Object.values(files)[0]) }

    // const handleUploadImages = async (file) => {
    //     let formdata = new FormData();
    //     formdata.append("file", file);

    //     const requestOptions = {
    //         method: 'POST',
    //         body: formdata,
    //     };
    //     const res = await fetch(API_ENDPOINTS.UPLOAD_IMG, requestOptions)
    //     const data = await res.json()
    //     if (data?.success) {
    //         return data.data
    //     }
    // }
    return (
        <>
            <Formik
                initialValues={updateUserState}
                validationSchema={updateUserSchema}
                onSubmit={onSubmit}
            >
                {({ handleSubmit }) => {
                    return (
                        <>
                            <Form onSubmit={handleSubmit} className="mt-10 grid grid-cols-1 gap-y-1">
                                <FormikForm.Input
                                    label="First Name"
                                    id="first_name"
                                    name="first_name"
                                    type="text"
                                />
                                <FormikForm.Input
                                    label="Last Name"
                                    id="last_name"
                                    name="last_name"
                                    type="text"
                                />
                                <FormikForm.Input
                                    label="Date of Birth"
                                    id="birth_date"
                                    name="birth_date"
                                    type="date"
                                />
                                <FormikForm.Input
                                    label="Email"
                                    id="email"
                                    name="email"
                                    type="email"
                                />
                                <FormikForm.MultipleSelect
                                    singleSelect={true}
                                    label="Role"
                                    name="role"
                                    options={userRoles}
                                    onChange={handleChangeRole}
                                />
                                {showUploadSignature && <FormikForm.Input
                                    label="RMP Number"
                                    name="rmp_number"
                                />}
                                {showLicense && <FormikForm.Input
                                    label="License Number"
                                    name="license_number"
                                />}
                                <FormikForm.Input
                                    label="Create Password"
                                    id="password"
                                    name="password"
                                    type="password"
                                />
                                <FormikForm.Input
                                    label="Confirm Password"
                                    id="confirm_password"
                                    name="confirm_password"
                                    type="password"
                                />
                                {(showUploadSignature || showLicense) && <FormikForm.FileUpload
                                    label="Upload Signature"
                                    name="uploaded_signature"
                                    updateFilesCb={updateFilesCb}
                                    value={''}
                                />}
                                <Button
                                    type="submit"
                                    variant="solid"
                                    color="blue"
                                    className="w-full mt-3 px-0"

                                    title='Next'
                                />
                            </Form>
                        </>
                    );
                }}
            </Formik>
        </>
    )
}

export default Updateuser