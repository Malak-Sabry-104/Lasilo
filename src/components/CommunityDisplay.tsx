import { useQuery } from "@tanstack/react-query";
import type { Post } from "./PostList";
import { supabase } from "../supabase-client";
import PostItem from "./PostItem";

interface Props {
  communityId: number;
}
interface PostWithCommunity extends Post {
  communities: {
    name: string;
  };
}
export const fetchCommunityPost = async (
  communityId: number
): Promise<PostWithCommunity[]> => {
  // First get posts with community information
  const { data, error } = await supabase
    .from("posts")
    .select("*,communities(name)")
    .eq("community_id", communityId)
    .order("created_at", { ascending: false });
    
  if (error) throw new Error(error.message);
  
  if (!data || data.length === 0) return [] as PostWithCommunity[];
  
  // Get post IDs to fetch counts
  const postIds = data.map(post => post.id);
  
  // Fetch likes for these posts
  const { data: likesData, error: likesError } = await supabase
    .from("votes")
    .select("post_id, vote")
    .in("post_id", postIds);
    
  if (likesError) throw new Error(likesError.message);
  
  // Fetch comments for these posts
  const { data: commentsData, error: commentsError } = await supabase
    .from("comments")
    .select("post_id")
    .in("post_id", postIds);
    
  if (commentsError) throw new Error(commentsError.message);
  
  // Count likes and comments for each post
  const mergedPosts = data.map(post => {
    // Count likes (votes with value 1)
    const postLikes = likesData?.filter(like => like.post_id === post.id && like.vote === 1) || [];
    const likeCount = postLikes.length;
    
    // Count comments
    const postComments = commentsData?.filter(comment => comment.post_id === post.id) || [];
    const commentCount = postComments.length;
    
    return {
      ...post,
      like_count: likeCount,
      comment_count: commentCount
    };
  });
  
  return mergedPosts as PostWithCommunity[];
};

export const CommunityDisplay = ({ communityId }: Props) => {
  const { data, error, isLoading } = useQuery<Post[], Error>({
    queryKey: ["communityPost", communityId],
    queryFn: () => fetchCommunityPost(communityId),
  });

  if (isLoading) {
    return <p>Loading Communities...</p>;
  }
  if (error) {
    return <p>Error:{error.message}</p>;
  }

  return (
    <>
      <div>
        <h2
          className="text-4xl font-extrabold text-center
             mb-8 bg-gradient-to-r from-purple-400 to-pink-500 
             text-transparent bg-clip-text md:text-5xl tracking-tight"
        >
          {data && data.length > 0 ? data[0].communities.name : "Community"} Posts
        </h2>
        {data && data.length > 0 ? (
          <div className="flex flex-wrap gap-6 justify-center">
            {data.map((post) => (  
              <PostItem key={post.id} post={post} />
            ))}
          </div>
        ) : (
          <p className="text-gray-400 text-center">No Posts in this Community yet.</p>
        )}
      </div>
    </>
  );
};
