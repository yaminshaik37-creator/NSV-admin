import { CURRENCY_LABEL } from "@/config/constants"
import { formatPriceWithSpaces } from "@/utils/helper"
import { FormikForm } from "../FormikForm"

const PriceField = ({ value, label, currency }) => {
    return (
        <>
            <div className="relative">
                {currency && <p className="currency absolute right-1.5 bottom-5">{CURRENCY_LABEL[currency]}</p>}
                <FormikForm.StaticInput data={formatPriceWithSpaces(value)} label={label} />
            </div>
        </>
    )
}

export default PriceField