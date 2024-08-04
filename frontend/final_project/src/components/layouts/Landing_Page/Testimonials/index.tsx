export default function Testimonials() {
    return (
        <div className="w-full h-screen flex flex-col items-center justify-center gap-8">
			<h1 className="text-4xl text-gray-500 leading-relaxed text-center w-1/2">What our customers say about us</h1>
            <h1 className="text-4xl text-gray-600 leading-relaxed text-center w-4/5">
				"Lorem Ipsum is simply dummy text of the printing and typesetting
				industry. Lorem Ipsum has been the industry's standard dummy text ever
				since the 1500s"
			</h1>
			<div className="flex items-center gap-4">
				<div className="rounded-full w-12 h-12 bg-black overflow-hidden">
					<img src="" />
				</div>
				<div className="flex flex-col tracking-wider">
					<label className="text-gray-600 font-bold text-base">
						Reviewer Name
					</label>
					<label className="text-gray-400 font-normal text-sm">
						Origin
					</label>
				</div>
			</div>
		</div>
    )
}