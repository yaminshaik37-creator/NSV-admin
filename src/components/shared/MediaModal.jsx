import { SETTINGS } from "@/config/constants";
import Modal from "../UI/Modal"
import AsyncIFrame from "./AsyncIFrame"
import Slider from "react-slick";
import PrimaryBtn from "../UI/PrimaryBtn";

const MediaModal = ({ open, setOpen, link, btn, cb }) => {
    return (
        <>
            <Modal open={open} setOpen={setOpen}>
                {Array.isArray(link) ?
                    <>
                        <Slider {...SETTINGS} >
                            {link.map((e, idx) => {
                                return (
                                    <div key={idx}>
                                        <AsyncIFrame img={e} />
                                    </div>
                                )
                            })}
                        </Slider>
                    </>
                    :
                    <>
                        <AsyncIFrame img={link} />
                    </>}
                {btn && <PrimaryBtn className={'mt-8 w-full'} title={btn} onClick={() => cb && cb()} />}
            </Modal>
        </>
    )
}

export default MediaModal