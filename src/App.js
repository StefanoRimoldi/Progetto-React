import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import FooterBottom from "./components/FooterBottom";
import Homepage from "./pages/Homepage";
import SearchResultsPage from "./pages/SearchResultsPage";
import SectionPage from "./pages/SectionPage";
import TopNavbar from "./components/TopNavbar";
import ErrorPage from "./pages/ErrorPage";


function App() {
    return (
        <Router>
            <TopNavbar />
            <Navbar />
            <Routes>
                <Route path="/" element={<Homepage />} />
                <Route path="/section/:nameSection" element={<SectionPage />} />
                <Route path="/search/:content" element={<SearchResultsPage />} />
                <Route path="/error" element={<ErrorPage />} />
            </Routes>
            <Footer />
            <FooterBottom />
        </Router>
    );
}

export default App;
