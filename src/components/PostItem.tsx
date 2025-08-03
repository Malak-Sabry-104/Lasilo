import { Link } from "react-router-dom";
import type { Post } from "./PostList";

interface Props {
  post: Post;
}

const PostItem = ({ post }: Props) => {
  return (
    <div className="relative group w-[250px]">
      {/* Glow effect on hover */}
      <div
        className="absolute inset-0 rounded-2xl bg-gradient-to-r
        from-purple-600 to-pink-500 blur-lg opacity-0 
        group-hover:opacity-50 transition duration-300 pointer-events-none"
      />

      {/* Main Card */}
      <Link
        to="/post"
        className="relative z-10 flex flex-col bg-[#1e1e1e] rounded-2xl 
        border border-[#545a6a] overflow-hidden transition duration-300 
        hover:bg-[#2a2a2a] text-white"
      >
        {/* Header: avatar and title */}
        <div className="flex items-center gap-2 p-4">
          <div className="w-[30px] h-[30px] rounded-full bg-purple-600" />
          <h2 className="text-md font-semibold">{post.title}</h2>
        </div>

        {/* Post image */}
        <div className="px-4 pb-4">
          <img
            src={post.image_url}
            alt={post.title}
            className="w-full h-[140px] object-cover rounded-xl"
          />
        </div>
      </Link>
    </div>
  );
};

export default PostItem;
