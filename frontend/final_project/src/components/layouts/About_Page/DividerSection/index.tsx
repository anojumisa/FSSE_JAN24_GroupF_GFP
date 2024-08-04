interface DividerSectionProps {
	lineOne: string
	lineTwo: string
	lineThree: string
}

export default function DividerSection({lineOne, lineTwo, lineThree}: DividerSectionProps) {
    return (
        <div className="bg-amber-500 py-20">
				<div className="max-w-screen-lg mx-auto flex justify-between items-center">
					<div className="max-w-xl">
						<h2 className="font-black text-green-900 text-3xl mb-4">
                        {lineOne} <br /><span className="text-blue-950 underline text-4xl">{lineTwo}</span> <br />{lineThree}
						</h2>
						
					</div>
					
				</div>
			</div>
    )
}