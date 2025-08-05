import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Pokemon from "../types/Pokemon";
import { capWords } from "../func";

const PokemonDetail = () => {
    const { name } = useParams<{ name: string }>();
    const [pokemon, setPokemon] = useState<Pokemon>();
    const [abilities, setAbilities] = useState<string[]>([]);

    let typeColor: string | undefined = pokemon?.types[0].type.name;

    const navigate = useNavigate();

    const fetchPokemon = async () => {
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
        const data = await res.json();
        setPokemon(data);
        console.log(data);
    };

    useEffect(() => {
        fetchPokemon();
    }, [name]);

    useEffect(() => {
        setAbilities([]);
        if (pokemon) {
            setAbilities(
                pokemon.abilities.map((ab) => capWords(ab.ability.name))
            );
        }
    }, [pokemon]);

    console.log(pokemon?.stats[0].base_stat);

    if (!pokemon)
        return (
            <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 spinner"></div>
        );
    return (
        <div
            className={`h-screen pokemon-bg-${
                typeColor ? typeColor : "normal"
            } flex flex-col justify-between items-center`}
        >
            <header className="flex flex-col justify-center px-6 pt-6 max-w-[600px] w-full h-[55%] relative">
                <div className="flex flex-col items-start gap-3 mb-5">
                    <button
                        className="text-2xl text-white cursor-pointer"
                        onClick={() => navigate(-1)}
                    >
                        ←
                    </button>
                    <div>
                        {/* Pokemon's Name */}
                        <p className="font-bold text-white text-[2.3rem]">
                            {pokemon ? capWords(pokemon.name) : "Loading..."}
                        </p>

                        {/* Pokemon's types */}
                        <ul className="flex gap-2 relative w-fit mt-1">
                            {pokemon?.types.map((type, index) => (
                                <li
                                    key={index}
                                    className="relative text-white w-20  text-center
                                   before:absolute before:w-full before:h-full before:bg-white 
                                   before:opacity-20 before:left-0 before:rounded-full"
                                >
                                    {capWords(type.type.name)}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
                <img
                    src={pokemon?.sprites.front_default}
                    alt={pokemon?.name + " image"}
                    className="absolute right-6 sm:right-12 scale-150 z-10"
                />
            </header>
            <main
                className="relative px-6 py-8 bg-white max-w-[650px] w-full h-full 
                             rounded-t-4xl overflow-y-scroll hidden-scrollbar"
            >
                <div className="flex flex-col h-fit gap-2 max-w-[600-px] sm:px-6">
                    {/* Pokemon's about */}
                    <h1 className="info-title">About</h1>
                    <div className="info-container" id="height">
                        <p className="label">Height </p>
                        <p className="text-end">
                            {pokemon.height
                                ? `${pokemon.height} dm (${
                                      pokemon.height * 10
                                  } cm)`
                                : "N/A"}
                        </p>
                    </div>
                    <div className="info-container" id="weight">
                        <p className="label">Weight </p>
                        <p className="text-end">
                            {pokemon.weight
                                ? `${pokemon.weight} hg (${
                                      pokemon.weight / 10
                                  } kg)`
                                : "N/A"}
                        </p>
                    </div>
                    <div className="info-container" id="abilities">
                        <p className="label">Abilities </p>
                        <p className="text-end">{abilities.join(", ")}</p>
                    </div>
                    {/* Pokemon's stats */}
                    <h1 className="mt-2 info-title">Stats</h1>
                    {pokemon.stats.map((stat, index) => (
                        <div
                            key={index}
                            className="flex justify-between sm:justify-normal items-center w-full gap-2"
                        >
                            <p className="label w-56">
                                {capWords(stat.stat.name)}
                            </p>
                            <div className="flex gap-3 items-center w-full">
                                <p className="w-8">{stat.base_stat}</p>
                                <div className="w-[180px] bg-gray-200 h-2 rounded-full">
                                    <div
                                        style={{
                                            width: `${Math.min(
                                                Math.max(stat.base_stat, 10),
                                                100
                                            )}%`,
                                        }}
                                        className={`rounded-full h-full bg-prog-${
                                            stat.base_stat < 50
                                                ? "acc-red"
                                                : stat.base_stat >= 120
                                                ? "acc-special"
                                                : "acc-green"
                                        }`}
                                    ></div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
};

export default PokemonDetail;
