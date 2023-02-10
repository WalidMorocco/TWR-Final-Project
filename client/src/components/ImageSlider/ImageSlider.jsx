import "./styles.css";
import defaultStoreImg from "../../images/coffeeIcon.png";
import { Photo } from "../Photo/Photo";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const ImageSlider = ({ images }) => {
  const settings = {
    infinite: true,
    dots: true,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <>
      <Slider {...settings}>
        {images?.length > 0 ? (
          images.map((image, i) => {
            return (
              <div key={i}>
                <Photo photoRef={image} size="full" />
              </div>
            );
          })
        ) : (
          <img
            className="store-image full"
            src={defaultStoreImg}
            alt="Store Img"
          />
        )}
      </Slider>
    </>
  );
};

export default ImageSlider;
