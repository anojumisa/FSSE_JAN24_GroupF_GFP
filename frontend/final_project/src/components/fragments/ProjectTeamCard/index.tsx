interface ProjectTeamCardProps {
    title: string;
    name: string;
  }
export default function ProjectTeamCard({title, name}: ProjectTeamCardProps) {
	return (
		<div className="relative grid h-[30rem] w-full max-w-[20rem] flex-col items-end justify-center overflow-hidden rounded-xl bg-white bg-clip-border text-center text-gray-700">
			<div className="absolute inset-0 m-0 h-full w-full overflow-hidden rounded-none bg-transparent bg-[url('https://images.unsplash.com/photo-1552960562-daf630e9278b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80')] bg-cover bg-clip-border bg-center text-gray-700 shadow-none">
				<div className="absolute inset-0 w-full h-full to-bg-black-10 bg-gradient-to-t from-black/80 via-black/50"></div>
			</div>
			<div className="relative p-6 px-6 py-1 md:px-12">
				<h2 className="mb-1 block font-sans text-2xl font-medium leading-[1.5] tracking-normal text-white antialiased">
					{title}
				</h2>
				<h5 className="block mb-1 font-sans text-xl antialiased font-semibold leading-snug tracking-normal text-gray-400">
					{name}
				</h5>
                <h5 className="block mb- font-sans text-xl antialiased font-semibold leading-snug tracking-normal text-gray-400">
					Read more 
				</h5>
			</div>
		</div>
	);
}
