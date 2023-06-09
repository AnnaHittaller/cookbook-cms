import MainLayout from "../components/MainLayout";
import "../styles/categoryPage.css";
import { SearchContext } from "../context/SearchContext";
import { useContext, useState, useEffect } from "react";
import client from "../utils/Contentful";
import "../styles/recipeCard.css";
import { AiOutlineClockCircle } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";

function CategoryPage() {
	const { query, setQuery, category } = useContext(SearchContext);
	const [posts, setPosts] = useState([]);
    const navigate = useNavigate();

	useEffect(() => {
		const fetchPosts = async () => {
			try {
				const response = await client.getEntries({
					content_type: "recipeCard",
					"fields.category": category,
					limit: 20,
				});

				setPosts(response.items);
			} catch (error) {
                console.log(error.message);
			}
		};
		fetchPosts();
        setQuery("")
    
	}, [category]);



	return (
		<MainLayout>
			<div className="page">
				<h1>
					Recipes in the <span>{category} </span>category
				</h1>
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
						<p>There are no recipes in this category</p>
					)}
				</div>
			</div>
		</MainLayout>
	);
}

export default CategoryPage;
