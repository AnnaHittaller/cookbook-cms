import MainLayout from "./MainLayout";
import '../styles/singlePost.css'
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import client from "../utils/Contentful";
import { useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import MoonLoader from "react-spinners/MoonLoader";
import { AuthContext } from "../context/AuthContext";

function SinglePost() {

	const {slug} = useParams()
	const [post, setPost] = useState([])
	const [liked, setLiked] = useState(false);
	const [isloading, setIsLoading] = useState(true)
	const {isLoggedIn} = useContext(AuthContext)

	const handleLike = () => {
			// Toggle the liked state
			//setLiked(!liked);

			// Add/remove the post from local storage
			if (!liked) {
				//setLiked(true)
				addToLikedPosts(post);
			} else {
				//setLiked(false)
				removeFromLikedPosts(post);
			}
		};
	
	
  const addToLikedPosts = (post) => {
		// Retrieve the existing liked posts from local storage
		const likedPosts = JSON.parse(localStorage.getItem("likedPosts")) || [];
setLiked(true);
		// Add the new post to the liked posts array
		likedPosts.push(post);

		// Save the updated liked posts array to local storage
		localStorage.setItem("likedPosts", JSON.stringify(likedPosts));
		//console.log("add",liked);
	};

	const removeFromLikedPosts = (post) => {
		// Retrieve the existing liked posts from local storage
		const likedPosts = JSON.parse(localStorage.getItem("likedPosts")) || [];
		setLiked(false);
		//console.log("post in remove",post);
		// Remove the post from the liked posts array
		const updatedLikedPosts = likedPosts.filter(
			(likedPost) => likedPost.sys.id !== post.sys.id
		);

		// Save the updated liked posts array to local storage
		localStorage.setItem("likedPosts", JSON.stringify(updatedLikedPosts));
		//console.log("remove",liked)
	};

	


	useEffect(() => {
		const fetchSinglePost = async () => {
			try {
				const response = await client.getEntries({
					content_type: "recipeCard",
					'fields.slug': slug,
					limit: 1,
				});
				if (response.items.length > 0) {
					setPost(response.items[0]);
					setIsLoading(false)
				}
			} catch (error) {
				console.log(error.message);
			}
		};
		fetchSinglePost();
	}, [slug]);

	//console.log("single post id", post.sys.id);

	  useEffect(() => {
			// Check if the post is present in the liked posts stored in local storage
			const likedPosts = JSON.parse(localStorage.getItem("likedPosts")) || [];
			const isLiked = likedPosts.some(
				(likedPost) => likedPost?.sys?.id === post?.sys?.id
			);
			setLiked(isLiked);
		}, [post]);

	 const finalSteps = post?.fields?.prep1
			.split(/\d+\.\s/)
			.filter((step) => step.trim() !== "")
			.map((step, idx) => {
			
				return <li key={idx}>{step.trim()}</li>;
			});


	return (
		<MainLayout>
			<div className="page single-post">
				{!isloading ? (
					<>
						<img
							src={post?.fields?.recipeImage?.fields?.file?.url}
							alt="recipe image"
							className="recipe-img"
						/>
						<h1>{post?.fields?.recipeTitle}</h1>
						<div className="meta-data">
							<span>Category: {post?.fields?.category}</span>
							<span>Date: {post?.fields?.date}</span>
							{isLoggedIn && (

							<span>
								Add to recipe book:{" "}
								<button onClick={handleLike}>
									{liked ? (
										<AiFillHeart className="like-icon" />
									) : (
										<AiOutlineHeart className="like-icon" />
									)}
								</button>
							</span>
							)}
						</div>
						<p>{post?.fields?.summary}</p>
						<h2>Ingredients</h2>
						<ul>
							{post?.fields?.ingredients?.map((ingredient, idx) => (
								<li key={idx}>{ingredient}</li>
							))}
						</ul>
						<h2>Preparation</h2>
						<ol>{finalSteps}</ol>
					</>
				) : (
					<MoonLoader
					color="#008080"
					cssOverride={{margin: "45vh auto"}}
					loadingsize={50}
					/>
				)}
			</div>
		</MainLayout>
	);
}

export default SinglePost;
