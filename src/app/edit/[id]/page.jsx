"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

function EditPostPage({ params }) {
  const { id } = React.use(params);

  const [postData, setPostData] = useState("");

  //New Data of Post
  const [newTitle, setNewTitle] = useState("");
  const [newImg, setNewImg] = useState("");
  const [newContent, setNewContent] = useState("");
  const router = useRouter();

  const getPostById = async (id) => {
    try {
      const res = await fetch(`http://localhost:3000/api/posts/${id}`, {
        method: "GET",
        cache: "no-store",
      });

      if (!res.ok) {
        throw new Error("Failed to fetch post");
      }
      const data = await res.json();
      console.log("edit post: ", data);
      setPostData(data.post);
    } catch (error) {
      console.log("Error loading post: ", error);
    }
  };

  useEffect(() => {
    if (id) {
      getPostById(id);
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`http://localhost:3000/api/posts/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ newTitle, newImg, newContent }),
      });
      if (!res.ok) {
        throw new Error("Failed to update post");
      }

      router.refresh();
      router.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container mx-auto py-10 ml-30">
      <h3 className="text-3xl font-bold">Edit Post</h3>
      <hr className="my-3" />
      <Link
        href="/"
        className="bg-gray-500 inline-block text-white border py-2 px-3 rounded my-2"
      >
        Go Back
      </Link>
      <form onSubmit={handleSubmit}>
        <input
          onChange={(e) => setNewTitle(e.target.value)}
          type="text"
          className="w-[300px] block bg-gray-200 border py-2 px-3 rounded text-lg my-2"
          placeholder={postData.title}
        />
        <input
          onChange={(e) => setNewImg(e.target.value)}
          type="text"
          className="w-[300px] block bg-gray-200 border py-2 px-3 rounded text-lg my-2"
          placeholder={postData.img}
        />
        <textarea
          onChange={(e) => setNewContent(e.target.value)}
          name=""
          id=""
          cols="30"
          rows="10"
          className="w-[300px] block bg-gray-200 border py-2 px-3 rounded text-lg my-2"
          placeholder={postData.content}
        ></textarea>
        <button
          type="submit"
          className="bg-green-500 text-white border py-2 px-3 rounded text-lg my-2"
        >
          Edit Post
        </button>
      </form>
    </div>
  );
}

export default EditPostPage;
