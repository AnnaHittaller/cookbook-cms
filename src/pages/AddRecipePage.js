import { useState } from "react";
import MainLayout from "../components/MainLayout";
import "../styles/addRecipe.css";
import { TagsInput } from "react-tag-input-component";

function AddRecipePage() {
	const [category, setCategory] = useState();
	const [cookingTime, setCookingTime] = useState();
	// const [date, setDate] = useState();
	const [featured, setFeatured] = useState(false);
	const [ingredients, setIngredients] = useState([]);
	const [prep1, setPrep1] = useState("");
	const [recipeImage, setRecipeImage] = useState("");
	const [recipeTitle, setRecipeTitle] = useState();
	const [slug, setSlug] = useState("");
	const [summary, setSummary] = useState("");
	console.log(ingredients);


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
	console.log(today);


	const handlesubmit = (e) => {
		e.preventDefault();
	};

	return (
		<MainLayout>
			<div className="page">
				<h1>Add a new recipe</h1>
				<form className="add-new-form" onSubmit={handlesubmit}>
					<label>
						Recipe title:
						<input type="text"
							maxlength="256"
							value={recipeTitle}
							onChange={(e) => setRecipeTitle(e.target.value)}
							name="recipeTitle"
							placeHolder="Enter recipe title" />
					</label>
					<p>IMAGE</p>
					<label value={category} onChange={(e) => setCategory(e.target.value)}>
						Category:
						<select name="category" >
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
					<label value={today}>
						Date: {today}
					</label>
					<label >
						Cooking time:
						<input type="number"
							value={cookingTime}
							onChange={(e) => setCookingTime(e.target.value)}
							name="cookingTitle"
							placeHolder="Enter cooking time"
							min="1"
							max="300" />
					</label>
					<label >
						Summary:
						<input type="text"
							value={summary}
							onChange={(e) =>
								setSummary(e.target.value)}
							name="summary"
							placeHolder="Enter summary"
							maxlength="256" />
					</label>
					<label>
						Ingredients:
						<TagsInput
							value={ingredients}
							onChange={setIngredients}
							name="ingredients"
							placeHolder="Enter ingredients"
							isEditOnRemove={true}
						/>
					</label>
					<p>preparation</p>
					<p>slug</p>
					<p>
						featured
					</p>
					<button className="add-new-btn" type="submit">
						Add recipe
					</button>
				</form>
			</div>
		</MainLayout>
	);
}

export default AddRecipePage;
