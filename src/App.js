import React, { createContext, useState } from "react";
import RoutingModule from "./RoutingModule";
import "./App.css";

export const SearchQuery = createContext();
export const UpdateSearchQuery = createContext();

const App = () => {
    const [searchQuery, setSearchQuery] = useState("");

    return (
        <SearchQuery.Provider value={searchQuery}>
            <UpdateSearchQuery.Provider value={setSearchQuery}>
                <RoutingModule />
            </UpdateSearchQuery.Provider>
        </SearchQuery.Provider>
    );
};

export default App;