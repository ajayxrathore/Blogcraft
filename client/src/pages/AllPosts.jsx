import React, { useState, useEffect } from "react";
import { Container, PostCard } from "../components";
import api from "../api/axios";

function AllPosts() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    getPosts();
  }, []);

  const getPosts = async () => {
    try {
      const response = await api.get("/blogs");
      if (response?.data?.blogs) {
        setPosts(response.data.blogs);
      }
    } catch (error) {
      console.error("Error fetching posts:", error.message);
    }
  };

  return (
    <main className="w-full bg-neutral-50/50 min-h-screen py-12 md:py-16 transition-colors duration-200">
      <Container>
        <div className="mb-10 max-w-xl">
          <h1 className="text-3xl font-extrabold tracking-tight text-neutral-900 sm:text-4xl">
            All Articles
          </h1>
          <p className="mt-2 text-sm text-neutral-500">
            Browse through our collection of blogs, technical tutorials, and
            creative thoughts.
          </p>
        </div>

        {posts && posts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {posts.map((post) => (
              <div key={post._id} className="h-full">
                <PostCard {...post} />
              </div>
            ))}
          </div>
        ) : (
          <div className="w-full max-w-md mx-auto text-center py-16 px-6 bg-white border border-neutral-100 rounded-2xl shadow-sm mt-8">
            <p className="text-base font-medium text-neutral-900">
              No Blogs found
            </p>
            <p className="text-sm text-neutral-500 mt-1">
              Be the first Blogger to create a brand new blog post.
            </p>
          </div>
        )}
      </Container>
    </main>
  );
}

export default AllPosts;
