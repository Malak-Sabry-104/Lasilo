import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import CreatePostPage from "./pages/CreatePostPage";
import PostPage from "./pages/PostPage";
import CreateCommunityPage from "./pages/CreateCommunityPage";
import { CommunitiesPage } from "./pages/CommunitiesPage";
import { CommunityPage } from "./pages/CommunityPage";
import { useEffect } from "react";
import Footer from "./components/Footer";

const App = () => {
  useEffect(() => {
  document.title = 'Your Communities, Your Spark.';
}, []);
  return (
    <>
      <div
        className="min-h-screen bg-black text-gray-100
       transition-opacity duration-700 "
      >
        <Navbar />
        <div className="pt-20  pb-5">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/create" element={<CreatePostPage />} />
            <Route path="/post/:id" element={<PostPage />} />
            <Route path="/community/create" element={<CreateCommunityPage />} />
            <Route path="/communities" element={<CommunitiesPage />} />
            <Route path="/community" element={<CommunitiesPage />} />
            <Route path="/community/:id" element={<CommunityPage />} />
          </Routes>
        </div>
        <Footer/>
      </div>
    </>
  );
};

export default App;
