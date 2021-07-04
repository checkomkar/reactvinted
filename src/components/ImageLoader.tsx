import React, { useState, useEffect } from "react";
import { APIKeys } from "../constant";
import ImageCard from "./imageCard";
import "./imageLoader.scss";
import Loader from "./loader";
import { iImages } from "../interfaces";


const ImageLoader = () => {
	const [images, setImages] = useState<iImages[]>([]);	
	const [currentPage, setCurrentPage] = useState(1);
	const [loading, setLoading] = useState(false);
	const [isFetchingMore, setIsFetchingMore] = useState(false);

    useEffect(() => {
        //See if images already present in local storage or else call API
		if (localStorage.getItem("images") !== null) {
            setImages(JSON.parse(localStorage.getItem("images") || ""));
			setCurrentPage(JSON.parse(localStorage.getItem("currentPage") || ""));
		} else {
			loadImages({ page: currentPage });
		}
	}, []);

    useEffect(() => {
        //Listen for Scroll events
		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	useEffect(() => {
		if (isFetchingMore === false) return;
		loadImages({ page: currentPage });
	}, [isFetchingMore]);

    const handleScroll = () => {
        //fetch more images scroll hits the bottom
		if (
			window.innerHeight + document.documentElement.scrollTop !==
				document.documentElement.offsetHeight ||
			loading
		)
			return;

		setIsFetchingMore(true);
	};

	const favAnImage = (id:any) => {
		const tempImages = [...images];
		tempImages.forEach((item:iImages) => {
			if (item.id === id) {
				item.favorite = !item.favorite;
			}
		});
        setImages(tempImages);
        // Favorites are not lost on page reload, we can use local storage
        // It is better handle this through an API call so that all the favorite items are stored in database
		localStorage.setItem("images", JSON.stringify(tempImages));
	};

    const loadImages = (req: any) => {
        //Call flickr API and keep appending in images array
		setLoading(true);

		const url = `https://www.flickr.com/services/rest/?method=flickr.photos.getRecent&api_key=${APIKeys.KEY}&per_page=20&page=${req.page}&format=json&nojsoncallback=1`;

		//We can also use Fetch or Axios
		//Its better to use a library like Axios, as the code will look clean
        // fetch(url).then((data:any) => {
        //     console.log("from fetch", data.body)
        // })

		let xhttp = new XMLHttpRequest();
		xhttp.open("GET", url, true);
		xhttp.send();
		xhttp.onreadystatechange = function () {
			if (this.readyState === 4 && this.status === 200) {
                let response = JSON.parse(xhttp.responseText);
                if (response.stat === 'fail') return;
				if (currentPage >= response.photos.pages) return;
				
				setIsFetchingMore(false);
				let currentResponse = response.photos.photo;
				currentResponse.forEach((element:any) => {
					element["favorite"] = false;
					//console.log("ele", element);
				});
				if (images.length === 0) {
					setImages(currentResponse);
				} else {
					//Avoid duplicate entries
                    const imageIds = new Set(images.map(({ id }) => id));
					setImages([...images, ...currentResponse.filter(({id}:any)=> !imageIds.has(id))]);
					localStorage.setItem("images", JSON.stringify(images));
				}

				
				if (currentPage < response.photos.pages) {
					setCurrentPage(currentPage + 1);
					localStorage.setItem("currentPage", JSON.stringify(currentPage));
				}
				setLoading(false);
			}
			if (this.readyState === 3) setLoading(true);
			setLoading(false);
		};
	};
	return (
		<>
			<div className="grid-container">
				{images &&
					images.map((item:any) => {
						return (
							<ImageCard
								key={item.id}
								item={item}
								favAnImage={favAnImage}
							/>
						);
					})}
			</div>
			<Loader loading={loading} />
			{/* If we want to load images by button click */}
			{/* <button
				className="button"
				onClick={() => loadImages({ page: currentPage })}
			>
				Fetch More
			</button> */}
		</>
	);
};

export default ImageLoader;
