import SearchIcon from "@/images/icons/SearchIcon";
import SendIcon from "@/images/icons/SendIcon";
import { debounce } from "lodash"

const Search = ({ getLists, label, extraStyle, containerStyle, placeholder, type = 'text' }) => {

    const debouncedHandleSearch = debounce((inputText) => {
        if (inputText.length >= 2 || inputText.length == 0) {
            getLists({ query: inputText })
        }
    }, 1000);

    const handleSearch = (e) => {
        const value = e.target.value;
        debouncedHandleSearch(value);
    };
    return (
        <div className={`relative ${containerStyle ? containerStyle : "w-full"}`}>
            <label
                className="block manrope-regular-sm text-light-gray"
            >
                {label}
            </label>
            <input type={type} className={`ic-input py-3.5 outline-none ps-10 pe-5 placeholder:manrope-regular-sm ${extraStyle ? extraStyle : ""}`} onChange={handleSearch} placeholder={placeholder} />
            <div className="absolute left-4 top-1/2 -translate-y-1/2">
                <SearchIcon />
            </div>

            {/* <div className="absolute right-4 top-1/2 -translate-y-1/2">
                <SendIcon />
            </div> */}
            <div className="mt-1" />
        </div>


    )
}

export default Search