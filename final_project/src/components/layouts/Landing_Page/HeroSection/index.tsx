import SearchBar from "@/components/elements/search_bar";

export default function HeroSection() {
	return (
		<div>
			<section className="bg-[#fdd63e] dark:bg-black-900 min-h-screen flex items-center">
				<div className="grid max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
					<div className="mr-auto place-self-center lg:col-span-7">
						<h1 className="max-w-2xl mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl dark:text-black">
							LocalBites
						</h1>
						<p className="max-w-2xl mb-6 font-light text-slate-950 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-700">
							Savor the Flavor, Sustain the Planet
						</p>
						<a
							href="/products"
							className="inline-flex items-center justify-center py-3 mr-3 text-base font-medium text-center text-black rounded-lg bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:focus:ring-primary-900"
						>
							Find your delicacies
							<img src="/arrow.png" alt="" className="w-6 h-6 ml-2" />
						</a>
						<SearchBar search={"search your food here..."} />
					</div>
					<div className="hidden lg:mt-0 lg:col-span-5 lg:flex">
						<img src="/hero.png" alt="mockup" />
					</div>
				</div>
			</section>
		</div>
	);
}
