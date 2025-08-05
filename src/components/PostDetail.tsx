import { useQuery } from "@tanstack/react-query";
import { supabase } from "../supabase-client";
import type { Post } from "./PostList";
import { CalendarDays } from "lucide-react";
import LikeButton from "./LikeButton";
import CommentSection from "./CommentSection";

interface Props {
  postId: number;
}
const fetchPostById = async (id: number): Promise<Post> => {
  const { data, error } = await supabase
    .from("posts")
    .select("*")
    .eq("id", id)
    .single();
  if (error) throw new Error(error.message);
  return data as Post;
};

const PostDetail = ({ postId }: Props) => {
  const { data, error, isLoading } = useQuery<Post, Error>({
    queryKey: ["post", postId],
    queryFn: () => fetchPostById(postId),
  });
  if (isLoading) {
    return <div>Loading Posts...</div>;
  }
  if (error) {
    return <div>Error: {error.message}</div>;
  }
  return (
    <div className="space-y-2  px-4  rounded-2xl text-white">
      <h2 className="text-4xl font-semibold mb-4 text-center text-white tracking-tight">
        {data?.title}
      </h2>
      {data?.image_url && (
        <div className="bg-zinc-800/10  w-[60%] flex justify-center mb-7 mx-auto rounded-xl p-2">
          <img
            src={data.image_url}
            alt={data.title}
            className="max-w-full max-h-[400px] rounded-md object-contain shadow-md"
          />
        </div>
      )}

      <div
        className="justify-between  py-2
       flex md:flex-row flex-col items-center md:gap-0 gap-5 px-4"
      >
        <p
          className="max-w-full  break-words
    text-gray-300 rounded-xl  text-md "
        >
          {data?.content}
        </p>

        <div
          className="flex bg-zinc-800/30 rounded-lg 
      justify-center gap-2 items-center  p-2"
        >
          <CalendarDays className="w-4 h-4  text-gray-500" />
          <p className="text-xs text-gray-500 ">
            Posted on: {new Date(data!.created_at).toLocaleDateString()}
          </p>
        </div>
      </div>
      <LikeButton postId={postId} />
      <CommentSection postId={postId} />
    </div>
  );
};
export default PostDetail;
