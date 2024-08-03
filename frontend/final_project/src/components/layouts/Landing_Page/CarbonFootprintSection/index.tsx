import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";
import SwiperCore, { Navigation, Pagination, Autoplay } from "swiper";

// Install Swiper modules
SwiperCore.use([Navigation, Pagination, Autoplay]);

export default function CarbonFootprintSection() {
	return (
		<div className="relative w-full">
			<Swiper
				pagination={{ clickable: true }}
				navigation={true}
				autoplay={{ delay: 3000 }}
				spaceBetween={50}
				slidesPerView={1}
				className="relative h-56 rounded-lg md:h-96"
			>
				<SwiperSlide>
					<div className="relative h-56 rounded-lg md:h-96">
						<h1 className="text-4xl text-white font-bold absolute z-10 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
							Carbon Footprint
						</h1>
						<img
							src="/docs/images/carousel/carousel-1.svg"
							className="absolute block w-full h-full object-cover rounded-lg"
							alt="Carbon Footprint 1"
						/>
					</div>
				</SwiperSlide>
				<SwiperSlide>
					<div className="relative h-56 rounded-lg md:h-96">
						<h1 className="text-4xl text-white font-bold absolute z-10 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
							Carbon Footprint2
						</h1>
						<img
							src="/docs/images/carousel/carousel-2.svg"
							className="absolute block w-full h-full object-cover rounded-lg"
							alt="Carbon Footprint 2"
						/>
					</div>
				</SwiperSlide>
				<SwiperSlide>
					<div className="relative h-56 rounded-lg md:h-96">
						<h1 className="text-4xl text-white font-bold absolute z-10 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
							Carbon Footprint3
						</h1>
						<img
							src="/docs/images/carousel/carousel-3.svg"
							className="absolute block w-full h-full object-cover rounded-lg"
							alt="Carbon Footprint 3"
						/>
					</div>
				</SwiperSlide>
				<SwiperSlide>
					<div className="relative h-56 rounded-lg md:h-96">
						<h1 className="text-4xl text-white font-bold absolute z-10 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
							Carbon Footprint4
						</h1>
						<img
							src="/docs/images/carousel/carousel-4.svg"
							className="absolute block w-full h-full object-cover rounded-lg"
							alt="Carbon Footprint 4"
						/>
					</div>
				</SwiperSlide>
				<SwiperSlide>
					<div className="relative h-56 rounded-lg md:h-96">
						<h1 className="text-4xl text-white font-bold absolute z-10 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
							Carbon Footprint5
						</h1>
						<img
							src="/docs/images/carousel/carousel-5.svg"
							className="absolute block w-full h-full object-cover rounded-lg"
							alt="Carbon Footprint 5"
						/>
					</div>
				</SwiperSlide>
			</Swiper>
		</div>
	);
}
