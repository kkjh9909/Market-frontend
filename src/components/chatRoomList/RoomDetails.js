
export const RoomDetails = ({details}) => {
	return (
		<div className="row">
			<div className="col-auto align-middle">
				<div className="align-items-center">
					<img
						src={`${details.other_profile}`}
						className="align-self-center"
						style={{ width: '50px', height: '50px', objectFit: 'cover' }}
					/>
				</div>
			</div>
			<div className="col">
				<div className="row">
					<div className="col-auto">
						<p>{details.other_nickname}</p>
					</div>
					<div className="col-auto">
						<p>{details.other_address}</p>
					</div>
				</div>
				<div className="text-start">
					<p>{details.last_message}</p>
				</div>
			</div>
		</div>
	)
}