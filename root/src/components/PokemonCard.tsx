import { capWords } from "../func";
import Pokemon from "../types/Pokemon";
import { Link } from "react-router-dom";

interface Props {
    pokemon: Pokemon;
}

const PokemonCard: React.FC<Props> = ({ pokemon }) => {
    let typeColor: string = pokemon?.types[0].type.name;

    if (pokemon)
        return (
            <Link to={`/pokemon/${pokemon?.name}`} className="w-full md:w-fit">
                <div
                    className={`px-6 relative pokemon-bg-${
                        typeColor ? typeColor : "normal"
                    } w-full rounded-lg md:max-w-[330px] md:w-[320px] xl:w-[330px] flex items-center h-[190px]`}
                >
                    <div className="flex justify-between items-start w-full">
                        <div>
                            {/* Pokemon's Name */}
                            <p className="font-bold text-white text-lg">
                                {capWords(pokemon?.name)}
                            </p>

                            {/* Pokemon's types */}
                            <ul className="flex flex-col gap-2 relative w-fit mt-2">
                                {pokemon?.types.map((type, index) => (
                                    <li
                                        key={index}
                                        className="relative text-white w-24 text-center
                                   before:absolute before:w-full before:h-full before:bg-white 
                                   before:opacity-20 before:left-0 before:rounded-full"
                                    >
                                        {capWords(type.type.name)}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        {/* Pokemon's Sprite */}
                        <img
                            className="scale-150 mr-3 relative"
                            src={pokemon?.sprites.front_default}
                        />
                    </div>
                </div>
            </Link>
        );
};

export default PokemonCard;
