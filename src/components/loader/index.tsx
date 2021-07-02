import React from "react";
import loader from "./loader.gif";
function Loader(props:any) {
	console.log(props);
	return <div>{props.loading && <img width="40" src={loader} alt="" />}</div>;
}

export default Loader;
