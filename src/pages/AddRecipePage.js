import { useState } from "react";
import MainLayout from "../components/MainLayout";
import "../styles/addRecipe.css";
import { TagsInput } from "react-tag-input-component";
import axios from "axios";
//import client from "../utils/Contentful";

function AddRecipePage() {
	const [category, setCategory] = useState();
	const [cookingTime, setCookingTime] = useState();
	const [date, setDate] = useState();
	const [featured, setFeatured] = useState(false);
	const [ingredients, setIngredients] = useState([]);
	const [prep1, setPrep1] = useState("");
	const [recipeImage, setRecipeImage] = useState(null);
	const [recipeTitle, setRecipeTitle] = useState();
	const [slug, setSlug] = useState("");
	const [summary, setSummary] = useState("");


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


	
const createAssetFromFiles = async (file) => {
	try {
		console.log("Creating asset...");
		const uploadResponse = await axios.post(
			`https://upload.contentful.com/spaces/${process.env.REACT_APP_CONTENTFUL_SPACE_ID}/uploads`,
			file,
			{
				headers: {
					"Content-Type": "application/octet-stream",
					Authorization: `Bearer ${process.env.REACT_APP_CM_TOKEN}`,
				},
			}
		);

		console.log("Upload response:", uploadResponse.data);

		const assetData = {
			fields: {
				title: {
					"en-US": file.name,
				},
				file: {
					"en-US": {
						contentType: file.type,
						fileName: file.name,
						uploadFrom: {
							sys: {
								type: "Link",
								linkType: "Upload",
								id: uploadResponse.data.sys.id,
							},
						},
					},
				},
			},
		};

		const createAssetResponse = await axios.post(
			`https://api.contentful.com/spaces/${process.env.REACT_APP_CONTENTFUL_SPACE_ID}/environments/master/assets`,
			assetData,
			{
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${process.env.REACT_APP_CONTENTFUL_ACCESS_TOKEN}`,
				},
			}
		);

		console.log("Create asset response:", createAssetResponse.data);

		return createAssetResponse.data;
	} catch (error) {
		console.log("Asset creation failed:", error.message);
		throw error;
	}
};

	const handlesubmit = async (e) => {
		e.preventDefault();
		setDate(today);
		let slugTitle = recipeTitle.toLowerCase().split(" ").join("-");
		setSlug(slugTitle);
		console.log("recipe image", recipeImage);


		try {
    		const assetData = await createAssetFromFiles(recipeImage);
			const payload = {
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
							"en-US": featured ? "yes" : "no",
						},
						category: {
							"en-US": category,
						},
						ingredients: {
							"en-US": ingredients,
						},
						recipeImage: {
							"en-US": {
								sys: {
									type: "Link",
									linkType: "Asset",
									id: assetData.sys.id,
								},
							},
						},
					},
				}

				console.log("Payload:", payload); 

			const response = await axios.post(
				`https://api.contentful.com/spaces/${process.env.REACT_APP_CONTENTFUL_SPACE_ID}/environments/master/entries`,
				payload,
				{
					headers: {
						"Content-Type": "application/vnd.contentful.management.v1+json",
						Authorization: `Bearer ${process.env.REACT_APP_CONTENTFUL_CM_TOKEN}`,
					},
				}
			);

			console.log("New recipe created successfully!");
			console.log(response.data);
		} catch (error) {
			console.error(error);
		}
  };

	const handleImageChange = (event) => {
		const selectedImage = event.target.files[0];
		setRecipeImage(URL.createObjectURL(selectedImage));
		//setRecipeImage(selectedImage);
	};

	return (
		<MainLayout>
			<div className="page">
				<h1>Add a new recipe</h1>
				<form className="add-new-form" onSubmit={handlesubmit}>
					<label htmlFor="recipeTitle">
						Recipe title:
						<input
							type="text"
							id="recipeTitle"
							maxlength="256"
							value={recipeTitle}
							onChange={(e) => setRecipeTitle(e.target.value)}
							name="recipeTitle"
							placeHolder="Enter recipe title"
							required
						/>
					</label>
					<div required>
						<label className="image" htmlFor="image">
							Image:
						</label>
						<input
							type="file"
							id="image"
							accept="image/*"
							onChange={handleImageChange}
						/>
						<div>
							{recipeImage && (
								<img src={recipeImage} alt="Selected" width="100%" />
							)}
						</div>
					</div>
					<label
						value={category}
						onChange={(e) => setCategory(e.target.value)}
						required>
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
							step="1"
							min="1"
							max="300"
						/>
					</label>
					<label required>
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

					<label required>
						Preparation:
						<textarea
							type="text"
							value={prep1}
							onChange={(e) => setPrep1(e.target.value)}
							name="prep1"
							placeHolder="Enter preparation steps"
							maxlength="50000"
						/>
					</label>
					<div
						className="featured-label"
						// required
						// value={featured}
						// onChange={(e) => setFeatured(e.target.value)}
					>
						<p>Featured:</p>
						<div>
							<div>
								<input
									type="radio"
									id="no"
									name="featured"
									value="no"
									defaultChecked
									checked={!featured}
									onChange={(e) => setFeatured(false)}
								/>
								<label htmlFor="no">No</label>
							</div>
							<div>
								<input
									type="radio"
									id="yes"
									name="featured"
									value="yes"
									checked={featured}
									onChange={(e) => setFeatured(true)}
								/>
								<label htmlFor="yes">Yes</label>
							</div>
						</div>
					</div>

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
