import { Form, Formik } from "formik";
import { OtpSchema } from "@/config/constants/schema";
import { API_ENDPOINTS } from "@/config/api-endpoints";
import { FormError } from "@/config/constants";
import ApiCall from "@/service/api";
import Modal from "../UI/Modal";
import { FormikForm } from "../FormikForm";
import { TOAST_SUCCESS, TOAST_ERROR } from "@/utils/toast";
import { Button } from "../UI/Button";
import { useEffect, useState } from "react";
import { secondToTimeFormate } from "@/utils/helper";

const SendOtp = ({ open, setOpen, user, setOtherUser }) => {
    const [seconds, setSeconds] = useState(60);

    useEffect(() => {
        let interval = setInterval(() => {
            if (seconds > 0) {
                setSeconds(seconds - 1);
            }

            if (seconds === 0) {
                clearInterval(interval);
            }
        }, 1000);

        return () => {
            clearInterval(interval);
        };
    }, [seconds]);

    const onSubmit = async (values) => {
        try {
            const payload = {
                mobile_number: user.mobile_number,
                otp: values.otp,
                type: "customer",
            };
            const res = await ApiCall({
                url: API_ENDPOINTS.VERIFY_OTP,
                body: payload,
                method: "POST",
            });
            if (res?.success) {
                TOAST_SUCCESS(FormError.OTP_VERIFIRED);
                setOtherUser && setOtherUser(res.data);
                setOpen(false);
            } else {
                TOAST_ERROR(res.data.message);
                return false;
            }
        } catch (error) { }
    };
    const resendOtp = async () => {
        setSeconds(60);
        const mobile_number = user.mobile_number;
        const res = await ApiCall({
            url: API_ENDPOINTS.SEND_OTP,
            body: { mobile_number, type: "customer" },
            method: "POST",
        });
        if (res?.success) {
            TOAST_SUCCESS(`Your OTP is ${res.data.otp}`);
        }
    };
    return (
        <>
            <Modal open={open} setOpen={setOpen}>
                <div className="text-center sm:text-left">
                    <div className="modal-body relative">
                        <div className="form-control mb-5">
                            <label>
                                Mobile number
                                <button
                                    className="float-right"
                                    onClick={() => setOpen(false)}
                                >
                                    Change
                                </button>
                            </label>
                            <div>
                                <b className="text-2xl login-mob-number">
                                    {user.mobile_number}
                                </b>
                            </div>
                        </div>
                        <Formik
                            initialValues={{ otp: "" }}
                            validationSchema={OtpSchema}
                            onSubmit={onSubmit}
                        >
                            {({ handleSubmit }) => {
                                return (
                                    <>
                                        <Form
                                            onSubmit={handleSubmit}
                                            className="grid grid-cols-1 gap-y-8"
                                        >
                                            <div className="form-control mb-5">
                                                <label>Enter OTP to verify</label>
                                                {/* <FormikForm.OtpInput
                                                    numberOfDigits={5}
                                                    inputType="tel"
                                                    name="otp"
                                                /> */}
                                            </div>
                                            <div className="flex">
                                                <div
                                                    className="mr-2 text-[#707674]"
                                                >
                                                    {seconds > 0 ? (
                                                        <p>
                                                            Time Remaining:
                                                            {secondToTimeFormate(seconds)}
                                                        </p>
                                                    ) : (
                                                        <p>Didnt recieved OTP?</p>
                                                    )}
                                                    <button
                                                        disabled={seconds > 0} className={`text-end ${seconds > 0 ? 'text-[#DFE3E8]' : 'text-[#FF5630]'} `}
                                                        onClick={resendOtp}
                                                    >
                                                        Resend OTP
                                                    </button>
                                                </div>
                                            </div>
                                            <Button
                                                type="submit"
                                                color="blue"
                                                title={'SUBMIT'}
                                            />

                                        </Form>
                                    </>
                                );
                            }}
                        </Formik>
                    </div>
                </div>
            </Modal>
        </>
    );
};
export default SendOtp