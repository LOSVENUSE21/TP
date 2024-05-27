import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchEpisodes } from './services';

const SeasonDetails = () => {
    const { seasonId, tvshowTitle } = useParams();
    const [episodes, setEpisodes] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchEpisodes(seasonId)
            .then(data => {
                setEpisodes(data);
                setError(null);
            })
            .catch(error => {
                console.error('Error fetching episodes:', error);
                setError('Error fetching episodes');
            });
    }, [seasonId]);

    return (
        <div className="container" style={{ padding: '20px' }}>
            <h1 className="title">{tvshowTitle} - Season {seasonId}</h1>
            {error ? (
                <div>
                    <p>{error}</p>
                </div>
            ) : (
                <div>
                    <h2 className="subtitle">Episodes</h2>
                    <ul>
                        {episodes.map(episode => (
                            <li key={episode.episodeId}>
                                <p>{episode.title}</p>
                                <p>{episode.description}</p>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default SeasonDetails;
