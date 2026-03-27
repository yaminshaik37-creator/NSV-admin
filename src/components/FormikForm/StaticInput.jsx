import { formatPriceWithSpaces, isNumberic } from "@/utils/helper"

const StaticInput = ({ data, label, type = 'text', required, ...rest }) => {
    return (
        <div className="mb-3">
            {label && <label className=" mb-2 block text-sm font-medium text-gray-700"  >
                {label}
            </label>}
            {
                type == 'textarea' ? <textarea rows={4} className='block w-full rounded-md ' value={data} disabled /> : <input type={'text'} className='block w-full ic-input px-5 py-4' value={isNumberic(data) ? formatPriceWithSpaces(data) : data} disabled  {...rest} />
            }
        </div>
    )
}

export default StaticInput