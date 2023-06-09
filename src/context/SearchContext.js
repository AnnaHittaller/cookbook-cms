import { createContext, useState } from "react";

export const SearchContext = createContext();

export default function SearchProviderFunction({ children }) {
	const [query, setQuery] = useState("");
	const [category, setCategory] = useState("")

	return (
		<SearchContext.Provider value={{ query, setQuery, category, setCategory }}>
			{children}
		</SearchContext.Provider>
	);
}
