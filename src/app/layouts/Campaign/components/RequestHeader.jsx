import React from "react";

const RequestHeader = ({ headerText }) => {
	return (
		<h1 className="text-center text-3xl font-bold mb-8 mt-8">{headerText || "Nouvelle requête"}</h1>
	);
};

export default RequestHeader;
