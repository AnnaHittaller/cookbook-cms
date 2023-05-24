import Header from "./Header";
import Sidebar from "./Sidebar";
import "../styles/mainLayout.css";
import Footer from "./Footer";

function MainLayout({ children }) {
	return (
		<div className="main">
			<Header />
			<div className="content">
				{children}
				<Sidebar />
			</div>
            <Footer/>
		</div>
	);
}

export default MainLayout;
