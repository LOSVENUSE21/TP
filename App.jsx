import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Home";
import Details from "./Details";
import SeasonDetails from "./SeasonDetails"; 
import NoMatch from "./NoMatch";

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home/>} />
                <Route path="/details/:tvshowId" element={<Details />} />
                <Route path="/details/:tvshowTitle/:seasonId" element={<Details />} />
                <Route path="/season/:seasonId/:tvshowTitle" element={<SeasonDetails />} /> 
                <Route path="*" element={<NoMatch />} />
            </Routes>
        </BrowserRouter>
    );
};

export default App;
