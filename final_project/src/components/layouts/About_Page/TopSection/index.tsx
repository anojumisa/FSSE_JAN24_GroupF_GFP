export default function TopSection() {
    return (
        <div className="w-screen h-screen overflow-hidden relative before:block before:absolute before:bg-black before:h-full before:w-full before:top-0 before:left-0 before:z-10 before:opacity-70">
				<img
					src="/about/top_view_nature.jpg"
					className="absolute top-0 left-0 min-h-full ob"
					alt=""
				/>
				<div className="relative z-20 max-w-screen-lg mx-auto grid grid-cols-12 h-full items-center ">
					<div className="col-span-12 shadow-2xl p-12">
						<span className="uppercase text-white text-xs font-bold mb-2 block">
							About the Project
						</span>
						<h1 className="text-white font-extrabold text-5xl mb-8">
							LocalBites
						</h1>
						<p className="text-stone-100 text-lg">
							Once upon a time, in a world craving authentic experiences, a
							traveler's heart yearned for more than just postcard memories.
							They sought to capture the essence of a place, not just in
							photographs, but in flavor. And so, LocalBites was born - a
							digital marketplace where the soul of a destination is packaged
							with care.
						</p>
						<p className="text-stone-100 text-lg">
							Imagine strolling through a bustling market, the aroma of freshly
							baked bread mingling with the spicy scent of local curry. That's
							the experience LocalBites brings to your doorstep. We are more
							than just an online store; we are a passport to culinary
							adventures.
						</p>
						<p className="text-stone-100 text-lg">
							Our mission is simple: to connect food lovers with passionate
							artisans who craft delicacies with love and local ingredients.
							From the sun-kissed olive oils of the Mediterranean to the fiery
							chili pastes of Southeast Asia, we curate a collection of tastes
							that transport you back to your travels.
						</p>
						<p className="text-stone-100 text-lg">
							But LocalBites is not just about indulging your palate. We are
							committed to preserving the planet for future generations. That's
							why we've built a sustainable ecosystem around our business. Our
							delivery fleet consists of eco-friendly bicycles, reducing carbon
							emissions and supporting local communities. Our packaging is
							meticulously chosen to be recyclable, minimizing waste.
						</p>
						<p className="text-stone-100 text-lg">
							By choosing LocalBites, you're not just satisfying your cravings;
							you're also contributing to a greener planet. Every purchase
							brings you closer to the heart of a community and supports
							sustainable practices.
						</p>
						
					</div>
				</div>
			</div>
    )
}