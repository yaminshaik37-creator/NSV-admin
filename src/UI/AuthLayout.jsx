
import { useUserContext } from "@/contexts/userContext";
import Title from "./Title";
import AsyncImage from "../shared/AsyncImage";

export function AuthLayout({ children, title }) {
  const { logos, refrenceDC } = useUserContext()

  return (
    <>
      <div className="flex flex-col md:flex-row w-full h-screen relative">
        <div className="flex justify-center items-center w-full px-4 md:py-4 pt-4 md:pl-4">
          <img src={`${process.env.PUBLIC_CDN}assets/${logos.cover}`} alt="logo" className="h-70 md:h-full md:w-auto object-cover rounded-xl" />
        </div>
        <div className="md:w-full sm:w-1/2 flex flex-col h-auto">
          <div className="h-full rounded-xl mt-4 mx-4 lg:m-6 bg-[#F7F8F8] flex flex-col p-4 md:flex-row lg:p-15">
            <div className='flex flex-col w-full gap-4 md:gap-6'>
              <div className="flex items-centerh-28 w-auto">
                {
                  refrenceDC.logo ? <AsyncImage img={refrenceDC.logo} /> :    <img src={`${process.env.PUBLIC_CDN}assets/${logos.logo}`} alt="logo" className="h-full w-auto" />
                }
              </div>
              <Title title={title} className={"manrope-medium-5xl text-dark-gray md:mt-12"} />
              <div>
                {children}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
