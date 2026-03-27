import { Cross } from "@/config/icons";
import UploadImg from '@/images/doc-thumbnail.png';
import Image from 'next/image';
import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';

const ImageList = ({ image, setFilesToUpload, setImage }) => {
    const removeImage = (id) => {
        setFilesToUpload((prev) => prev.filter(e => e.id !== id));
        setImage((prev) => prev.filter(e => e.id !== id));
    };

    return (
        <>
            {image.length !== 0 && (
                <div className='grid grid-cols-1 md:grid-cols-4 gap-4 mb-10'>
                    {image.map((el) => (
                        (el.isDoc || el.blob) && <div className='multiUploadItem-box' key={el.id}>
                            <div className='flex justify-between'>
                                <p>{el.name}</p>
                                <button type='button' onClick={() => removeImage(el.id)}>
                                    <Cross />
                                </button>
                            </div>
                            <div className='img'>
                                <Zoom>
                                    <Image
                                        width={100}
                                        height={100}
                                        src={el.isDoc ? UploadImg : el.blob}
                                        alt="uploaded file thumbnail"
                                    />
                                </Zoom>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </>
    );
}

export default ImageList;
