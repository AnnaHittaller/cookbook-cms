import { useContext } from "react";
import "../styles/sidebar.css";
import { IoSearch } from "react-icons/io5";
import { SearchContext } from "../context/SearchContext";
import { useNavigate } from "react-router-dom";

function Sidebar() {
	const { query, setQuery } = useContext(SearchContext);
	const navigate = useNavigate()

	const handleSubmit = (e) => {
		e.preventDefault();
		if (query === "") {
			alert("Please type something");
			return;
		}
		navigate("/results");
	};

	return (
		<aside>
			<form onSubmit={handleSubmit}>
				<input
					type="text"
					placeholder="Search recipes"
					id="search"
					value={query}
					onChange={(e) => setQuery(e.target.value)}
				/>
				<button type="submit">
					<IoSearch />
				</button>
			</form>
		</aside>
	);
}

export default Sidebar;
