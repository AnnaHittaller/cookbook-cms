import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import SinglePost from "./components/SinglePost";

function AllRoutes() {
	return (
		<Routes>
			<Route exact path="/" element={<HomePage />} />
			<Route path="/my-recipe-book" />
			<Route path="/add-new-recipe" />
			<Route path="/recipe/:id" element={<SinglePost />} />
			<Route path="/login" />
			<Route path="/search-results" />
			<Route path="*" />
		</Routes>
	);
}

export default AllRoutes;
