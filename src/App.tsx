import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";

const App = () => {
  return (
    <>
      <div
        className="min-h-screen bg-black text-gray-100
       transition-opacity duration-700 pt-20"
      >
        <Navbar />
        <div className="container mx-auto px-4  py-6">
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </div>
      </div>
    </>
  );
};

export default App;
