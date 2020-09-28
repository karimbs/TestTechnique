import React from "react";
import Navbar from "../components/Navbar";

export default function VerticalLayout(props) {
	return (
		<div>
			<Navbar />
			<main className="p-2">{props.children}</main>
		</div>
	);
}
