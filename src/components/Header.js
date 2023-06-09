import { NavLink, useNavigate } from "react-router-dom";
import "../styles/header.css";
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import logo from '../assets/cooking-light-logo.png'
import { SearchContext } from "../context/SearchContext";

function Header() {
	const { login, isLoggedIn, logout } = useContext(AuthContext);
	const navigate = useNavigate()
	const { query, setQuery } = useContext(SearchContext);

	const backHome = () => {
		navigate("/")
		setQuery("")
		console.log("backhome", query)
	}

	return (
		<header>
			<div className="nav-wrapper">
				<div className="logo" onClick={backHome}>
					<img src={logo} alt="logo" />
					Cooking Light
				</div>
				<nav>
					<NavLink to="/">
						<h3 onClick={backHome}>Home</h3>
					</NavLink>
					{isLoggedIn && (
						<>
							<NavLink to="/my-recipe-book">
								<h3>My recipe book</h3>
							</NavLink>
							<NavLink to="/add-new-recipe">
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
