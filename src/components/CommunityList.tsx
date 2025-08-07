import { useQuery } from "@tanstack/react-query";
import { supabase } from "../supabase-client";
import { Link } from "react-router-dom";

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

export const CommunityList = () => {
  const { data, error, isLoading } = useQuery<Community[], Error>({
    queryKey: ["communities"],
    queryFn: fetchCommunities,
  });

  if (isLoading) {
    return <p className="text-center text-gray-400 mt-20">Loading Communities...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500 mt-20">Error: {error.message}</p>;
  }

  return (
    <section className="max-w-6xl mx-auto px-6 pt-7 pb-12">
    
      <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {data?.map((community) => (
          <Link
            key={community.id}
            to={`/community/${community.id}`}
            className="group block bg-gray-900 border border-gray-700 rounded-3xl p-6 shadow-lg
              hover:border-purple-500 hover:shadow-purple-700/50
              transition-transform transform hover:-translate-y-2 cursor-pointer"
          >
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
        ))}
      </div>
    </section>
  );
};
