import logo from "@/images/logos/loader.png";
import Image from "next/image";

const Loader = () => {
    return (
        <>
            <div className="fixed inset-0 z-[999] bg-[#cbc4d1]/50 flex items-center justify-center">
                <div className="logo-spin">
                    <Image className="w-20 h-20" src={logo} alt="Internal Capsule" />
                </div>
            </div>
        </>
    )
}

export default Loader