import { Link } from "react-router-dom";
import type { Post } from "./PostList";
import { Heart, MessageCircleMore } from "lucide-react";

interface Props {
  post: Post;
}

const PostItem = ({ post }: Props) => {
  return (
    <div className="relative group w-[250px] ">
      {/* Glow effect on hover */}
      <div
        className="absolute inset-0 rounded-2xl bg-gradient-to-r
        from-purple-600 to-pink-500 blur-lg opacity-0 
        group-hover:opacity-50 transition duration-300 pointer-events-none"
      />

      {/* Main Card */}
      <Link
        to={`/post/${post.id}`}
        className="relative z-10 flex flex-col bg-[#1e1e1e] rounded-2xl 
        border border-[#545a6a] overflow-hidden transition duration-300 
        hover:bg-[#2a2a2a] text-white pb-2"
      >
        {/* Header: avatar and title */}
        <div className="flex items-center gap-2 p-4">
          {post.avatar_url ? (
            <img
              src={post.avatar_url}
              alt="User Avatar"
              className="rounded-full w-[30px] h-[30px] object-cover"
            />
          ) : (
            <div className="w-[30px] h-[30px] rounded-full bg-purple-600" />
          )}
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

        <div className="flex  gap-7 justify-between items-center mx-5 p-2">
          <span className="flex items-center gap-2 justify-center  p-1">
            <Heart  className="cursor-pointer text-white/50"/>
            <span className="cursor-pointer text-white/50">{post.like_count ?? 0}</span>
          </span>
          <span className="flex items-center gap-2 justify-center  p-1">
            <MessageCircleMore  className="cursor-pointer text-white/50"/>
                <span className="cursor-pointer text-white/50">{post.comment_count ?? 0}</span>
          </span>
        </div>
      </Link>
    </div>
  );
};

export default PostItem;
