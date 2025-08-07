import React, { useEffect } from "react";
import { useLocation } from "react-router";

const PreviewPage = () => {
	const location = useLocation();
	useEffect(() => {
		console.log(location);
	}, [location]);

	return <div>Hello</div>;
};

export default PreviewPage;
