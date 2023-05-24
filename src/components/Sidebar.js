import "../styles/sidebar.css";
import { IoSearch } from "react-icons/io5";

function Sidebar() {
	return (
		<aside>
			<form>
				<input type="text" placeholder="Search recipes" id="search" />
				<button type="submit">
					<IoSearch />
				</button>
			</form>
		</aside>
	);
}

export default Sidebar;
