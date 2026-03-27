import { getImageUrl } from "@/utils/helper";
import { useEffect, useState } from "react";

const AsyncIFrame = (props) => {
  const [image, setImage] = useState('');
  useEffect(() => {
    getImg()
  }, [props.img])
  const getImg = async () => {
    if (!props.img) return
    setImage(await getImageUrl(props.img))
  }
  return (
    <>
      {<iframe src={image} className="w-[100%] h-[70vh]">  </iframe>}
    </>
  )
}

export default AsyncIFrame