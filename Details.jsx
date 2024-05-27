import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchTvshow } from './services';

const Artist = ({ name, character, imgURL }) => {
    return (
        <div className="card" style={{ width: '300px', margin: '10px' }}>
            <div className="card-image" style={{ height: '250px' }}>
                <figure className="image is-3by2" style={{ height: '100%' }}>
                    <img src={imgURL} alt={name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </figure>
            </div>
            <div className="card-content" style={{ textAlign: 'center', marginTop: '20px' }}>
                <p className="title is-4" style={{ margin: '5px 0', whiteSpace: 'nowrap' }}>{name}</p>
                <p className="subtitle is-5" style={{ margin: '5px 0', whiteSpace: 'nowrap'}}>{character}</p>
            </div>
        </div>
    );
};

const Season = ({ seasonId, number, episodeCount, imgURL, tvshowTitle }) => {
    return (
        <Link to={`/season/${seasonId}/${tvshowTitle}/${number}`} className="season" style={{ flex: 'auto', marginRight: '10px' }}>
            <img src={imgURL} alt={`Season ${number}`} style={{ width: '400px', height: 'auto' }} />
            <div style={{ textAlign: 'center' }}>
                <p style={{ margin: '20px', fontSize: '30px', fontWeight: 'bold' }}>Season {number}</p>
                <p style={{ margin: '10px', fontSize: '20px' }}>{episodeCount} episodes</p>
            </div>
        </Link>
    );
};

const Details = () => {
    const { tvshowId } = useParams();
    const [tvshowDetails, setTvshowDetails] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchTvshow(tvshowId)
            .then(data => {
                setTvshowDetails(data);
                setError(null);
            })
            .catch(error => {
                console.error('Error fetching TV show details:', error);
                setError('Error fetching TV show details');
            });
    }, [tvshowId]);

    return (
        <div className="container" style={{ padding: '20px' }}>
            {error ? (
                <div>
                    <p>{error}</p>
                    <button onClick={() => window.location.reload()}>Retry</button>
                </div>
            ) : (
                <div>
                    {tvshowDetails ? (
                        <div>
                            <div className="columns">
                                <div className="column is-one-third">
                                    <img src={tvshowDetails.imgURL} alt={tvshowDetails.title} style={{ width: '100%' }} />
                                </div>
                                <div className="column">
                                    <h1 className="title">{tvshowDetails.title}</h1>
                                    <p><strong>Year:</strong> {tvshowDetails.year}</p>
                                    <p><strong>Episodes:</strong> {tvshowDetails.episodeCount}</p>
                                    <p><strong>Genres:</strong> {tvshowDetails.genres.map(g => g.name).join(', ')}</p>
                                    <p><strong>Studio:</strong> {tvshowDetails.studio.name}</p>
                                    <p><strong>Description:</strong> {tvshowDetails.plot}</p>
                                    <p><strong>Rating:</strong> {tvshowDetails.rating}</p>
                                    <p><strong>Parental Guideline:</strong> {tvshowDetails.tvParentalGuideline}</p>
                                    <audio controls>
                                        <source src={tvshowDetails.audioURL} type="audio/mpeg" />
                                        Your browser does not support the audio element.
                                    </audio>
                                </div>
                            </div>
                            <div>
                                <h2 className="title is-4">Actors</h2>
                                <div className="actors" style={{ display: 'flex', overflowX: 'auto', padding: '10px 0' }}>
                                    {tvshowDetails.roles.map(actor => (
                                        <Artist key={actor.roleId} {...actor} />
                                    ))}
                                </div>
                            </div>
                            <div>
                                <h2 className="title is-4">Seasons</h2>
                                <div className="seasons" style={{ display: 'flex', overflowX: 'auto', padding: '10px 0' }}>
                                    {tvshowDetails.seasons.map(season => (
                                        <Season
                                            key={season.seasonId}
                                            seasonId={season.seasonId}
                                            number={season.number}
                                            episodeCount={season.episodeCount}
                                            imgURL={season.imgURL}
                                            tvshowTitle={tvshowDetails.title}
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="loading">
                            <p>Loading...</p>
                            <div className="spinner" style={{ margin: 'auto', width: '50px', height: '50px', border: '5px solid #f3f3f3', borderRadius: '50%', borderTop: '5px solid #3498db', animation: 'spin 1s linear infinite' }}></div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default Details;