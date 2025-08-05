import ArrowLeft from "../assets/arrow-left.svg";
import ArrowRight from "../assets/arrow-right.svg";

const Pagination: React.FC<{
    urlHandlers: (() => void)[];
    numPages: number;
    currentPage: number;
}> = ({ urlHandlers, numPages, currentPage }) => {
    return (
        <div className="mx-auto w-fit pb-8 flex items-center gap-2">
            <button
                className="relative text-3xl cursor-pointer border border-gray-800 flex justify-center rounded-full p-2"
                onClick={() => urlHandlers[0]()}
            >
                <img src={ArrowLeft} alt="arrow-left" />
            </button>
            <div>
                <p>
                    {currentPage} / {numPages}
                </p>
            </div>
            <button
                className="relative text-3xl cursor-pointer border border-gray-800 flex justify-center rounded-full p-2"
                onClick={() => urlHandlers[1]()}
            >
                <img src={ArrowRight} alt="arrow-right" />
            </button>
        </div>
    );
};

export default Pagination;
