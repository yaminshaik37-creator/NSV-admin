import { EMAIL_REGEX, useTranslatedConstants } from './index'
import * as Yup from 'yup'
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import minMax from "dayjs/plugin/minMax";
import { isOverlapping } from '@/utils/helper';
dayjs.extend(customParseFormat);
dayjs.extend(minMax);

const YUP_STRING = Yup.string().trim()


export const MyComponent = () => {

  const { FormError } = useTranslatedConstants()
  const passwordSchema = YUP_STRING.min(8, FormError.INCORRECT_PASSWORD).matches(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*()\-_=+{};:,<.>]).{8,}$/, FormError.INCORRECT_PASSWORD).required(FormError.FIELD_REQUIRED);
  const setPswdBase = {
    password: passwordSchema,
    confirm_password: YUP_STRING.oneOf([Yup.ref('password'), null], 'Passwords must match').required(FormError.FIELD_REQUIRED),
  }
  const loginSchema = Yup.object().shape({
    phone: YUP_STRING.required(FormError.FIELD_REQUIRED).matches(/^[0-9]+$/, FormError.ONLY_NUMBERS).min(10).max(10),
  });
  const OtpSchema = Yup.object().shape({
    otp: YUP_STRING.required(FormError.FIELD_REQUIRED),
  })
  const OtpPswdSchema = Yup.object().shape({
    otp: YUP_STRING.required(FormError.FIELD_REQUIRED),
    ...setPswdBase,
  })
  const pswdSchema = Yup.object().shape(
    {
      password: passwordSchema,
    }
  )
  const regSchema = Yup.object().shape({
    first_name: YUP_STRING.required(FormError.FIELD_REQUIRED).matches(/^[A-Za-z.\-'\s]+$/, FormError.ALPHABETS).max(15, FormError.INVALID_LENGTH_15),
    last_name: YUP_STRING.required(FormError.FIELD_REQUIRED).matches(/^[A-Za-z.\-'\s]+$/, FormError.ALPHABETS).max(15, FormError.INVALID_LENGTH_15),
    ...setPswdBase,
  });
  const regPatSchema = Yup.object().shape({
    ...setPswdBase,
    first_name: YUP_STRING.min(2, FormError.MIN_LENGTH).max(30, FormError.MAX_LENGTH).required(FormError.FIELD_REQUIRED).matches(/^[A-Za-z.\-'\s]+$/, FormError.ALPHABETS),
    last_name: YUP_STRING.min(2, FormError.MIN_LENGTH).max(30, FormError.MAX_LENGTH).required(FormError.FIELD_REQUIRED).matches(/^[A-Za-z.\-'\s]+$/, FormError.ALPHABETS),
    email: YUP_STRING.matches(EMAIL_REGEX, FormError.INVALID_EMAIL).notRequired(),
    pincode_id: Yup.object().required(FormError.FIELD_REQUIRED),
    gender: YUP_STRING.required(FormError.FIELD_REQUIRED),
  });
  const centerSchema = Yup.object().shape({
    name: YUP_STRING.required(FormError.FIELD_REQUIRED),
    address: YUP_STRING.required(FormError.FIELD_REQUIRED),
    pincode: Yup.object().required(FormError.FIELD_REQUIRED),
    city: YUP_STRING.required(FormError.FIELD_REQUIRED),
    state: YUP_STRING.required(FormError.FIELD_REQUIRED),
    license_number: YUP_STRING.required(FormError.FIELD_REQUIRED),
    status: YUP_STRING.required(FormError.FIELD_REQUIRED),
  })

  const testSchema = Yup.object().shape({
    fk_test_type_id: YUP_STRING.required(FormError.FIELD_REQUIRED),
    fk_category_id: YUP_STRING.required(FormError.FIELD_REQUIRED),
    fk_sub_category_id: YUP_STRING.required(FormError.FIELD_REQUIRED),
    test_name: YUP_STRING.required(FormError.FIELD_REQUIRED),
    description: YUP_STRING.required(FormError.FIELD_REQUIRED),
    instructions: YUP_STRING.required(FormError.FIELD_REQUIRED),
  })

  const resourceSchema = Yup.object().shape({
    name: YUP_STRING.min(2, FormError.MIN_LENGTH).max(30, FormError.MAX_LENGTH).required(FormError.FIELD_REQUIRED),
    description: YUP_STRING.required(FormError.FIELD_REQUIRED),
    duration: Yup.string().matches(/^\d+$/, FormError.INVALID_NUMBER).test("max-duration", "Duration cannot be greater than 1440 minutes", (value) => !value || parseInt(value, 10) <= 1440).required(FormError.FIELD_REQUIRED),
    time_slots: Yup.array()
      .of(
        Yup.object().shape({
          day_of_week: Yup.array().min(1, FormError.FIELD_REQUIRED).required(FormError.FIELD_REQUIRED),
          from_time: Yup.string().required(FormError.FIELD_REQUIRED),
          to_time: Yup.string().required(FormError.FIELD_REQUIRED).test("is-after-from-time", FormError.TO_TIME, function (value) { const { from_time } = this.parent; return (!from_time || !value || new Date(`1970-01-01T${value}`) > new Date(`1970-01-01T${from_time}`)); }),
        })
      )
  })

  const createDcTestValidationSchema = Yup.object({
    fk_master_test_id: Yup.number().integer().required(FormError.FIELD_REQUIRED),
    fk_availability_group_id: Yup.number().integer().notRequired(),
    description: YUP_STRING.default('').required(FormError.FIELD_REQUIRED),
    cost_inr: Yup.number().positive().required(FormError.FIELD_REQUIRED),
    avg_duration_min: Yup.number().integer().positive().required(FormError.FIELD_REQUIRED),
    report_time_hr: Yup.number().integer().positive().required(FormError.FIELD_REQUIRED),
    instructions: YUP_STRING.default('').required(FormError.FIELD_REQUIRED),
    time_based_discount: Yup.array()
      .of(
        Yup.object({
          day: YUP_STRING.required(FormError.FIELD_REQUIRED),
          time_range: Yup.object({
            start: YUP_STRING.required(FormError.FIELD_REQUIRED),
            end: YUP_STRING.required(FormError.FIELD_REQUIRED),
          }).required(),
          discount_percent: Yup.number()
            .min(0)
            .max(100)
            .required(FormError.FIELD_REQUIRED),
        })
      )
      .notRequired(),
  });


  const timeSlotSchema = Yup.object().shape({
    start: YUP_STRING
      .required(FormError.FIELD_REQUIRED)
      .test("valid-time", FormError.INVALID_TIME, val => {
        return dayjs(dayjs(val).format("HH:mm"), "HH:mm", true).isValid()
      }
      ),
    end: YUP_STRING
      .required(FormError.FIELD_REQUIRED)
      .test("valid-time", FormError.INVALID_TIME, val =>
        dayjs(dayjs(val).format("HH:mm"), "HH:mm", true).isValid()
      )
      .test("after-start", FormError.INVALID_TIME_RANGE, function (end) {
        const { start } = this.parent;
        if (!dayjs(dayjs(start).format("HH:mm"), "HH:mm", true).isValid() ||
          !dayjs(dayjs(end).format("HH:mm"), "HH:mm", true).isValid()) {
          return true;
        }
        return dayjs(dayjs(end).format("HH:mm"), "HH:mm").isAfter(dayjs(dayjs(start).format("HH:mm"), "HH:mm"));
      })
  });


  const availabilityGroupSchema = Yup.object().shape({
    name: YUP_STRING.required(FormError.FIELD_REQUIRED),
    description: YUP_STRING.required(FormError.FIELD_REQUIRED),
    slots: Yup.array().of(
      Yup.object().shape({
        day: YUP_STRING.required(FormError.FIELD_REQUIRED),
        slots: Yup.array()
          .of(timeSlotSchema)
          .test("no-overlap", FormError.TIME_SLOT_OVERLAP, slots => {
            return !isOverlapping(slots.map(slot => ({
              start: dayjs(slot.start).format("HH:mm"),
              end: dayjs(slot.end).format("HH:mm")
            })));
          })
      })
    )
  });

  const createHolidayValidationSchema = Yup.object().shape({
    name: Yup.string()
      .trim()
      .min(1, FormError.HOLIDAY_NAME_REQUIRED)
      .required(FormError.FIELD_REQUIRED),

    holidaytype: Yup.string()
      .oneOf(['date', 'weekday'], FormError.HOLIDAY_TYPE_REQUIRED)
      .required(FormError.FIELD_REQUIRED),

    date: Yup.string()
      .when('holidaytype', {
        is: 'date',
        then: schema => schema
          .required(FormError.FIELD_REQUIRED)
          .test('is-valid-date', FormError.INVALID_DATE, value => !!value && dayjs(value, 'YYYY-MM-DD', true).isValid()),
        otherwise: schema => schema.notRequired().nullable(),
      }),

    weekday: Yup.number()
      .when('holidaytype', {
        is: 'weekday',
        then: schema => schema
          .required(FormError.FIELD_REQUIRED)
          .min(0, FormError.WEEKDAY_RANGE)
          .max(6, FormError.WEEKDAY_RANGE),
        otherwise: schema => schema.notRequired().nullable(),
      }),
  })

  const createShiftValidationSchema = Yup.object().shape({
    shift_name: YUP_STRING.required("Shift name is required"),

    start_time: Yup.date()
      .typeError("Start time is required")
      .required("Start time is required"),

    end_time: Yup.date()
      .typeError("End time is required")
      .required("End time is required")
      .test("after-start", "End time must be after start time", function (end) {
        const { start_time } = this.parent;

        if (!start_time || !end) return true;

        return dayjs(end).isAfter(dayjs(start_time));
      }),
  });

  const createStaffValidationSchema = Yup.object().shape({
    email: YUP_STRING.required(FormError.FIELD_REQUIRED).matches(EMAIL_REGEX, FormError.INVALID_EMAIL),
    full_name: YUP_STRING.required(FormError.FIELD_REQUIRED),
    phone: YUP_STRING.required(FormError.FIELD_REQUIRED).matches(/^[0-9]+$/, FormError.ONLY_NUMBERS).min(10).max(10),
    role: YUP_STRING.required(FormError.FIELD_REQUIRED),
    shift: YUP_STRING.required(FormError.FIELD_REQUIRED),
    address: YUP_STRING.required(FormError.FIELD_REQUIRED),
    emergency_contact: YUP_STRING.required(FormError.FIELD_REQUIRED),
  });

  const createDoctorValidationSchema = Yup.object().shape({
    full_name: YUP_STRING.required(FormError.FIELD_REQUIRED),
    type: YUP_STRING.required(FormError.FIELD_REQUIRED),
    mobile: YUP_STRING.required(FormError.FIELD_REQUIRED),
    rmp_number: YUP_STRING.required(FormError.FIELD_REQUIRED),
    max_patient_discount: Yup.number().min(0).max(100).required(FormError.FIELD_REQUIRED),
    doctor_points_allowed: Yup.string().oneOf(['yes', 'no']).required(FormError.FIELD_REQUIRED),
    address: YUP_STRING.required(FormError.FIELD_REQUIRED),
  });

  const addDCSch = Yup.object().shape({
    domain: YUP_STRING.required(FormError.FIELD_REQUIRED),
    center_name: YUP_STRING.min(2, FormError.MIN_LENGTH).max(50, FormError.MAX_LENGTH).required(FormError.FIELD_REQUIRED),
    license_number: YUP_STRING.min(2, FormError.MIN_LENGTH).max(50, FormError.MAX_LENGTH).required(FormError.FIELD_REQUIRED),
    address_line_1: YUP_STRING.max(500, FormError.MAX_LENGTH).required(FormError.FIELD_REQUIRED),
    city: YUP_STRING.required(FormError.FIELD_REQUIRED),
    state: YUP_STRING.required(FormError.FIELD_REQUIRED),
    first_name: YUP_STRING.min(2, FormError.MIN_LENGTH).max(50, FormError.MAX_LENGTH).required(FormError.FIELD_REQUIRED).matches(/^[A-Za-z.\-'\s]+$/, FormError.ALPHABETS),
    last_name: YUP_STRING.min(2, FormError.MIN_LENGTH).max(50, FormError.MAX_LENGTH).required(FormError.FIELD_REQUIRED).matches(/^[A-Za-z.\-'\s]+$/, FormError.ALPHABETS),
    phone: YUP_STRING.required(FormError.FIELD_REQUIRED).matches(/^[0-9]+$/, FormError.ONLY_NUMBERS).min(10).max(10),
    email: YUP_STRING.matches(EMAIL_REGEX, FormError.INVALID_EMAIL),
    pincode: Yup.object().required(FormError.FIELD_REQUIRED).nullable(),
  });

  const manageTestSch = Yup.object().shape({
    type: YUP_STRING.required(FormError.FIELD_REQUIRED),
    level_1: YUP_STRING.required(FormError.FIELD_REQUIRED),
    test_id: YUP_STRING.required(FormError.FIELD_REQUIRED),
    description: YUP_STRING.default('').required(FormError.FIELD_REQUIRED),
    cost: Yup.number().typeError(FormError.INVALID_NUMBER).positive("Cost must be greater than 0").max(9999999999, "Cost cannot exceed 10 digits").required(FormError.FIELD_REQUIRED),
    concurrency: Yup.number().typeError(FormError.INVALID_NUMBER).min(1).max(9999999999, "Cost cannot exceed 10 digits").required(FormError.FIELD_REQUIRED),
    duration_type: YUP_STRING.required(FormError.FIELD_REQUIRED),
    // duration: Yup.string().matches(/^\d+$/, FormError.INVALID_NUMBER).test("max-duration", "Duration cannot be greater than 10080 ", (value) => !value || parseInt(value, 10) <= 10080).required(FormError.FIELD_REQUIRED),
    duration: Yup.string().matches(/^\d+$/, FormError.INVALID_NUMBER).required(FormError.FIELD_REQUIRED).test("max-duration", function (value) { const { duration_type } = this.parent; if (!value || !duration_type) return true; const numValue = parseInt(value, 10); let maxValue = 0; switch (Number(duration_type)) { case 1: maxValue = 60; break; case 60: maxValue = 24; break; case 1440: maxValue = 30; break; case 10080: maxValue = 4; break; default: return true; } return numValue <= maxValue ? true : this.createError({ message: `Duration cannot be greater than ${maxValue}` }); }),
    instructions: YUP_STRING.default('').required(FormError.FIELD_REQUIRED),
    resource_id: YUP_STRING.required(FormError.FIELD_REQUIRED),
    // time_slots: Yup.array()
    //   .of(
    //     Yup.object().shape({
    //       day_of_week: Yup.array().min(1, FormError.FIELD_REQUIRED).required(FormError.FIELD_REQUIRED),
    //       from_time: Yup.string().required(FormError.FIELD_REQUIRED),
    //       to_time: Yup.string().required(FormError.FIELD_REQUIRED).test("is-after-from-time", FormError.TO_TIME, function (value) { const { from_time } = this.parent; return (!from_time || !value || new Date(`1970-01-01T${value}`) > new Date(`1970-01-01T${from_time}`)); }),
    //       discount: Yup.number().typeError(FormError.INVALID_NUMBER).min(0, FormError.LESS_DISCOUNT).max(100, FormError.MAX_DISCOUNT).required(FormError.FIELD_REQUIRED),
    //     })
    //   )
  });

  const testMasterSch = Yup.object().shape({
    type: YUP_STRING.required(FormError.FIELD_REQUIRED),
    level_1: YUP_STRING.required(FormError.FIELD_REQUIRED),
    level_2: YUP_STRING.required(FormError.FIELD_REQUIRED),
  });

  const holidaySchema = Yup.object().shape({
    name: YUP_STRING.min(2, FormError.MIN_LENGTH).max(50, FormError.MAX_LENGTH).required(FormError.FIELD_REQUIRED),
    holiday_date: Yup.date().nullable().when("holiday_type", { is: "fixed", then: (schema) => schema.required(FormError.FIELD_REQUIRED), otherwise: (schema) => schema.notRequired() }),
    week_of_month: Yup.string().nullable().when("holiday_type", { is: (val) => val !== "fixed", then: (schema) => schema.required(FormError.FIELD_REQUIRED), otherwise: (schema) => schema.notRequired() }),
    day_of_week: Yup.string().nullable().when("holiday_type", { is: (val) => val !== "fixed", then: (schema) => schema.required(FormError.FIELD_REQUIRED), otherwise: (schema) => schema.notRequired() })
  });

  const stafftSch = Yup.object().shape({
    first_name: YUP_STRING.min(2, FormError.MIN_LENGTH).max(30, FormError.MAX_LENGTH).required(FormError.FIELD_REQUIRED).matches(/^[A-Za-z.\-'\s]+$/, FormError.ALPHABETS),
    last_name: YUP_STRING.min(2, FormError.MIN_LENGTH).max(30, FormError.MAX_LENGTH).required(FormError.FIELD_REQUIRED).matches(/^[A-Za-z.\-'\s]+$/, FormError.ALPHABETS),
    phone: YUP_STRING.required(FormError.FIELD_REQUIRED).matches(/^[0-9]+$/, FormError.ONLY_NUMBERS).min(10).max(10),
    pincode_id: Yup.object().required(FormError.FIELD_REQUIRED).nullable(),
    time_slots: Yup.array()
      .of(
        Yup.object().shape({
          day_of_week: Yup.array().min(1, FormError.FIELD_REQUIRED).required(FormError.FIELD_REQUIRED),
          from_time: Yup.string().required(FormError.FIELD_REQUIRED),
          to_time: Yup.string().required(FormError.FIELD_REQUIRED).test("is-after-from-time", FormError.TO_TIME, function (value) { const { from_time } = this.parent; return (!from_time || !value || new Date(`1970-01-01T${value}`) > new Date(`1970-01-01T${from_time}`)); }),
        })
      )
  });

  const patientSch = Yup.object().shape({
    first_name: YUP_STRING.min(2, FormError.MIN_LENGTH).max(30, FormError.MAX_LENGTH).required(FormError.FIELD_REQUIRED).matches(/^[A-Za-z.\-'\s]+$/, FormError.ALPHABETS),
    last_name: YUP_STRING.min(2, FormError.MIN_LENGTH).max(30, FormError.MAX_LENGTH).required(FormError.FIELD_REQUIRED).matches(/^[A-Za-z.\-'\s]+$/, FormError.ALPHABETS),
    phone: YUP_STRING.required(FormError.FIELD_REQUIRED).matches(/^[0-9]+$/, FormError.ONLY_NUMBERS).min(10).max(10),
    email: YUP_STRING.matches(EMAIL_REGEX, FormError.INVALID_EMAIL).notRequired(),
    pincode_id: Yup.object().required(FormError.FIELD_REQUIRED),
    gender: YUP_STRING.required(FormError.FIELD_REQUIRED),
  });

  const doctorSch = Yup.object().shape({
    first_name: YUP_STRING.min(2, FormError.MIN_LENGTH).max(30, FormError.MAX_LENGTH).required(FormError.FIELD_REQUIRED).matches(/^[A-Za-z.\-'\s]+$/, FormError.ALPHABETS),
    last_name: YUP_STRING.min(2, FormError.MIN_LENGTH).max(30, FormError.MAX_LENGTH).required(FormError.FIELD_REQUIRED).matches(/^[A-Za-z.\-'\s]+$/, FormError.ALPHABETS),
    phone: YUP_STRING.required(FormError.FIELD_REQUIRED).matches(/^[0-9]+$/, FormError.ONLY_NUMBERS).min(10).max(10),
    email: YUP_STRING.matches(EMAIL_REGEX, FormError.INVALID_EMAIL).notRequired(),
    // speciality_id: YUP_STRING.required(FormError.FIELD_REQUIRED),
    max_discount: Yup.number().typeError(FormError.INVALID_NUMBER).max(100, FormError.MAX_DISCOUNT).test("is-integer", FormError.NOT_DECIMAL, value => Number.isInteger(value)),
    // points: Yup.number().typeError(FormError.INVALID_NUMBER).min(0, FormError.LESS_DISCOUNT).max(1000000).required(FormError.FIELD_REQUIRED),
    points_allowed: YUP_STRING.required(FormError.FIELD_REQUIRED),
    pincode_id: Yup.object().required(FormError.FIELD_REQUIRED).nullable(),
  });

  const profileUpdateSchema = Yup.object().shape({
    first_name: YUP_STRING.min(2, FormError.MIN_LENGTH).max(30, FormError.MAX_LENGTH).required(FormError.FIELD_REQUIRED).matches(/^[A-Za-z.\-'\s]+$/, FormError.ALPHABETS),
    last_name: YUP_STRING.min(2, FormError.MIN_LENGTH).max(30, FormError.MAX_LENGTH).required(FormError.FIELD_REQUIRED).matches(/^[A-Za-z.\-'\s]+$/, FormError.ALPHABETS),
    phone: YUP_STRING.required(FormError.FIELD_REQUIRED).matches(/^[0-9]+$/, FormError.ONLY_NUMBERS).min(10).max(10),
    email: YUP_STRING.matches(EMAIL_REGEX, FormError.INVALID_EMAIL).notRequired(),
  });

  const passwordResetSchema = Yup.object().shape(
    {
      current_password: passwordSchema,
      ...setPswdBase,
    }
  );

  const discountSch = Yup.object().shape({
    day_of_week: Yup.array().min(1, FormError.FIELD_REQUIRED).required(FormError.FIELD_REQUIRED),
    tests: Yup.array().min(1, FormError.FIELD_REQUIRED).required(FormError.FIELD_REQUIRED),
    from_time: Yup.string().required(FormError.FIELD_REQUIRED),
    type: Yup.string().required(FormError.FIELD_REQUIRED),
    to_time: Yup.string().required(FormError.FIELD_REQUIRED).test("is-after-from-time", FormError.TO_TIME, function (value) { const { from_time } = this.parent; return (!from_time || !value || new Date(`1970-01-01T${value}`) > new Date(`1970-01-01T${from_time}`)); }),
    discount: Yup.number().typeError(FormError.INVALID_NUMBER).min(0, FormError.LESS_DISCOUNT).max(100, FormError.MAX_DISCOUNT).required(FormError.FIELD_REQUIRED).test("is-integer", FormError.INVALID_NUMBER, value => Number.isInteger(value)),
  });
  const testSch = Yup.object().shape({
    doctor: Yup.object().required(FormError.FIELD_REQUIRED),
    tests: Yup.array().min(1, FormError.FIELD_REQUIRED).required(FormError.FIELD_REQUIRED),
  });
  const testDocSch = Yup.object().shape({
    tests: Yup.array().min(1, FormError.FIELD_REQUIRED).required(FormError.FIELD_REQUIRED),
  });

  const addRoleSchema = Yup.object().shape({
    name: YUP_STRING.min(2, FormError.MIN_LENGTH).max(30, FormError.MAX_LENGTH).required(FormError.FIELD_REQUIRED),
  });
  const paymentSch = (max_disc) => Yup.object().shape({
    discount: Yup.number().typeError(FormError.INVALID_NUMBER).min(0, FormError.LESS_DISCOUNT).max(max_disc,).required(FormError.FIELD_REQUIRED),
    advance: Yup.number().typeError(FormError.INVALID_NUMBER).min(0, FormError.LESS_DISCOUNT).max(100).required(FormError.FIELD_REQUIRED).test("is-integer", FormError.INVALID_NUMBER, value => Number.isInteger(value)),
    payment_method: YUP_STRING.required(FormError.FIELD_REQUIRED)
  })

  const testScheduleSch = Yup.object().shape({
    schedule_test: Yup.array().min(1)
      .of(
        Yup.object().shape({
          time: Yup.object().required(FormError.FIELD_REQUIRED),
          date: Yup.date().required(FormError.FIELD_REQUIRED),
        })
      )
  });

  const searchSch = Yup.object().shape({
    search: YUP_STRING.min(2, FormError.MIN_LENGTH)
  });
  const newPassSchema = Yup.object().shape({
    ...setPswdBase
  });

  return {
    newPassSchema, addDCSch, centerSchema, testDocSch, testSch, testScheduleSch, paymentSch,
    regSchema, regPatSchema,
    loginSchema,
    pswdSchema,
    OtpSchema,
    OtpPswdSchema,
    testSchema,
    resourceSchema,
    availabilityGroupSchema,
    createDcTestValidationSchema,
    createHolidayValidationSchema,
    createShiftValidationSchema,
    createStaffValidationSchema,
    createDoctorValidationSchema,
    manageTestSch,
    holidaySchema,
    stafftSch,
    patientSch,
    doctorSch,
    profileUpdateSchema,
    passwordResetSchema,
    discountSch,
    testMasterSch,
    addRoleSchema,
    searchSch
  };
}
