import { getImageUrl } from "@/utils/helper";
import { useEffect, useState } from "react";

const AsyncLink = ({ children, img, className = '' }) => {
  const [link, setLink] = useState(null);
  useEffect(() => {
    getImg()
  }, [])
  const getImg = async () => {
    if (!img) return
    setLink(await getImageUrl(img))
  }
  return (
    <>
      {link && <>
        <a href={link} className={className} target="_blank"> {children}</a>
      </>}
    </>
  )
}

export default AsyncLink