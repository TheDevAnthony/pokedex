import { useState, type Dispatch, type SetStateAction } from "react";
import SearchIcon from "../assets/search-icon.svg";

interface Props {
    setSearchTerm: Dispatch<SetStateAction<string>>;
}

const SearchBar = ({ setSearchTerm }: Props) => {
    const [inputValue, setInputValue] = useState<string>("");

    return (
        <div
            className="flex bg-white border border-gray-800 rounded-full 
                        w-full max-w-[650px] gap-2 px-6 py-3"
        >
            <img src={SearchIcon} alt="Search Icon" />
            <input
                className="outline-none w-full"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) =>
                    e.key === "Enter" && setSearchTerm(inputValue)
                }
                type="text"
            />
        </div>
    );
};

export default SearchBar;
