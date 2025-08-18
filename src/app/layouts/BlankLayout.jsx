import React from "react";
import { Outlet } from "react-router";

const BlankLayout = () => {
	return (
		<div className="min-h-screen">
			<Outlet />
		</div>
	);
};

export default BlankLayout;
