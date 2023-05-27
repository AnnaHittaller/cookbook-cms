import { createContext, useEffect, useState } from "react";
import useLocalStorage from "../customHooks/useLocalStorage";

export const AuthContext = createContext();

export default function AuthContextFunction({ children }) {
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [authorized, setAuthorized] = useLocalStorage("authorized", false)

  useEffect(() => {
		// Set isLoggedIn to true if authorized is already true in local storage
		if (authorized) {
			setIsLoggedIn(true);
		}
	}, [authorized, setIsLoggedIn]);

	const login = (email, password) => {
		if (email === "user4@example.com" && password === "1234") {
			setIsLoggedIn(true);
			setAuthorized(true)
		}
	};
	const logout = () => {
		setIsLoggedIn(false);
		setAuthorized(false);
	};

	return (
		<AuthContext.Provider value={{ isLoggedIn, login, logout }}>
			{children}
		</AuthContext.Provider>
	);
}
