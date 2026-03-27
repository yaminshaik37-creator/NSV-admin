import Modal from "@/components/shared/Modal"
import { Cross } from "@/config/icons";
import { getImageUrl } from "@/utils/helper";
import { useEffect, useState } from "react";
import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';

function ViewPrescriptionGallary({ open, setOpen, selectedImg }) {
    const [image, setImage] = useState();
    useEffect(() => {
        if (!selectedImg?.blob) {
            getImg()
        }
    }, [])
    const getImg = async () => {
        setImage(await getImageUrl(selectedImg))
    }
    return <>
        <Modal open={Boolean(open)} setOpen={setOpen}>
            <div className="fixed inset-0 z-[200] overflow-y-auto">
                <div className="flex md:min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                    <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 w-full sm:max-w-lg">
                        <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                            <div >
                                <div className="modal-header -m-6 mb-5 flex flex-shrink-0 items-center justify-between rounded-t-md border-b-2 border-neutral-100 border-opacity-100 p-4 dark:border-opacity-50">
                                    <h5
                                        className="text-xl font-medium leading-normal text-neutral-800"
                                        id="exampleModalLabel"
                                    >

                                    </h5>
                                    <button
                                        type="button"
                                        className="ml-auto"
                                        onClick={() => setOpen(false)}
                                        aria-label="Close"
                                    >
                                        <Cross />
                                    </button>
                                </div>
                                <div >
                                    <div>
                                        {selectedImg?.blob ? <>
                                            {selectedImg.name.endsWith('.pdf') || selectedImg.name.endsWith('.doc') || selectedImg.name.endsWith('.docx') ?
                                                <iframe src={selectedImg.blob} className="w-[100%] h-[700px]" frameBorder="0" />
                                                :
                                                <Zoom>
                                                    <img src={selectedImg.blob} />
                                                </Zoom>
                                            }
                                        </> :
                                            <>

                                                {image && <>
                                                    {selectedImg.endsWith('.pdf') || selectedImg.endsWith('.doc') || selectedImg.endsWith('.docx') ?
                                                        <iframe src={image} className="w-[100%] h-[700px]" frameBorder="0" />
                                                        :
                                                        <Zoom>
                                                            <img src={image} />
                                                        </Zoom>
                                                    }
                                                </>}
                                            </>}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Modal >
    </>
}
export default ViewPrescriptionGallary