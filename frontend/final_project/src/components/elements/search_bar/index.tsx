interface SearchBarProps {
    search: string;
}
export default function SearchBar({search}: SearchBarProps) {
	return (
		<form className="max-w-lg mx-auto">
			<div className="flex">
				
				<div className="relative w-full">
					<input
						type="search"
						id="search-dropdown"
						className="block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-e-lg border-s-gray-50 border-s-2 border border-gray-300 focus:ring-green-500 focus:border-green-500 dark:bg-gray-900 dark:border-s-gray-700  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-green-500 rounded-lg"
						placeholder={search}
						required
					/>
					<button
						type="submit"
						className="absolute top-0 end-0 p-2.5 text-sm font-medium h-full text-white bg-green-700 rounded-e-lg border border-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
					>
						<svg
							className="w-4 h-4"
							aria-hidden="true"
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 20 20"
						>
							<path
								stroke="currentColor"
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
							/>
						</svg>
						<span className="sr-only">Search</span>
					</button>
				</div>
			</div>
		</form>
	);
}
