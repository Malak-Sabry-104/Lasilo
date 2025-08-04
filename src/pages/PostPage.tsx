import { useParams } from "react-router";
import PostDetail from "../components/PostDetail";

const PostPage = () => {
  const {id}=useParams<{id:string}>()
  return (
    <PostDetail postId={Number(id)}/>
  );
};

export default PostPage;
 