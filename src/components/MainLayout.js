import Header from "./Header";
import Sidebar from "./Sidebar";
import "../styles/mainLayout.css";
import Footer from "./Footer";
import ScrollToTopButton from "./ScrollToTopButton";

function MainLayout({ children }) {
	return (
		<div className="main">
			<Header />
			<div className="content">
				{children}
				<Sidebar />
			</div>
			<ScrollToTopButton />
			<Footer />
		</div>
	);
}

export default MainLayout;
