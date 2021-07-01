import React, { useState } from "react";
import "./imageCard.scss";
function ImageCard(props) {
	//console.log(props);
	const { farm, id, secret, server, title, owner, favorite } = props.item;
	const [isFavorite, setIsFavorite] = useState(favorite);
	return (
		<div className="grid-item image-card">
			<img
				src={`https://farm${farm}.staticflickr.com/${server}/${id}_${secret}.jpg"`}
				alt={title}
			/>
			<div className="overlay">
				<span className="title">{title}</span>
				<span className="line"></span>
				<span className="owner">{owner}</span>
				<button
					onClick={() => {
						setIsFavorite(!isFavorite);
						props.favAnImage(id);
					}}
					className={
						isFavorite ? "favorite-button white" : "favorite-button"
					}
				>
					Favorite
				</button>
			</div>
		</div>
	);
}

export default ImageCard;
