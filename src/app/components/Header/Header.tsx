interface IHeader {
	handleDownloadClick: () => void
}

export const Header = ( { handleDownloadClick }: IHeader ) => {
	return (
		<div className="border-b-2 border-b-blue-300 mb-2">
			<div className="flex justify-between my-3 mx-12">
				<h1 className="py-2">Calendar</h1>
				<button
					onClick={handleDownloadClick}
					className="py-2 bg-blue-500 rounded-xl px-2 text-white hover:bg-blue-900"
				>
					Download Event Json
				</button>
			</div>


		</div>
	)
}