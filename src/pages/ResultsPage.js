import MainLayout from "../components/MainLayout";
import "../styles/resultsPage.css";
import { SearchContext } from "../context/SearchContext";

function ResultsPage() {
	const { query } = useContext(SearchContext);
	return (
		<MainLayout>
			<div className="page">
				<h1>Results for: {query}</h1>
			</div>
		</MainLayout>
	);
}

export default ResultsPage;
