interface DividerSectionShortProps {
	lineOne: string
	lineTwo: string
	lineThree: string
}

export default function DividerSectionShort({lineOne, lineTwo, lineThree}: DividerSectionShortProps) {
    return (
        <div className="bg-amber-500 py-10 ">
				<div className="max-w-screen-lg mx-auto flex flex-col justify-between items-center">
					<div className="max-w-xl">
						<h2 className="font-black text-green-900 text-3xl mb-4 text-center">
                        {lineOne} 
						</h2>
						
					</div>
					
				</div>
			</div>
    )
}