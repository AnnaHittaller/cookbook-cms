
import BlogPostList from "../components/BlogPostList";
import MainLayout from "../components/MainLayout";
import "../styles/myRecipeBookPage.css";

function MyRecipeBookPage() {
	const likedPosts = JSON.parse(localStorage.getItem("likedPosts")) || [];
	return (
		<MainLayout>
			<div className="page">
				<h1>My recipe book</h1>
				<div className="my-recipes">

				{likedPosts.length === 0 ? (<p>Add some recipes by liking them!</p>) : (<BlogPostList posts={likedPosts}/>)}
				</div>
				{/* <BlogPostList posts={likedPosts}/> */}
			</div>
		</MainLayout>
	);
}

export default MyRecipeBookPage;
