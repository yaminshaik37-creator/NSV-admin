import * as Yup from 'yup';
import { FormError } from "@/config/constants"
import { diffInTime } from '@/utils/helper';

const YUP_STRING = Yup.string().trim()

export const MyComponent = () => {

const { FormError } = useTranslatedConstants()

const newPassInitialState = { confirm_password: "", password: "" }
const newPassSchema = Yup.object().shape({
    password: YUP_STRING.min(8, FormError.INCORRECT_PASSWORD).matches(/^(?=.*[!@#$%^&*()\-_=+{};:,<.>])|(?=.*\d).*$/, FormError.INCORRECT_PASSWORD).required(FormError.INCORRECT_PASSWORD),
    confirm_password: YUP_STRING.oneOf([Yup.ref('password'), null], 'Passwords must match').required('Password confirmation is required.'),
});

const passLoginState = { password: "" }
const passLoginSchema = Yup.object().shape({ password: YUP_STRING.min(8, FormError.INCORRECT_PASSWORD).matches(/^(?=.*[!@#$%^&*()\-_=+{};:,<.>])|(?=.*\d).*$/, FormError.INCORRECT_PASSWORD).required(FormError.INCORRECT_PASSWORD), });

const updateUserState = { first_name: "", last_name: "", birth_date: "", password: "", confirm_password: "", email: "", role: "", uploaded_signature: "", license_number: "", rmp_number: "" }
const updateUserSchema = Yup.object().shape({
    first_name: YUP_STRING.required('First Name Required'),
    last_name: YUP_STRING.required('First Name Required'),
    role: YUP_STRING.required('Role Required'),
    birth_date: YUP_STRING.required('Birthdate must be Required').test({
        test: value => {
            if (value != undefined)
                return diffInTime(value) >= 18;
            else return true
        }, message: "You must be 18 years old"
    }),
    email: YUP_STRING.email('Invalid email').required('Email Required'),
    password: YUP_STRING.min(8, FormError.INCORRECT_PASSWORD).matches(/^(?=.*[!@#$%^&*()\-_=+{};:,<.>])|(?=.*\d).*$/, FormError.INCORRECT_PASSWORD).required(FormError.INCORRECT_PASSWORD),
    confirm_password: YUP_STRING.oneOf([Yup.ref('password'), null], 'Passwords must match').required('Password confirmation is required.'),
    uploaded_signature: YUP_STRING.when('role', ([role], schema) => {
        if (role == 'Doctor' || role == 'Pharmacist')
            return YUP_STRING.required(FormError.FIELD_REQUIRED);
        return schema;
    }),
    license_number: YUP_STRING.when('role', ([role], schema) => {
        if (role == 'Pharmacist')
            return YUP_STRING.required(FormError.FIELD_REQUIRED);
        return schema;
    }),
    rmp_number: YUP_STRING.when('role', ([role], schema) => {
        if (role == 'Doctor')
            return YUP_STRING.required(FormError.FIELD_REQUIRED);
        return schema;
    })
});

const OtpSchema = Yup.object().shape({ otp: YUP_STRING.min(5, FormError.INCORRECT_OTP).required(FormError.INCORRECT_OTP_REQUIRED) });

return {
    newPassInitialState, newPassSchema, passLoginState, passLoginSchema, updateUserState, updateUserSchema, OtpSchema
    }
}