import MainLayout from "../components/MainLayout";
import FeaturedRecipe from "../components/FeaturedRecipe";
import "../styles/homePage.css";
import BlogPostList from "../components/BlogPostList";
import client from "../utils/Contentful";
import { useEffect, useState } from "react";

function HomePage() {
	const [posts, setPosts] = useState([]);

	useEffect(() => {
		const fetchPosts = async () => {
			try {
				const response = await client.getEntries({
					content_type: "recipeCard",
				});
				console.log(response);
				setPosts(response.items);
				// if (response.ok) {
				// 	setPosts(response);
				// 	console.log("posts", posts);
				// }
			} catch (error) {
				console.log(error.message);
			}

		};
		fetchPosts();

	}, []);

	console.log("rerender");
	// console.log(posts[0].fields.recipeImage.fields)




	return (
		<MainLayout>
			<div className="page">
				<FeaturedRecipe />
				<h1>Top recipes</h1>
				<BlogPostList posts={posts} />
			</div>
		</MainLayout>
	);
}

export default HomePage;
