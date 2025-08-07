import PostList from "../components/PostList";
import Hero from "./Hero";

const Home = () => {
  return (
    <div>
      <Hero/>
      <h2
        className=" mt-6 text-4xl md:text-5xl font-bold mb-8 text-center bg-gradient-to-r 
    from-purple-500 to-pink-500 bg-clip-text text-transparent"
      >
        Recent Posts
      </h2>
      <div className="h-[80vh] pt-9">
        <PostList />
      </div>
    </div>
  );
};

export default Home;
