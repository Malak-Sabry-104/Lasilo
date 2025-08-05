import { useState } from "react";
import type { Comment } from "./CommentSection";
import { useAuth } from "../context/AuthContext";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "../supabase-client";

interface Props {
  comment: Comment & {
    children?: Comment[];
  };
  postId: number;
}

const createReply = async (
  replyContent: string,
  postId: number,
  parentCommentId: number,
  userId?: string,
  author?: string
) => {
  if (!userId || !author) {
    throw new Error("You must be logged in to reply.");
  }
  const { error } = await supabase.from("comments").insert({
    post_id: postId,
    content: replyContent,
    parent_comment_id: parentCommentId,
    user_id: userId,
    author: author,
  });
  if (error) throw new Error(error.message);
};

const CommentItem = ({ comment, postId }: Props) => {
  const [showReply, setShowReply] = useState(false);
  const [replyText, setReplyText] = useState("");
  const [isCollapsed, setIsCollapsed] = useState(false);
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const { mutate, isPending, isError } = useMutation({
    mutationFn: (replyContent: string) =>
      createReply(
        replyContent,
        postId,
        comment.id,
        user?.id,
        user?.user_metadata?.user_name
      ),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["comments", postId] });
      setReplyText("");
      setShowReply(false);
    },
  });

  const handleReplySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyText) return;
    mutate(replyText);
  };

  return (
    <div className="pl-6 border-l-2 border-white/10">
      <div className="mb-4 space-y-2">
        {/* Comment Header */}
        <div className="flex items-center gap-3">
          <span className="text-sm font-semibold text-blue-400">
            {comment.author}
          </span>
          <span className="text-xs text-gray-500">
            {new Date(comment.created_at).toLocaleString()}
          </span>
        </div>

        {/* Comment Body */}
        <p className="text-gray-300 leading-relaxed">{comment.content}</p>

        {/* Reply Toggle Button */}
        <button
          onClick={() => setShowReply((prev) => !prev)}
          className="cursor-pointer text-sm text-purple-400 hover:underline transition"
        >
          {showReply ? "Cancel" : "Reply"}
        </button>
      </div>

      {/* Reply Form */}
      {showReply && user && (
        <form onSubmit={handleReplySubmit} className="space-y-2 mb-4">
          <textarea
            value={replyText}
            rows={3}
            onChange={(e) => setReplyText(e.target.value)}
            placeholder="Write a reply..."
            className="w-full p-3 rounded-lg bg-zinc-800 text-white placeholder-gray-400 
            focus:outline-none focus:ring-2 focus:ring-purple-500 border border-zinc-700 resize-none"
          />
          <div className="flex items-center gap-2">
            <button
              type="submit"
              disabled={!replyText || isPending}
              className={`cursor-pointer px-4 py-2 rounded-md text-sm font-medium transition
                ${
                  replyText
                    ? "bg-purple-600 hover:bg-purple-700 text-white"
                    : "bg-zinc-700 text-zinc-400 cursor-not-allowed"
                }`}
            >
              {isPending ? "Replying..." : "Post Reply"}
            </button>

            {isError && (
              <p className="text-sm text-red-500 font-medium">
                Error posting reply.
              </p>
            )}
          </div>
        </form>
      )}

      {/* Nested Replies */}
      {comment.children && comment.children.length > 0 && (
        <div className="mt-2 space-y-2">
          <button
            onClick={() => setIsCollapsed((prev) => !prev)}
            title={isCollapsed ? "Show Replies" : "Hide Replies"}
            className="text-sm text-gray-400 hover:text-white flex items-center gap-1"
          >
            {isCollapsed ? "Show Replies" : "Hide Replies"}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-4 h-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d={
                  isCollapsed
                    ? "M5 15l7-7 7 7" // Down arrow
                    : "M19 9l-7 7-7-7" // Up arrow
                }
              />
            </svg>
          </button>

          {!isCollapsed && (
            <div className="space-y-2">
              {comment.children.map((child) => (
                <CommentItem key={child.id} comment={child} postId={postId} />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CommentItem;
