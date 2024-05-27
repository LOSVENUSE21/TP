import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { fetchTvshows, fetchStudios, fetchGenres } from "./services";
import Image from "./Image";

const Home = () => {
    const [tvshows, setTvshows] = useState([]);
    const [studios, setStudios] = useState([]);
    const [genres, setGenres] = useState([]);
    const [filterTitle, setFilterTitle] = useState("");
    const [filterStudio, setFilterStudio] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [showsPerPage, setShowsPerPage] = useState(8);

    useEffect(() => {
        fetchTvshows().then(setTvshows);
        fetchStudios().then(setStudios);
        fetchGenres().then(setGenres);
    }, []);

    const filteredShows = tvshows.filter(tvshow =>
        tvshow.title.toLowerCase().includes(filterTitle.toLowerCase()) &&
        (filterStudio ? tvshow.studio.name === filterStudio : true)
    );

    const indexOfLastShow = currentPage * showsPerPage;
    const indexOfFirstShow = indexOfLastShow - showsPerPage;
    const currentShows = filteredShows.slice(indexOfFirstShow, indexOfLastShow);
    const totalPages = Math.ceil(filteredShows.length / showsPerPage);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    return (
        <div>
            <nav className="navbar is-primary is-dark" role="navigation" aria-label="main navigation">
                <div className="navbar-brand">
                    <Link to="/" className="navbar-item">TP2</Link>
                </div>
                <div className="navbar-menu">
                    <div className="navbar-end">
                        <div className="navbar-item">
                            <div className="buttons">
                                <Link className="button is-primary" to="/signup">Sign Up</Link>
                                <Link className="button is-primary" to="/Login">Login</Link>
                                <Link className="button is-primary" to="/about">About</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
            <div className="container">
                <div className="field">
                    <label className="label">Filter by Title</label>
                    <div className="control">
                        <input
                            className="input"
                            type="text"
                            value={filterTitle}
                            onChange={(e) => setFilterTitle(e.target.value)}
                        />
                    </div>
                </div>
                <div className="field">
                    <label className="label">Filter by Studio</label>
                    <div className="control">
                        <div className="select">
                            <select value={filterStudio} onChange={(e) => setFilterStudio(e.target.value)}>
                                <option value="">All</option>
                                {studios.map(studio => (
                                    <option key={studio.studioId} value={studio.name}>{studio.name}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>
                <div className="columns is-multiline">
                    {currentShows.map(tvshow => (
                        <div key={tvshow.tvshowId} className="column is-one-quarter">
                            <div className="card">
                                <div className="card-image">
                                    <Link to={`/details/${tvshow.tvshowId}`}>
                                        <figure className="image is-3by5">
                                            <Image src={tvshow.imgURL} alt={tvshow.title} />
                                        </figure>
                                    </Link>
                                </div>
                                <div className="card-content">
                                    <p className="title is-4">{tvshow.title}</p>
                                    <p><strong>Studio:</strong> {tvshow.studio.name}</p>
                                    <p><strong>Genres:</strong> {tvshow.genres.map(genre => genre.name).join(", ")}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <nav className="pagination" role="navigation" aria-label="pagination">
                    <button
                        className="pagination-previous"
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                    >
                        Previous
                    </button>
                    <button
                        className="pagination-next"
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                    >
                        Next
                    </button>
                    <ul className="pagination-list">
                        {Array.from({ length: totalPages }, (_, i) => (
                            <li key={i}>
                                <button
                                    className={`pagination-link ${currentPage === i + 1 ? "is-current" : ""}`}
                                    onClick={() => handlePageChange(i + 1)}
                                    disabled={currentPage === i + 1}
                                >
                                    {i + 1}
                                </button>
                            </li>
                        ))}
                    </ul>
                </nav>
                <div style={{ textAlign: "center", marginTop: "1rem" }}>
                    <div className="field">
                        <label className="label">Shows per Page</label>
                        <div className="control">
                            <div className="select">
                                <select value={showsPerPage} onChange={(e) => setShowsPerPage(Number(e.target.value))}>
                                    <option value="4">4</option>
                                    <option value="8">8</option>
                                    <option value="12">12</option>
                                    <option value="16">16</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
