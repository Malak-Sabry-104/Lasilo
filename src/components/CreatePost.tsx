import { useMutation } from "@tanstack/react-query";
import { useState, type ChangeEvent } from "react";
import { supabase } from "../supabase-client";
interface postInput {
  title: string;
  content: string;
}
const createPost = async (post: postInput, imageFile: File) => {
  const filePath = `${post.title}-${Date.now()}-${imageFile.name}`;
  const { error: uploadError } = await supabase.storage
    .from("post-images")
    .upload(filePath, imageFile);
  if (uploadError) throw new Error(uploadError.message);

  const { data: publicURLData } = supabase.storage
    .from("post-images")
    .getPublicUrl(filePath);

  const { data, error } = await supabase
    .from("posts")
    .insert({ ...post, "image-url": publicURLData });
  if (error) throw new Error(error.message);
  return data;
};

const CreatePost = () => {
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [selectedFile, setselectedFile] = useState<File | null>(null);
  const { mutate, isPending, isError } = useMutation({
    mutationFn: (data: { post: postInput; imageFile: File }) => {
      return createPost(data.post, data.imageFile);
    },
  });
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!selectedFile) return;
    mutate({ post: { title, content }, imageFile: selectedFile });
  };
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setselectedFile(e.target.files[0]);
    }
  };
  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="max-w-2xl mx-auto  p-8 bg-white/5 backdrop-blur-md rounded-2xl shadow-lg space-y-6"
      >
        {/* Title Input */}
        <div>
          <label
            htmlFor="title"
            className="block mb-2 text-white font-semibold"
          >
            Title
          </label>
          <input
            type="text"
            id="title"
            required
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            className="w-full px-4 py-2 rounded-lg border border-white/10 bg-white/5 text-white placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
            placeholder="Enter your post title..."
          />
        </div>

        {/* Content Textarea */}
        <div>
          <label
            htmlFor="content"
            className="block mb-2 text-white font-semibold"
          >
            Content
          </label>
          <textarea
            id="content"
            rows={5}
            required
            value={content}
            onChange={(event) => setContent(event.target.value)}
            className="w-full px-4 py-3 rounded-lg border border-white/10 bg-white/5 text-white placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
            placeholder="Write something amazing..."
          />
        </div>

        {/* File Upload */}
        <div>
          <label
            htmlFor="image"
            className="block mb-2 text-white font-semibold"
          >
            Upload Image
          </label>
          <input
            id="image"
            type="file"
            accept="image/*"
            required
            onChange={handleFileChange}
            className="block w-full text-white file:mr-4 
            file:py-2 file:px-4 file:rounded-lg file:border-0
             file:text-sm file:font-semibold
              file:bg-purple-500 file:text-white hover:file:bg-purple-600 transition"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="cursor-pointer w-full py-3
           bg-purple-500 hover:bg-purple-600 text-white font-semibold rounded-lg transition"
        >
          {isPending ? "Creating..." : "Create Post"}
        </button>

        {/* Error Message */}
        {isError && (
          <p className="text-red-500 text-center font-medium">
            Error creating post.
          </p>
        )}
      </form>
    </>
  );
};

export default CreatePost;
