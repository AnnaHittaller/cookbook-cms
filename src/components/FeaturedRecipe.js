import "../styles/featuredRecipe.css";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import { BsCaretLeftFill, BsCaretRightFill } from "react-icons/bs";
import image from "../assets/Sesame_Lemon_Chicken.jpg";

const responsive = {
	0: { items: 1 },
	568: { items: 1 },
	1024: { items: 1 },
};

const renderPrevButton = ({ isDisabled }) => {
	return <BsCaretLeftFill style={{ color: "white", fontSize: "20px" }} />;
};

const renderNextButton = ({ isDisabled }) => {
	return <BsCaretRightFill style={{ color: "white", fontSize: "20px" }} />;
};

function FeaturedRecipe() {
	const items = [
		<div className="item" data-value="1">
			<div className="featured-container">
				<img src={image} />
				<div className="featured-data">
					<div>
						<p>Category</p>
						<h2>Recipe title</h2>
						<p>Short recipe summary</p>
					</div>
				</div>
			</div>
		</div>,
		<div className="item" data-value="2">
			<div className="featured-container">
				<img src={image} />
				<div className="featured-data">
					<div>
						<p>Category</p>
						<h2>Recipe title</h2>
						<p>Short recipe summary</p>
					</div>
				</div>
			</div>
		</div>,
		<div className="item" data-value="3">
			<div className="featured-container">
				<img src={image} />
				<div className="featured-data">
					<div>
						<p>Category</p>
						<h2>Recipe title</h2>
						<p>Short recipe summary</p>
					</div>
				</div>
			</div>
		</div>,
	];
	return (
		<div className="featured-container">
			<AliceCarousel
				mouseTracking
				infinite
				items={items}
				responsive={responsive}
				controlsStrategy="alternate"
				renderPrevButton={renderPrevButton}
				renderNextButton={renderNextButton}
				disableSlideInfo={true}
				disableDotsControls={false}
			/>
		</div>
	);
}

export default FeaturedRecipe;
