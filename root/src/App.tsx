// App.tsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/Homepage";
import PokemonDetail from "./pages/PokemonDetail";

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/pokemon/:name" element={<PokemonDetail />} />
            </Routes>
        </Router>
    );
};

export default App;
