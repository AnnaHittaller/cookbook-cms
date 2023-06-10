import { useState } from "react";
import MainLayout from "../components/MainLayout";
import "../styles/addRecipe.css";
import { TagsInput } from "react-tag-input-component";
//import client from "../utils/Contentful";

function AddRecipePage() {
	const [category, setCategory] = useState("");
	const [cookingTime, setCookingTime] = useState("");
	const [date, setDate] = useState("");
	const [featured, setFeatured] = useState(false);
	const [ingredients, setIngredients] = useState([]);
	const [prep1, setPrep1] = useState("");
	const [recipeImage, setRecipeImage] = useState("");
	const [recipeTitle, setRecipeTitle] = useState("");
	const [slug, setSlug] = useState("");
	const [summary, setSummary] = useState("");
	//console.log(ingredients);

	//console.log("client", client);

	let today = new Date();
	let dd = today.getDate();

	let mm = today.getMonth() + 1;
	const yyyy = today.getFullYear();
	if (dd < 10) {
		dd = `0${dd}`;
	}

	if (mm < 10) {
		mm = `0${mm}`;
	}

	today = `${yyyy}-${mm}-${dd}`;

	const handlesubmit = async (e) => {
		e.preventDefault();
		//const today = new Date().toLocaleDateString();
		setDate(today);
		//console.log(recipeTitle);

		let slugTitle = recipeTitle.toLowerCase().split(" ").join("-");
		setSlug(slugTitle);
		//console.log(slug);

		const contentful = require("contentful-management");

		const client = contentful.createClient({
			accessToken: process.env.REACT_APP_CONTENTFUL_ACCESS_TOKEN,
		});

		// client
		// 	.getSpace(process.env.REACT_APP_CONTENTFUL_SPACE_ID)
		// 	.then((space) => space.getEnvironment("master"))
		// 	.then((environment) =>
		// 		environment.createEntry("recipeCard", {
		// 			fields: {
		// 				recipeTitle: {
		// 					"en-US": recipeTitle,
		// 				},
		// 				cookingTime: {
		// 					"en-US": cookingTime,
		// 				},
		// 				summary: {
		// 					"en-US": summary,
		// 				},
		// 				prep1: {
		// 					"en-US": prep1,
		// 				},
		// 				date: {
		// 					"en-US": date,
		// 				},
		// 				slug: {
		// 					"en-US": slug,
		// 				},
		// 				featured: {
		// 					"en-US": featured,
		// 				},
		// 			},
		// 		})
		// 	)
		// 	.then((entry) => console.log(entry))
		// 	.catch(console.error);

		try {
			const response = await fetch(
				`https://api.contentful.com/spaces/${process.env.REACT_APP_CONTENTFUL_SPACE_ID}/environments/master/entries`,
				{
					method: "POST",
					headers: {
						"Content-Type": "application/vnd.contentful.management.v1+json",
						Authorization: `Bearer ${process.env.REACT_APP_CONTENTFUL_CM_TOKEN}`,
						"X-Contentful-Content-Type": "recipeCard",
						//accessToken: process.env.REACT_APP_CONTENTFUL_CM_TOKEN,
					},
					body: JSON.stringify({
						fields: {
							recipeTitle: {
								"en-US": recipeTitle,
							},
							cookingTime: {
								"en-US": cookingTime,
							},
							summary: {
								"en-US": summary,
							},
							prep1: {
								"en-US": prep1,
							},
							date: {
								"en-US": date,
							},
							slug: {
								"en-US": slug,
							},
							featured: {
								"en-US": featured,
							},
						},
					}),
				}
			);

			if (response.ok) {
				console.log("New recipe created successfully!");
				//const data = await response.json();
				//console.log(data);
			} else {
				console.error("Something went wrong...");
			}
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<MainLayout>
			<div className="page">
				<h1>Add a new recipe</h1>
				<form className="add-new-form" onSubmit={handlesubmit}>
					<label>
						Recipe title:
						<input
							type="text"
							maxlength="256"
							value={recipeTitle}
							onChange={(e) => setRecipeTitle(e.target.value)}
							name="recipeTitle"
							placeholder="Enter recipe title"
							required
						/>
					</label>
					<p>IMAGE</p>
					<label value={category} onChange={(e) => setCategory(e.target.value)}>
						Category:
						<select name="category">
							<option value="">Select an option</option>
							<option value="breakfast">Breakfast</option>
							<option value="dessert">Dessert</option>
							<option value="dinner">Dinner</option>
							<option value="fish">Fish</option>
							<option value="main-course">Main course</option>
							<option value="pasta">Pasta</option>
							<option value="soup">Soup</option>
						</select>
					</label>
					<label>
						Cooking time in minutes:
						<input
							type="number"
							value={cookingTime}
							onChange={(e) => setCookingTime(e.target.value)}
							name="cookingTitle"
							placeHolder="Enter cooking time"
							min="1"
							max="300"
						/>
					</label>
					<label>
						Summary:
						<textarea
							type="text"
							value={summary}
							onChange={(e) => setSummary(e.target.value)}
							name="summary"
							placeHolder="Enter summary"
							maxlength="256"
							rows="3"
						/>
					</label>
					<label>
						Ingredients:
						<TagsInput
							value={ingredients}
							onChange={setIngredients}
							name="ingredients"
							placeHolder="Enter ingredients"
							isEditOnRemove={true}
							// required
						/>
					</label>
					<p>preparation</p>
					<p>featured</p>
					<label>Date: {today}</label>
					<button className="add-new-btn" type="submit">
						Add recipe
					</button>
				</form>
			</div>
		</MainLayout>
	);
}

export default AddRecipePage;
