import MainLayout from "../components/MainLayout";
import "../styles/resultsPage.css";
import { SearchContext } from "../context/SearchContext";
import { useContext, useState, useEffect } from "react";
import client from "../utils/Contentful";
import { Link } from "react-router-dom";
import "../styles/recipeCard.css";
import { AiOutlineClockCircle } from "react-icons/ai";


function ResultsPage() {
	const { query, setQuery } = useContext(SearchContext);
	const [posts, setPosts] = useState([]);
	//console.log(query, '*********')

	useEffect(() => {
		const fetchPosts = async () => {
			try {
				const response = await client.getEntries({
					content_type: "recipeCard",
				});

				//console.log(query, response.items[0]);

				// 	console.log("posts",posts);

				// if (window.location.pathname === "/category") {
				// const filteredPosts = response.items.filter(
				// 	(item) => {
				// 		const { category } = item.fields;
				// 		const lowerCaseQuery = query.toLowerCase();

				// 		return category.toLowerCase() === lowerCaseQuery;
				// 	}
				// );
				// setPosts(filteredPosts);

				// } else {

					const filteredPosts = response.items.filter(
						(item) => {
							const { recipeTitle, summary, prep1 } = item.fields;
							const lowerCaseQuery = query.toLowerCase();
	
							return (
								recipeTitle?.toLowerCase().includes(lowerCaseQuery) ||
								summary?.toLowerCase().includes(lowerCaseQuery) ||
								prep1?.toLowerCase().includes(lowerCaseQuery)
							);
						}
					);
					setPosts(filteredPosts);
				//}


				//console.log("filtered",filteredPosts)
			} catch (error) {
				console.log(error.message);
			}
		};
		fetchPosts();
	}, [query]);
	
	//setQuery("")
	return (
		<MainLayout>
			<div className="page">
				<h1>Results for: {query}</h1>
				<div className="cards">
					{posts && posts.length > 0 ? (
						posts.map((item, index) => (
							<Link
								to={`/recipe/${item.fields.slug}`}
								className="card"
								key={index}>
								<div className="card-hover">
									<div className="card-top">
										<img src={item?.fields?.recipeImage?.fields?.file?.url} />
										<p className="card-category">{item.fields.category}</p>
									</div>
									<div className="card-bottom">
										<h2>{item.fields.recipeTitle}</h2>
										<p className="card-time">
											<AiOutlineClockCircle />
											{item.fields.cookingTime} min
										</p>
									</div>
								</div>
								<div className="card-separator">
									<hr />
								</div>
							</Link>
						))
					) : (
						<p>There are no matching recipes</p>
					)}
				</div>
			</div>
		</MainLayout>
	);
}

export default ResultsPage;
