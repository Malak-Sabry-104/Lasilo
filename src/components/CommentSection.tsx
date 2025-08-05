import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "../supabase-client";
import CommentItem from "./CommentItem";

interface Props {
  postId: number;
}
interface NewComment {
  content: string;
  parent_comment_id?: number | null;
}
export interface Comment {
  id: number;
  post_id: number;
  parent_comment_id: number | null;
  content: string;
  user_id: string;
  created_at: string;
  author: string;
}
const createComment = async (
  newComment: NewComment,
  postId: number,
  userId?: string,
  author?: string
) => {
  if (!userId || !author) {
    throw new Error("you must be logged in to comment.");
  }
  const { error } = await supabase.from("comments").insert({
    post_id: postId,
    content: newComment.content,
    parent_comment_id: newComment.parent_comment_id || null,
    user_id: userId,
    author: author,
  });
  if (error) throw new Error(error.message);
};
const fetchComments = async (postId: number): Promise<Comment[]> => {
  const { data, error } = await supabase
    .from("comments")
    .select("*")
    .eq(" post_id", postId)
    .order("created_at", { ascending: true });
  if (error) throw new Error(error.message);

  return data as Comment[];
};

const CommentSection = ({ postId }: Props) => {
  const [newCommentText, setNewCommentText] = useState<string>("");
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const {
    data: comments,
    isLoading,
    error,
  } = useQuery<Comment[], Error>({
    queryKey: ["comments", postId],
    queryFn: () => fetchComments(postId),
    refetchInterval: 10000, //10 secs data updated,
  });
  const { mutate, isPending, isError } = useMutation({
    mutationFn: (newComment: NewComment) =>
      createComment(
        newComment,
        postId,
        user?.id,
        user?.user_metadata?.user_name
      ),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["comments", postId] });
    },
  });
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCommentText) return;
    mutate({ content: newCommentText, parent_comment_id: null });
    setNewCommentText("");
  };
  // map of comments=>organize replies=>return tree
  const buildCommentTree = (
    flatComments: Comment[]
  ): (Comment & { children?: Comment[] })[] => {
    const map = new Map<number, Comment & { children?: Comment[] }>();
    const roots: (Comment & { children?: Comment[] })[] = [];
    flatComments.forEach((comment) => {
      map.set(comment.id, { ...comment, children: [] });
    });
    flatComments.forEach((comment) => {
      if (comment.parent_comment_id) {
        const parent = map.get(comment.parent_comment_id);
        if (parent) {
          parent.children!.push(map.get(comment.id)!);
        }
      } else {
        roots.push(map.get(comment.id)!);
      }
    });
    return roots;
  };

  if (isLoading) {
    return <div>Loading Comments...</div>;
  }
  if (error) {
    return <div>Error: {error.message}</div>;
  }
  const commentTree = comments ? buildCommentTree(comments) : [];
  return (
    <>
      <div className="mt-10">
        <h3 className="text-3xl font-bold mb-6 text-white">Comments</h3>
        {/* create comment section */}
        {user ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <textarea
              value={newCommentText}
              rows={4}
              className="w-full resize-none rounded-lg bg-zinc-800/50 text-white p-3 placeholder-gray-400 
              focus:outline-none focus:ring-2 focus:ring-purple-500 border border-zinc-700"
              placeholder="Write a comment..."
              onChange={(e) => setNewCommentText(e.target.value)}
            />
            <button
              type="submit"
              disabled={!newCommentText || isPending}
              className={`px-5  mb-7 py-2 cursor-pointer rounded-md text-sm font-medium transition-all duration-200
          ${
            newCommentText
              ? "bg-purple-600 hover:bg-purple-700 text-white"
              : "bg-zinc-700 text-zinc-400 cursor-not-allowed"
          }`}
            >
              {isPending ? "Posting..." : "Post Comment"}
            </button>

            {isError && (
              <p className="text-red-500 text-sm font-medium">
                Error posting comment.
              </p>
            )}
          </form>
        ) : (
          <p className="text-sm text-zinc-400 italic">
            You must be logged in to post a comment.
          </p>
        )}
        {/* comments display section */}
        <div className="space-y-5">
          {commentTree.map((comment, key) => {
            return <CommentItem comment={comment} key={key} postId={postId} />;
          })}
        </div>
      </div>
    </>
  );
};

export default CommentSection;
