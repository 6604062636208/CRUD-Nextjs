"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import DeleteBtn from "./DeleteBtn";

export default function Home() {
  const [postData, setPostData] = useState([]);

  console.log(postData);

  const getPosts = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/posts", {
        method: "GET",
        cache: "no-store",
      });
      if (!res.ok) {
        throw new Error("Failed to fetch posts");
      }
      const data = await res.json();
      setPostData(data.posts);
    } catch (error) {
      console.log("Error loading posts: ", error);
    }
  };

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <main className="container mx-auto my-8 px-4 ml-20 mb-8">
      <h1 className="text-2xl font-semi mb-2">NextJS CRUD + MongoDB</h1>
      <hr className="text-2xl font-semi mb-2 border-gray-300" />
      <button className="mx-auto my-2 inline-block bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded">
        <Link href="/create">Create Post</Link>
      </button>
      <div className="ml-20 grid grid-cols-4 mt-3 gap-5">
        {postData && postData.length > 0 ? (
          postData.map((val) => (
            <div key={val._id} className="shadow-xl my-10 p-10 rounded-xl">
              <h4>{val.title}</h4>
              <Image src={val.img} width={300} height={0} alt={val.title} />
              <p>{val.content}</p>
              <div className="flex justify-between mt-5">
                <Link
                  href={`/edit/${val._id}`}
                  className="bg-gray-500 hover:bg-gray-600 text-white py-2 px-3 rounded"
                >
                  Edit
                </Link>
                <DeleteBtn id={val._id} />
              </div>
            </div>
          ))
        ) : (
          <p className="bg-gray-300 p-3 my-3">
            No posts available. Please create a post.
          </p>
        )}
      </div>
    </main>
  );
}
