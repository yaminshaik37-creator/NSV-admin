import { useUserContext } from "@/contexts/userContext";

import { Form, Formik } from "formik";
import { FormikForm } from "../FormikForm";

import { MyComponent } from "@/config/constants/schema";
import { setDCId } from "@/utils/TokenCache";

const DCLists = () => {
    const { passwordResetSchema } = MyComponent()

    const { dcList, setActiveDC, activeDC } = useUserContext()

    const onSubmit = async (e) => {
        try {
            setActiveDC(dcList.find(c => c.dc_id == e.target.value))
            setDCId(e.target.value)
        } catch (error) {

        }
    }

    return (
        <>
            {(dcList || []).length > 0 && <Formik
                enableReinitialize
                initialValues={{ dc: activeDC.dc_id }}
                validationSchema={passwordResetSchema}
            >
                {({ handleSubmit }) => {
                    return (
                        <>
                            <Form onSubmit={handleSubmit}>
                                <div>
                                    <FormikForm.Select name="dc" icInput={false} onChange={onSubmit} options={dcList.map(e => ({ label: e.center_name, value: e.dc_id }))} />
                                </div>
                            </Form>
                        </>
                    );
                }}
            </Formik>
            }
        </>
    )
}

export default DCLists;