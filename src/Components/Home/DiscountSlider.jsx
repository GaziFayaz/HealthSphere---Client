// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
// import required modules
import { Autoplay, Navigation } from "swiper/modules";
import Product from "../Product/Product";

const DiscountSlider = () => {
	return (
		<div className="w-full mt-24">
			<h1 className="mb-8 text-2xl md:text-4xl lg:text-5xl font-slab font-bold text-theme2 text-center ">
				Discounts!
			</h1>
			<div className="bg-gray-700 py-4 px-3 md:py-8 md:px-5 lg:py-10 lg:px-6 rounded-xl md:rounded-2xl lg:rounded-3xl">
				<Swiper
					slidesPerView={1}
					spaceBetween={10}
					pagination={{
						clickable: true,
					}}
					loop={true}
					autoplay={{
						delay: 3000,
						disableOnInteraction: false,
					}}
					breakpoints={{
						640: {
							slidesPerView: 2,
							spaceBetween: 20,
						},
						768: {
							slidesPerView: 3,
							spaceBetween: 30,
						},
						1024: {
							slidesPerView: 4,
							spaceBetween: 50,
						},
					}}
					modules={[Autoplay, Navigation]}
					className="mySwiper"
				>
					<SwiperSlide>
						<Product></Product>
					</SwiperSlide>
					<SwiperSlide>
						<Product></Product>
					</SwiperSlide>
					<SwiperSlide>
						<Product></Product>
					</SwiperSlide>
					<SwiperSlide>
						<Product></Product>
					</SwiperSlide>
					<SwiperSlide>
						<Product></Product>
					</SwiperSlide>
					<SwiperSlide>
						<Product></Product>
					</SwiperSlide>
					<SwiperSlide>
						<Product></Product>
					</SwiperSlide>
					<SwiperSlide>
						<Product></Product>
					</SwiperSlide>
					<SwiperSlide>
						<Product></Product>
					</SwiperSlide>
				</Swiper>
			</div>
		</div>
	);
};

export default DiscountSlider;
