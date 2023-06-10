import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import SinglePost from "./components/SinglePost";
import LoginPage from "./pages/LoginPage";
import MyRecipeBookPage from "./pages/MyRecipeBookPage";
import AddRecipePage from "./pages/AddRecipePage";
import ResultsPage from "./pages/ResultsPage";
import CategoryPage from "./pages/CategoryPage";

function AllRoutes() {
	return (
		<Routes>
			<Route exact path="/" element={<HomePage />} />
			<Route path="/my-recipe-book" element={<MyRecipeBookPage />} />
			<Route path="/add-new-recipe" element={<AddRecipePage />} />
			<Route path="/recipe/:slug" element={<SinglePost />} />
			<Route path="/login" element={<LoginPage />} />
			<Route path="/search-results" element={<ResultsPage />} />
			<Route path="/category" element={<CategoryPage />} />
			<Route path="*" />
		</Routes>
	);
}

export default AllRoutes;
