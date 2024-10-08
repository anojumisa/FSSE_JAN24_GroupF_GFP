import Link from "next/link";

export default function Navbar() {
	return (
		<nav className=" fixed w-full z-20 top-0 start-0 ">
			<div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
				<Link href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
					<img
						src="/localbites_logo.png"
						className="h-8"
						alt="LocalBites Logo"
					/>
					<span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
						LocalBites
					</span>
				</Link>
				
			</div>
		</nav>
	);
}
