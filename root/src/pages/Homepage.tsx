import { useEffect, useState } from "react";
import SearchBar from "../components/SearchBar";
import Pokemon from "../types/Pokemon";
import PokemonCard from "../components/PokemonCard";
import Pagination from "../components/Pagination";
import PokeballSvg from "../assets/pokeball.svg";

const API_BASE_URL: string = "https://pokeapi.co/api/v2/pokemon";
const API_OPTIONS = {
    method: "GET",
    headers: {
        accept: "application/json",
    },
};

const Homepage = () => {
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [pokemonList, setPokemonList] = useState<Pokemon[] | Pokemon>();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string>("");
    const [nextUrl, setNextUrl] = useState<string | null>(null);
    const [prevUrl, setPrevUrl] = useState<string | null>(null);
    const [numPages, setNumPages] = useState<number>(1);
    const [currentPage, setCurrentPage] = useState<number>(1);

    const normalizeUrlWithLimit = (url: string): string => {
        const parsedUrl = new URL(url);
        parsedUrl.searchParams.set("limit", String(12));
        return parsedUrl.toString();
    };

    const fetchPokemonList = async (url?: string) => {
        setIsLoading(true);
        setErrorMessage("");

        const endpoint = url
            ? normalizeUrlWithLimit(url)
            : `${API_BASE_URL}?limit=12&offset=0`;

        try {
            const res = await fetch(endpoint, API_OPTIONS);
            if (!res.ok) throw new Error("Failed to fetch Pokemon list.");

            const data = await res.json();

            setNextUrl(data.next);
            setPrevUrl(data.previous);
            setNumPages(Math.ceil(data.count / 12));

            const detailedData = await Promise.all(
                data.results.map(async (p: any) => {
                    const detailRes = await fetch(p.url);
                    return detailRes.json();
                })
            );

            setPokemonList(detailedData);
        } catch (err) {
            setErrorMessage("Error fetching Pokemon. Please try again later.");
            setPokemonList([]);
            setNumPages(1);
        } finally {
            setIsLoading(false);
        }
    };

    const fetchPokemonByName = async (query: string) => {
        setIsLoading(true);
        setErrorMessage("");
        setCurrentPage(1);

        try {
            const endpoint = `${API_BASE_URL}/${encodeURIComponent(
                query.toLowerCase().trim().replace(" ", "-")
            )}`;

            const res = await fetch(endpoint, API_OPTIONS);
            if (!res.ok) throw new Error("Pokemon not found.");

            const data = await res.json();

            setPokemonList(data);
            setNumPages(1);
            setNextUrl(null);
            setPrevUrl(null);
        } catch (err) {
            setErrorMessage("Pokemon not found.");
            setPokemonList([]);
            setNumPages(1);
        } finally {
            setIsLoading(false);
        }
    };

    const handleNextUrl = () => {
        if (nextUrl) {
            fetchPokemonList(nextUrl);
            setCurrentPage((prev) => prev + 1);
        }
    };

    const handlePrevUrl = () => {
        if (prevUrl) {
            fetchPokemonList(prevUrl);
            setCurrentPage((prev) => prev - 1);
        }
    };

    useEffect(() => {
        fetchPokemonList();
    }, []);

    useEffect(() => {
        if (searchTerm) fetchPokemonByName(searchTerm);
        if (!searchTerm) fetchPokemonList();
    }, [searchTerm]);

    return (
        <>
            <div
                className="flex flex-col md:flex-row justify-between gap-12 max-w-[420px] md:max-w-[655px] lg:max-w-[1015px] 
                            mx-auto my-12 px-4 md:px-1"
            >
                <h1 className="font-bold text-3xl">Pokedex</h1>
                <img
                    src={PokeballSvg}
                    className="fixed w-96 -z-10 -right-20 -top-20"
                />
                <SearchBar setSearchTerm={setSearchTerm} />
            </div>
            <div
                className="flex flex-wrap gap-3 my-8 w-full max-w-[420px] md:max-w-[655px] lg:max-w-[1015px] 
                            sm:justify-center mx-auto mt-6 px-3 sm:px-0"
            >
                {isLoading ? (
                    <div className="spinner mx-auto"></div>
                ) : errorMessage ? (
                    <p className="text-acc-red font-bold text-center w-full">
                        {errorMessage}
                    </p>
                ) : pokemonList && Array.isArray(pokemonList) ? (
                    pokemonList.map((pokemon, index) => (
                        <PokemonCard key={index} pokemon={pokemon} />
                    ))
                ) : (
                    <PokemonCard pokemon={pokemonList as Pokemon} />
                )}
            </div>
            {!isLoading ? (
                !errorMessage ? (
                    !searchTerm ? (
                        <Pagination
                            urlHandlers={[handlePrevUrl, handleNextUrl]}
                            numPages={numPages}
                            currentPage={currentPage}
                        />
                    ) : null
                ) : null
            ) : null}
        </>
    );
};

export default Homepage;
