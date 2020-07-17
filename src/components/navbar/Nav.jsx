import React, { useEffect } from "react";
import "./Nav.css";
import { useState } from "react";

const Nav = () => {
	const [show, handleShow] = useState(false);

	useEffect(() => {
		window.addEventListener("scroll", () => {
			if (window.scrollY > 100) {
				handleShow(true);
			} else handleShow(false);
		});

		return () => {
			window.removeEventListener("scroll");
		};
	}, []);

	return (
		<nav className={`nav ${show && "nav_black"}`}>
			<img
				className="nav__logo"
				src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/1024px-Netflix_2015_logo.svg.png"
				alt="netflix logo"
			/>

			<img
				className="nav__avatar"
				src="https://pbs.twimg.com/profile_images/1240119990411550720/hBEe3tdn_400x400.png"
				alt="netflix logo"
			/>
		</nav>
	);
};

export default Nav;
