import { getImageUrl } from "@/utils/helper";
import { useEffect, useState } from "react";

const AsyncImage = (props) => {
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
      <img src={image} alt="image" {...props} />
    </>
  )
}

export default AsyncImage