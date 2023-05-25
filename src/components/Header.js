import { NavLink } from "react-router-dom";
import "../styles/header.css";
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";

function Header() {
	const { login, isLoggedIn, logout } = useContext(AuthContext);
	return (
		<header>
			<div className="nav-wrapper">
				<div className="logo">Cooking Light</div>
				<nav>
					<NavLink to="/">
						<h3>Home</h3>
					</NavLink>
					{isLoggedIn && (
						<>
							<NavLink to="">
								<h3>My recipe book</h3>
							</NavLink>
							<NavLink to="">
								<h3>Add new recipe</h3>
							</NavLink>
						</>
					)}
					{isLoggedIn ? (
						<NavLink to="/">
							<button onClick={logout}>Logout</button>
						</NavLink>
					) : (
						<NavLink to="/login">
							<button>Login</button>
						</NavLink>
					)}
				</nav>
			</div>
		</header>
	);
}

export default Header;
