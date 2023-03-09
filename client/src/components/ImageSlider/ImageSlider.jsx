import "./styles.css";
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
    arrows: false,
  };

  return (
    <>
      {images?.length > 0 ? (
        <Slider {...settings}>
          {images.map((image, i) => {
            return (
              <div key={i}>
                <Photo photoRef={image} size="full" />
              </div>
            );
          })}
        </Slider>
      ) : (
        <img
          className="default-store-img"
          src="https://twr-coffee-me.s3.amazonaws.com/images/default-store.jpg"
          alt=""
        />
      )}
    </>
  );
};

export default ImageSlider;
