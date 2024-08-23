interface GreenMovement_leftProps {
	title: string;
	description: string;
	movement: string;
	image: string;
	checklist_one: string;
	checklist_two: string;
	checklist_three: string;
	checklist_four: string;
}

export default function GreenMovement_left({
	title,
	description,
	movement,
	image,
	checklist_one,
	checklist_two,
	checklist_three,
	checklist_four,
}: GreenMovement_leftProps) {
	return (
		<div className="py-4 relative overflow-hidden bg-white ">
			<div className="grid grid-cols-2 max-w-screen-lg mx-auto">
				<div className="py-20 bg-amber-400 relative before:absolute before:h-full before:w-screen before:bg-amber-400 before:top-0 before:right-0">
					<div className="relative z-20 pl-12 ">
						<h2 className="text-blue-950 font-black text-5xl leading-snug mb-10">
							{title}
						</h2>
						<p className="text-sky-950 text-lg">{description}</p>

						<div className="flex items-start gap-4">
							<span className="w-5 rounded-lg bg-green-800 mt-2">
								<img src="checkmark.svg" alt="" />
							</span>
							<div>
								<h2 className="text-sky-950 text-lg">{checklist_one}</h2>
							</div>
						</div>
						<div className="flex items-start gap-4">
							<span className="w-5 rounded-lg bg-green-800 mt-2">
								<img src="checkmark.svg" alt="" />
							</span>
							<div>
								<h2 className="text-sky-950 text-lg">{checklist_two}</h2>
							</div>
						</div>
						<div className="flex items-start gap-4">
							<span className="w-5 rounded-lg bg-green-800 mt-2">
								<img src="checkmark.svg" alt="" />
							</span>
							<div>
								<h2 className="text-sky-950 text-lg">{checklist_three}</h2>
							</div>
						</div>
						<div className="flex items-start gap-4">
							<span className="w-5 rounded-lg bg-green-800 mt-2">
								<img src="checkmark.svg" alt="" />
							</span>
							<div>
								<h2 className="text-sky-950 text-lg">{checklist_four}</h2>
							</div>
						</div>
					</div>
				</div>
				<div className="w-full flex flex-col pl-16">
					<h2 className="text-[#64618C] font-bold text-2xl max-w-xs text-left mb-12 mt-10">
						{movement}
					</h2>

					<div className="h-full mt-auto overflow-hidden relative">
						<img src={image} className="h-full w-full object-contain" alt="" />
					</div>
				</div>
			</div>
		</div>
	);
}
