import { type ChangeEvent, useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { supabase } from "../supabase-client";
import { useAuth } from "../context/AuthContext";
import { fetchCommunities, type Community } from "./CommunityList";

interface PostInput {
  title: string;
  content: string;
  avatar_url: string | null;
  community_id?: number | null;
}

const createPost = async (post: PostInput, imageFile: File) => {
  // sanitize filename
  const cleanFileName = imageFile.name.replace(/[^\w.\-]/g, "_");
  const cleanTitle = post.title.replace(/[^\w.\-]/g, "_");
  const filePath = `${cleanTitle}-${Date.now()}-${cleanFileName}`;

  const { error: uploadError } = await supabase.storage
    .from("post-images")
    .upload(filePath, imageFile);

  if (uploadError) throw new Error(uploadError.message);

  const { publicUrl } = supabase.storage
    .from("post-images")
    .getPublicUrl(filePath).data;

  const { data, error } = await supabase
    .from("posts")
    .insert({ ...post, image_url: publicUrl });

  if (error) throw new Error(error.message);

  return data;
};

const CreatePost = () => {
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [communityId, setCommunityId] = useState<number | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const { user } = useAuth();

  const { data: communities } = useQuery<Community[], Error>({
    queryKey: ["communities"],
    queryFn: fetchCommunities,
  });

  const { mutate, isPending } = useMutation({
    mutationFn: (data: { post: PostInput; imageFile: File }) =>
      createPost(data.post, data.imageFile),
    onSuccess: () => {
      setSuccessMessage("Post added successfully!");
      setErrorMessage(null);

      // clear form
      setTitle("");
      setContent("");
      setSelectedFile(null);
      setCommunityId(null);

      // hide success message after 2 seconds
      setTimeout(() => {
        setSuccessMessage(null);
      }, 2000);
    },
    onError: (error: Error) => {
      setErrorMessage(error.message);
      setSuccessMessage(null);
    },
  });

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!selectedFile) {
      setErrorMessage("Please select an image file.");
      return;
    }

    mutate({
      post: {
        title,
        content,
        avatar_url: user?.user_metadata.avatar_url || null,
        community_id: communityId,
      },
      imageFile: selectedFile,
    });
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleCommunityChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setCommunityId(value ? Number(value) : null);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-2xl mx-auto p-8 bg-white/5 backdrop-blur-md rounded-2xl shadow-lg space-y-6"
    >
      {/* Title */}
      <div>
        <label htmlFor="title" className="block mb-2 text-white font-semibold">
          Title
        </label>
        <input
          type="text"
          id="title"
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full px-4 py-2 rounded-lg border border-white/10 bg-white/5 text-white placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
          placeholder="Enter your post title..."
        />
      </div>

      {/* Content */}
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
          onChange={(e) => setContent(e.target.value)}
          className="w-full px-4 py-3 rounded-lg border border-white/10 bg-white/5 text-white placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
          placeholder="Write something amazing..."
        />
      </div>

  {/* Community */}
<div>
  <label
    htmlFor="community"
    className="block mb-2  font-semibold"
  >
    Select Community
  </label>
  <select
    id="community"
    value={communityId ?? ""}
    onChange={handleCommunityChange}
    className="
      w-full 
      px-4 py-2 
      rounded-lg 
      bg-black 
      border border-purple-600 
      text-purple-300 
      placeholder-purple-500
      focus:outline-none 
      focus:ring-2 
      focus:ring-purple-500 
      focus:border-purple-500 
      transition
      appearance-none
      cursor-pointer
    "
  >
    <option value="" className="text-purple-600 bg-black">
      Choose a community
    </option>
    {communities?.map((community) => (
      <option
        key={community.id}
        value={community.id}
        className="bg-black text-purple-300"
      >
        {community.name}
      </option>
    ))}
  </select>
</div>



      {/* Image Upload */}
      <div>
        <label htmlFor="image" className="block mb-2 text-white font-semibold">
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

      {/* Submit */}
      <button
        type="submit"
        className="cursor-pointer w-full py-3 bg-purple-500 hover:bg-purple-600 text-white font-semibold rounded-lg transition"
      >
        {isPending ? "Creating..." : "Create Post"}
      </button>

      {/* Success/Error Messages */}
      {successMessage && (
        <p className="text-green-500 text-center font-medium">
          {successMessage}
        </p>
      )}
      {errorMessage && (
        <p className="text-red-500 text-center font-medium">{errorMessage}</p>
      )}
    </form>
  );
};

export default CreatePost;
