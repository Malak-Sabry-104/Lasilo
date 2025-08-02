import CreatePost from "../components/CreatePost";

const CreatePostPage = () => {
  return (
    <>
      <div >
      <h2 className="text-3xl font-bold text-center text-white mb-4">
          Create a New Post
        </h2>
        <CreatePost />
      </div>
    </>
  );
};

export default CreatePostPage;
