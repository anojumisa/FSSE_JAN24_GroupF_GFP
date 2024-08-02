import Button from "@/components/elements/button";

export default function CTA() {
	return (
		<div>
			<section className="overflow-hidden bg-gray-50 sm:grid sm:grid-cols-2">
            <a className="h-56 w-full object-cover sm:h-full rounded-full bg-black/5 ltr:md:rounded-l-none rtl:md:rounded-r-none" />
                <div className="p-8 md:p-12 lg:px-16 lg:py-24">
					<div className="mx-auto max-w-xl text-center ltr:sm:text-left rtl:sm:text-right">
						<h2 className="text-2xl font-bold text-gray-900 md:text-3xl">
							Lorem, ipsum dolor sit amet consectetur adipisicing elit
						</h2>

						<p className="hidden text-gray-500 md:mt-4 md:block">
							Lorem ipsum dolor sit amet, consectetur adipiscing elit. Et,
							egestas tempus tellus etiam sed. Quam a scelerisque amet
							ullamcorper eu enim et fermentum, augue. Aliquet amet volutpat
							quisque ut interdum tincidunt duis.
						</p>

						<div className="mt-4 md:mt-8 ">
							<Button name={"Taste it"} />
						</div>
					</div>
				</div>

				
			</section>
		</div>
	);
}
