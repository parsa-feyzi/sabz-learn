import type { JSX } from "react/jsx-runtime";
import { Swiper } from "swiper/react";
import { Pagination, Autoplay, Navigation } from "swiper/modules";

function SwiperBox({
  children,
  spaceBetween = 30,
  delay = 2500,
}: {
  children: JSX.Element;
  spaceBetween?: number;
  delay?: number;
}) {
  return (
    <Swiper
      dir="rtl"
      slidesPerView={4}
      spaceBetween={spaceBetween}
      centeredSlides={true}
      autoplay={{
        delay: delay,
        disableOnInteraction: false,
      }}
      breakpoints={{
        200: {
          slidesPerView: 1,
          spaceBetween: 20,
        },
        640: {
          slidesPerView: 2,
          spaceBetween: 20,
        },
        1000: {
          slidesPerView: 3,
          spaceBetween: 25,
        },
        1224: {
          slidesPerView: 4,
          spaceBetween: 25,
        },
      }}
      loop={true}
      navigation={true}
      modules={[Navigation, Autoplay, Pagination]}
      className="mySwiper"
    >
      {children}
    </Swiper>
  );
}

export default SwiperBox;
