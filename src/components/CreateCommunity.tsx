import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabase-client";
import { useAuth } from "../context/AuthContext";

interface CommunityInput {
  name: string;
  description: string;
  user_id: string;
}
const createCommunity = async (community: CommunityInput) => {
  const { error, data } = await supabase.from("communities").insert(community);
  if (error) throw new Error(error.message);
  return data;
};
const CreateCommunity = () => {
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const { user } = useAuth();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { mutate, isPending, isError } = useMutation({
    mutationFn: createCommunity,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["communities"] });
      navigate("/communities");
    },
  });
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      alert("Please sign in to create a community.");
      return;
    }
    mutate({ name, description, user_id: user.id });
  };
  return (
    <>
    <div className="h-[90vh] flex items-center">
  <form
        onSubmit={handleSubmit}
        className="max-w-2xl mx-auto p-8 space-y-6 bg-white/5 backdrop-blur rounded-2xl shadow-xl border border-white/10"
      >
        <h2
          className="text-4xl md:text-5xl font-extrabold text-center bg-gradient-to-r
      from-purple-400 to-pink-500 bg-clip-text text-transparent tracking-tight"
        >
          Create New Community
        </h2>

        <div className="space-y-2">
          <label
            htmlFor="name"
            className="block text-sm font-medium text-white/80"
          >
            Community Name
          </label>
          <input
            type="text"
            id="name"
            required
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-2 rounded-xl border border-white/10 bg-white/5 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
            placeholder="Enter a name for your community"
          />
        </div>

        <div className="space-y-2">
          <label
            htmlFor="desc"
            className="block text-sm font-medium text-white/80"
          >
            Description
          </label>
          <textarea
            rows={3}
            id="desc"
            required
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-4 py-2 rounded-xl border border-white/10 bg-white/5 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition resize-none"
            placeholder="What is this community about?"
          />
        </div>

        <button
          type="submit"
          disabled={isPending}
          className="cursor-pointer w-full py-3 text-lg font-semibold bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl shadow-md hover:opacity-90 transition active:scale-95 disabled:opacity-60"
        >
          {isPending ? "Creating..." : "Create Community"}
        </button>

        {isError && (
          <p className="text-red-400 text-sm text-center mt-2">
            Error creating community. Please try again.
          </p>
        )}
      </form>
    </div>
    
    </>
  );
};

export default CreateCommunity;
