import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "../supabase-client";
import { Link } from "react-router-dom";
import { useState } from "react";

export interface Community {
  id: number;
  name: string;
  description: string;
  created_at: string;
}

export const fetchCommunities = async (): Promise<Community[]> => {
  const { data, error } = await supabase
    .from("communities")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw new Error(error.message);
  return data as Community[];
};

export const deleteCommunity = async (id: number) => {
  const { error, data } = await supabase.from("communities").delete().eq("id", id);
  if (error) {
    console.error("Supabase delete error:", error);
    throw new Error(error.message);
  }
  return data;
};

export const CommunityList = () => {
  const queryClient = useQueryClient();
  const [showSuccess, setShowSuccess] = useState(false);
  const [showConfirmId, setShowConfirmId] = useState<number | null>(null);

  const { data, error, isLoading } = useQuery<Community[], Error>({
    queryKey: ["communities"],
    queryFn: fetchCommunities,
  });

  const mutation = useMutation({
    mutationFn: deleteCommunity,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["communities"] });
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 2000);
    },
  });

  const handleDeleteConfirm = (id: number) => {
    mutation.mutate(id);
    setShowConfirmId(null);
  };

  if (isLoading) {
    return <p className="text-center text-gray-400 mt-20">Loading Communities...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500 mt-20">Error: {error.message}</p>;
  }

  return (
    <section className="max-w-6xl mx-auto px-6 pt-7 pb-12">

      {/* ✅ Success message */}
      {showSuccess && (
        <div className="bg-green-700 text-white text-center py-2 px-4 mb-6 rounded-lg shadow-lg">
          Community deleted successfully!
        </div>
      )}

      {/* 🟡 Deletion pending message */}
      {mutation.isPending && (
        <p className="text-yellow-500 text-center mb-4">Deleting...</p>
      )}

      {/* 🔴 Deletion error */}
      {mutation.isError && (
        <p className="text-red-500 text-center mb-4">Error: {mutation.error?.message}</p>
      )}

      <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {data?.map((community) => (
          <div
            key={community.id}
            className="group bg-gray-900 border border-gray-700 rounded-3xl p-6 shadow-lg
              hover:border-purple-500 hover:shadow-purple-700/50
              transition-transform transform hover:-translate-y-2"
          >
            <Link to={`/community/${community.id}`} className="block">
              <h2 className="text-2xl font-semibold text-purple-400 mb-3 group-hover:underline transition">
                {community.name}
              </h2>
              <p className="text-gray-300 text-base leading-relaxed line-clamp-4">
                {community.description}
              </p>
              <p className="mt-6 text-sm text-gray-500 italic tracking-wide select-none">
                Created on {new Date(community.created_at).toLocaleDateString()}
              </p>
            </Link>

            {/* 🧨 Delete Button */}
            <button
              onClick={() => setShowConfirmId(community.id)}
              className="mt-4 text-sm text-red-400 hover:text-red-600 transition"
            >
              Delete
            </button>

            {/* 🧾 Confirmation UI */}
            {showConfirmId === community.id && (
              <div className="mt-3 bg-red-900 border border-red-700 rounded-lg p-4 text-white text-sm">
                <p>Are you sure you want to delete this community?</p>
                <div className="mt-2 flex gap-4">
                  <button
                    onClick={() => handleDeleteConfirm(community.id)}
                    className="bg-red-600 px-3 py-1 rounded hover:bg-red-700 transition"
                  >
                    Yes, Delete
                  </button>
                  <button
                    onClick={() => setShowConfirmId(null)}
                    className="text-gray-300 hover:underline"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};
