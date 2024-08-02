interface ButtonProps {
    name: string;
}

export default function Button({name}: ButtonProps) {
	return (
		<div className="flex flex-col items-center">
			<a
				className=" w-1/3 group flex items-center justify-between gap-4 rounded-lg border border-current px-5 py-3 text-yellow-600 transition-colors hover:bg-yellow-700 focus:outline-none focus:ring active:bg-yellow-500"
				href="#"
			>
				<span className="font-medium transition-colors group-hover:text-white">
					{" "}
                    {name}{" "}
				</span>

				<span className="shrink-0 rounded-full border border-yellow-600 bg-white p-2 group-active:border-yellow-500">
					<svg
						className="size-5 rtl:rotate-180"
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M17 8l4 4m0 0l-4 4m4-4H3"
						/>
					</svg>
				</span>
			</a>
		</div>
	);
}
