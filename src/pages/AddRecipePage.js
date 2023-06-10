import { useState } from "react";
import MainLayout from "../components/MainLayout";
import "../styles/addRecipe.css";
import { TagsInput } from "react-tag-input-component";

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
	console.log(ingredients);

	const handlesubmit = (e) => {
		e.preventDefault();
	};

	return (
		<MainLayout>
			<div className="page">
				<h1>Add a new recipe</h1>
				<form className="add-new-form" onSubmit={handlesubmit}>
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
					<button className="add-new-btn" type="submit">
						Add recipe
					</button>
				</form>
			</div>
		</MainLayout>
	);
}

export default AddRecipePage;
