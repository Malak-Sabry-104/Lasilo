import { useQuery } from "@tanstack/react-query";
import { supabase } from "../supabase-client";
const fetchPosts = async (): Promise<Post[]> => {
  const { data, error } = await supabase
    .from("posts")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw new Error(error.message);
  return data as Post[];
};
interface Post {}
const PostList = () => {
  const { data, error, isLoading } = useQuery<Post[], Error>({
    queryKey: ["posts"],
    queryFn: fetchPosts,
  });
  if (isLoading) return <div>Loading Posts...</div>;
  if (error) {
    return <div>Error: {error.message}</div>;
  }
  console.log(data);

  return (
    <div>
      <img src={data[0].image_url} alt="blah" />
    </div>
  );
};

export default PostList;
