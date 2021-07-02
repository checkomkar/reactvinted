import React, { useState, useEffect } from "react";
import { APIKeys } from "../constant";
import { Req } from "../interfaces";
import ImageCard from "./imageCard";
import "./imageLoader.scss";
import Loader from "./loader";

interface Images{
    farm:number,
    id: number,
    secret: string,
    server: string,
    title: string,
    owner: string,
    favorite?: boolean
}

const ImageLoader = () => {
	const [images, setImages] = useState<Images[]>([]);
	const [pages, setPages] = useState(1);
	const [currentPage, setCurrentPage] = useState(1);
	const [loading, setLoading] = useState(false);
	const [isFetchingMore, setIsFetchingMore] = useState(false);

	useEffect(() => {
		if (localStorage.getItem("images") !== null) {
            setImages(JSON.parse(localStorage.getItem("images") || ""));
			setCurrentPage(JSON.parse(localStorage.getItem("currentPage") || ""));
		} else {
			loadImages({ page: currentPage });
		}
	}, []);

	useEffect(() => {
		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	useEffect(() => {
		if (isFetchingMore === false) return;
		loadImages({ page: currentPage });
	}, [isFetchingMore]);

	const handleScroll = () => {
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
		tempImages.forEach((item:any) => {
			if (item.id === id) {
				item.favorite = !item.favorite;
			}
		});
		setImages(tempImages);
		localStorage.setItem("images", JSON.stringify(tempImages));
	};

	const loadImages = (req:any) => {
		setLoading(true);

		const url = `https://www.flickr.com/services/rest/?method=flickr.photos.getRecent&api_key=${APIKeys.KEY}&per_page=20&page=${req.page}&format=json&nojsoncallback=1`;

		//Fetch was not working due to CORS issue
		//Its better to use a library like Axios, as the code will look clean
        fetch(url).then((data:any) => {
            console.log("from fetch", data.body)
        })
		let xhttp = new XMLHttpRequest();
		xhttp.open("GET", url, true);
		xhttp.send();
		xhttp.onreadystatechange = function () {
			if (this.readyState === 4 && this.status === 200) {
                let response = JSON.parse(xhttp.responseText);
                if (response.stat === 'fail') return;
				if (currentPage >= response.photos.pages) return;
				setPages(response.photos.pages);
				setIsFetchingMore(false);
				let currentResponse = response.photos.photo;
				currentResponse.forEach((element:any) => {
					element["favorite"] = false;
					console.log("ele", element);
				});
				if (images.length === 0) {
					setImages(currentResponse);
				} else {
					// let currentResponse = response.photos.photo;
					// currentResponse.forEach((element) => {
					// 	element["favorite"] = false;
					// 	console.log("ele", element);
					// });
					setImages([...images, ...currentResponse]);
					localStorage.setItem("images", JSON.stringify(images));
				}

				// console.log("pages, images", pages, images);
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
				Fetch
			</button> */}
		</>
	);
};

export default ImageLoader;
