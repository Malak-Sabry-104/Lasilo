import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ThumbsUp, ThumbsDown } from "lucide-react";
import { supabase } from "../supabase-client";
import { useAuth } from "../context/AuthContext";

interface Props {
  postId: number;
}
interface Vote {
  id: number;
  post_id: number;
  user_id: string;
  vote: number;
}
const vote = async (voteValue: number, postId: number, userId: string) => {
  const { data: existingVote } = await supabase
    .from("votes")
    .select("*")
    .eq(" post_id", postId)
    .eq("user_id", userId)
    .maybeSingle();

  if (existingVote) {
    // Liked => 0 , Like => -1
    if (existingVote.vote === voteValue) {
      const { error } = await supabase
        .from("votes")
        .delete()
        .eq("id", existingVote.id);
      if (error) throw new Error(error.message);
    } else {
      const { error } = await supabase
        .from("votes")
        .update({ vote: voteValue })
        .eq("id", existingVote.id);
      if (error) throw new Error(error.message);
    }
  } else {
    const { error } = await supabase
      .from("votes")
      .insert({ post_id: postId, user_id: userId, vote: voteValue });
    if (error) throw new Error(error.message);
  }
};
const fetchVotes = async (postId: number): Promise<Vote[]> => {
  const { data, error } = await supabase
    .from("votes")
    .select("*")
    .eq(" post_id", postId);
  if (error) throw new Error(error.message);

  return data as Vote[];
};

const LikeButton = ({ postId }: Props) => {
  const { user } = useAuth();
  const QueryClient = useQueryClient();

  const {
    data: votes,
    isLoading,
    error,
  } = useQuery<Vote[], Error>({
    queryKey: ["votes", postId],
    queryFn: () => fetchVotes(postId),
    refetchInterval: 10000, //10 secs data updated,
  });

  const { mutate } = useMutation({
    mutationFn: (voteValue: number) => {
      if (!user) throw new Error("you must be logged in to vote!");
      return vote(voteValue, postId, user.id);
    },
    onSuccess: () => {
      QueryClient.invalidateQueries({ queryKey: ["votes", postId] });
    },
  });

  if (isLoading) {
    return <div>Loading Votes...</div>;
  }
  if (error) {
    return <div>Error: {error.message}</div>;
  }
  const likes = votes?.filter((v) => v.vote === 1).length || 0;
  const dislikes = votes?.filter((v) => v.vote === -1).length || 0;
  const userVote = votes?.find((v) => v.user_id === user?.id)?.vote;

  return (
    <>
      <div className="flex items-center gap-4 md:justify-start justify-center
       ml-4  p-2 rounded-xl shadow-inner">
        {/* Upvote Button */}
        <button
          onClick={() => mutate(1)}
          className={`cursor-pointer flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200
      ${
        userVote === 1
          ? "bg-green-600/20 text-green-400 ring-1 ring-green-500"
          : "bg-zinc-800 text-zinc-300 hover:bg-zinc-700 hover:text-green-300"
      }`}
        >
          <ThumbsUp
            className={`w-5 h-5 transition-colors ${
              userVote === 1 ? "fill-green-500 text-green-500" : "text-zinc-400"
            }`}
          />
          <span className="font-medium text-sm">{likes}</span>
        </button>

        {/* Downvote Button */}
        <button
          onClick={() => mutate(-1)}
          className={`cursor-pointer flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200
      ${
        userVote === -1
          ? "bg-red-600/20 text-red-400 ring-1 ring-red-500"
          : "bg-zinc-800 text-zinc-300 hover:bg-zinc-700 hover:text-red-300"
      }`}
        >
          <ThumbsDown
            className={`w-5 h-5 transition-colors ${
              userVote === -1 ? "fill-red-500 text-red-500" : "text-zinc-400"
            }`}
          />
          <span className="font-medium text-sm">{dislikes}</span>
        </button>
      </div>
    </>
  );
};

export default LikeButton;
