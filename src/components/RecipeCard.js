import "../styles/recipeCard.css";
import { AiOutlineClockCircle } from "react-icons/ai";
import { Link } from "react-router-dom";

export function RecipeCard({ posts }) {
	//console.log("here are my posts", posts)
	// console.log("cooking time is", posts[0].fields.cookingTime)
	// console.log("image is", posts[0].fields.recipeImage.fields.file.url)
	// console.log(posts[0].fields.recipeImage.fields)

	return (
		<div className="cards">
			{posts && posts.length > 0 ? (
				posts.map((item, index) => (
					<Link to={`/recipe/${item.fields.slug}`} className="card" key={index}>
						<div className="card-hover">
							<div className="card-top">
								<img src={item?.fields?.recipeImage?.fields?.file?.url} />
								{/* <img src="//images.ctfassets.net/01t4r2gp4nca/7ccj4W6X4W0xiZRro1c56n/3e1b4d37851e2e7ae417ab2989718eb8/Spinach__ricotta_pancake_bake.jpg" /> */}
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
				<p>Loading...</p>
			)}
		</div>
	);
}
