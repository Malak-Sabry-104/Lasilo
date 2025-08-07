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
    return <p>Loading Communities...</p>;
  }
  if (error) {
    return <p>Error:{error.message}</p>;
  }

  return (
    <>
      <section className="max-w-5xl mx-auto px-4 py-10">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {data?.map((community) => (
            <Link
              key={community.id}
              to={`/community/${community.id}`}
              className="block bg-white/5 border border-white/10 rounded-2xl p-6 transition transform hover:-translate-y-1 hover:shadow-lg hover:border-purple-500"
            >
              <h2 className="text-xl font-semibold text-purple-400 mb-2 hover:underline">
                {community.name}
              </h2>
              <p className="text-white/80 text-sm">{community.description}</p>
              <p className="text-xs text-gray-500 mt-4">
                Created at:{" "}
                {new Date(community.created_at).toLocaleDateString()}
              </p>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
};
