import { CommunityList } from "../components/CommunityList";

export const CommunitiesPage = () => {
  return (
    <>
      <div className="h-[190vh]">
        <h1
          className="text-4xl font-extrabold text-center
             mb-8 bg-gradient-to-r from-purple-400 to-pink-500 
             text-transparent bg-clip-text md:text-5xl tracking-tight"
        >
          Explore Communities
        </h1>

        <CommunityList />
      </div>
    </>
  );
};
