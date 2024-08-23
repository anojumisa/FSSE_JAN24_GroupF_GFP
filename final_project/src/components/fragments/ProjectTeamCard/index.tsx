interface ProjectTeamCardProps {
	title: string;
	name: string;
	image: string;
}
export default function ProjectTeamCard({
	title,
	name,
	image,
}: ProjectTeamCardProps) {
	return (
		<div className="relative grid h-[40rem] w-full max-w-[31rem] flex-col items-start justify-center overflow-hidden rounded-xl bg-gray-100 bg-clip-border text-center text-gray-700 drop-shadow-2xl">
			<div className="flex flex-col">
				<div className="relative flex-1 m-0 h-full w-full overflow-hidden rounded-none bg-transparent bg-[url('')] bg-cover bg-clip-border bg-center text-gray-700 shadow-none">
					<img src={image} alt="" />
					<div className="absolute inset-0 w-full h-full to-bg-black-10"></div>
				</div>
				<div className="relative flex-1 z-10 p-6 px-8 py-1 md:px-12  text-center text-slate-50 mt-2">
					<h2 className="mb-1 block font-sans text-3xl leading-[1.5] tracking-normal text-amber-400 font-black">
						{name}
					</h2>
					<h5 className="block mb-1 font-sans text-xl antialiased font-semibold leading-snug tracking-normal text-black">
						{title}
					</h5>
					<h5 className="block mb-1 font-sans text-xl antialiased font-semibold leading-snug tracking-normal text-gray-600 underline italic">
						<a
							href={`/about/#${name.toLowerCase().replace(/\s+/g, '')}`}
							className="hover:text-amber-800 transition duration-300 ease-in-out"
						>
							Read more
						</a>
					</h5>
				</div>
			</div>
		</div>
	);
}
