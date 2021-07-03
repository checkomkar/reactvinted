import React, { useState } from "react";
import "./imageCard.scss";
function ImageCard(props:any) {	
	const { farm, id, secret, server, title, owner, favorite } = props.item;
    const [isFavorite, setIsFavorite] = useState(favorite);
    const truncate = (input:string) => input.length > 20 ? `${input.substring(0, 20)}...` : input;
	return (
		<div className="grid-item image-card" data-testid="imageCard">
            <img
                loading="lazy"
                data-testid="image"
				src={`https://farm${farm}.staticflickr.com/${server}/${id}_${secret}.jpg`}
				alt={title}
			/>
			<div className="overlay">
				<span data-testid="title" className="title" title={title}>{truncate(title)}</span>
				<span className="line"></span>
				<span data-testid="owner" className="owner">{owner}</span>
                <button
                    data-testid="favoriteButton"
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
