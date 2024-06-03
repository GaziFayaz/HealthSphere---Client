import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/bundle";
import AOS from "aos";
import "aos/dist/aos.css";

import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { useEffect } from "react";

const Slider = () => {
	useEffect(() => {
		AOS.init();
		AOS.refresh();
	}, []);

	const slideContent = [
		<>
			<h1 className="w-1/2 text-4xl md:text-7xl text-rose-600 font-bold font-slab">
				Spring Sale!
			</h1>
			<h1 className="text-gray-700 font-medium md:text-3xl md:tracking-wide">
				Up to <strong>50%</strong> off on Allergy Medications!
			</h1>
		</>,
		<>
			<h1 className="w-1/2 text-4xl md:text-7xl text-rose-600 font-bold font-slab">
				New Arrivals
			</h1>
			<h1 className="text-gray-700 font-medium md:text-3xl md:tracking-wide">
				Discover the <strong>Latest</strong> in Health and Wellness.
			</h1>
		</>,
		<>
			<h1 className="w-1/2 text-4xl md:text-7xl text-rose-600 font-bold font-slab">
				Stay Healthy This Winter
			</h1>
			<h1 className="text-gray-700 font-medium md:text-3xl md:tracking-wide">
				Get Your Flu Vaccines <strong>Now</strong>!
			</h1>
		</>,
	];
	return (
		<div data-aos="fade-up" className="w-full mt-24">
			<Swiper
				className=""
				pagination={{
					dynamicBullets: true,
				}}
				loop={true}
				autoplay={{
					delay: 5000,
					disableOnInteraction: false,
				}}
				navigation={true}
				modules={[Autoplay, Pagination, Navigation]}
			>
				{slideContent.map((content, index) => {
					return (
						<SwiperSlide key={index}>
							<div className="bg-theme2 min-w-screen  py-36 md:py-10 md:px-16 md:min-h-[400px] bg-cover bg-center bg-no-repeat flex flex-col gap-10 justify-center text-white font-roboto rounded-3xl">
								{content}
							</div>
						</SwiperSlide>
					);
				})}
			</Swiper>
		</div>
	);
};

export default Slider;
