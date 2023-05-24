import { NavLink } from "react-router-dom";
import '../styles/header.css'

function Header() {
    return (
			<header>
                <div className="nav-wrapper">
				<div className="logo">Cooking Light</div>
				<nav>
					<NavLink to="/">
						<h3>Home</h3>
					</NavLink>
					<NavLink to="">
						<h3>My recipe book</h3>
					</NavLink>
					<NavLink to="">
						<h3>Add new recipe</h3>
					</NavLink>
					<NavLink to=""><button>Login</button></NavLink>
				</nav>

                </div>
			</header>
		);
}

export default Header;