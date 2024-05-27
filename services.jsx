import { tvshowURL } from "./constants";

export const fetchTvshows = async () => {
    const response = await fetch(`${tvshowURL}/tvshows`);
    if (!response.ok) throw new Error("Failed to fetch TV shows");
    return await response.json();
};

export const fetchGenres = async () => {
    const response = await fetch(`${tvshowURL}/genres`);
    if (!response.ok) throw new Error("Failed to fetch genres");
    return await response.json();
};

export const fetchStudios = async () => {
    const response = await fetch(`${tvshowURL}/studios`);
    if (!response.ok) throw new Error("Failed to fetch studios");
    return await response.json();
};

export const fetchTvshow = async (tvshowId) => {
    const response = await fetch(`${tvshowURL}/tvshow?tvshowId=${tvshowId}`);
    if (!response.ok) throw new Error("Failed to fetch TV show details");
    return await response.json();
};

export const fetchActors = async (tvshowId) => {
    const response = await fetch(`${tvshowURL}/actors?tvshowId=${tvshowId}`);
    if (!response.ok) throw new Error("Failed to fetch actors");
    return await response.json();
};

export const fetchSeasons = async (tvshowId) => {
    const response = await fetch(`${tvshowURL}/seasons?tvshowId=${tvshowId}`);
    if (!response.ok) throw new Error("Failed to fetch seasons");
    return await response.json();
};

export const fetchEpisodes = async (seasonId) => {
    const response = await fetch(`${tvshowURL}/episodes?seasonId=${seasonId}`);
    if (!response.ok) throw new Error("Failed to fetch episodes");
    return await response.json();
};