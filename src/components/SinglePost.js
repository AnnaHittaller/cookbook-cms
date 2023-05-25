import MainLayout from "./MainLayout";
import '../styles/singlePost.css'
import sampleImg from '../assets/Sesame_Lemon_Chicken.jpg'
import { AiOutlineHeart } from "react-icons/ai";

function SinglePost() {
	return (
		<MainLayout>
			<div className="page single-post">
				<img src={sampleImg} alt="" className="recipe-img" />
				<h1>This is the recipe title</h1>
				<div className="meta-data">
					<span>Category: Breakfast</span>
					<span>Date: 2023. 05. 23.</span>
					<span>
						Add to recipe book: <AiOutlineHeart className="like-icon" />
					</span>
				</div>
				<p>This will be the recipe summary.</p>
				<h2>Ingredients</h2>
				<ul>
					<li>item</li>
					<li>item</li>
					<li>item</li>
					<li>item</li>
				</ul>
				<h2>Preparation</h2>
				<ol>
					<li>item</li>
					<li>item</li>
					<li>item</li>
					<li>item</li>
				</ol>
			</div>
		</MainLayout>
	);
}

export default SinglePost;
