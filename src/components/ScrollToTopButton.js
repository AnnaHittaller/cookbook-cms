import { useEffect, useState } from "react";
import { MdKeyboardArrowUp } from "react-icons/md";
import '../styles/scrollToTopButton.css'

function ScrollToTopButton() {
	const [isVisible, setIsVisible] = useState(false);

	useEffect(() => {
		window.addEventListener("scroll", handleScroll);
		return () => {
			window.removeEventListener("scroll", handleScroll);
		};
	}, []);

	const handleScroll = () => {
		const scrollTop = window.scrollY || document.documentElement.scrollTop;
		setIsVisible(scrollTop > 200);
	};

    const handleToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    }

	return (
		<button className={`to-top ${isVisible ? 'visible' : ''}`} onClick={handleToTop}>
			<MdKeyboardArrowUp />
		</button>
	);
}

export default ScrollToTopButton;
