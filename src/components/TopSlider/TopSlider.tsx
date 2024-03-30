import { useState } from "react";
import { ChevronRight, ChevronLeft } from "react-bootstrap-icons";
import { Link } from "react-router-dom";
import styles from "./topslider.module.scss";

const images: { src: string }[] = [
  {
    src: "https://cdn.tgdd.vn/2022/08/banner/1200-44-1200x44.png",
  },
  {
    src: "https://cdn.tgdd.vn/2022/07/banner/1200-44-1200x44-13.png",
  },
  {
    src: "https://cdn.tgdd.vn/2022/08/banner/1200-44-1200x44-10.png",
  },
];
function TopSlider() {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const nextImage = () => {
    currentIndex < images.length - 1
      ? setCurrentIndex(currentIndex + 1)
      : setCurrentIndex(0);
  };
  const previousImage = () => {
    currentIndex > 0
      ? setCurrentIndex(currentIndex - 1)
      : setCurrentIndex(images.length - 1);
  };

  return (
    <div className={styles.topSlider}>
      <div className={styles.wrap}>
        <i onClick={previousImage}>
          <ChevronLeft />
        </i>
        <div className={styles.images}>
          <Link to="khuyen-mai">
            <img src={images[currentIndex].src} />
          </Link>
        </div>
        <i className={styles.right} onClick={nextImage}>
          <ChevronRight />
        </i>
      </div>
    </div>
  );
}

export default TopSlider;
