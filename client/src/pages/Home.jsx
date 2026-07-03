import React, { useState, useEffect } from "react";
import { Container, PostCard } from "../components";
import api from "../api/axios";

function Home() {
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
    <main className="w-full bg-neutral-50/50 min-h-screen transition-colors duration-200">
      <section className="bg-white border-b border-neutral-100 py-16 md:py-24 mb-12">
        <Container>
          <div className="max-w-3xl">
            <h1 className="text-4xl font-black tracking-tight text-neutral-900 sm:text-5xl lg:text-6xl leading-tight">
              Perspective, insights, and stories that matter.
            </h1>
            <p className="mt-4 text-base md:text-lg text-neutral-500 leading-relaxed max-w-xl">
              Welcome to our reading space. Dive into curated thoughts on
              technology, engineering, culture, and creative lifestyle design.
            </p>
          </div>
        </Container>
      </section>

      <section className="pb-16">
        <Container>
          <div className="flex items-center justify-between mb-8 pb-4 border-b border-neutral-200">
            <h2 className="text-xs font-bold uppercase tracking-widest text-neutral-400">
              Latest Articles
            </h2>
            {posts && posts.length > 0 && (
              <span className="text-xs font-semibold text-neutral-500 bg-neutral-100 px-2.5 py-1 rounded-full">
                {posts.length} {posts.length === 1 ? "Article" : "Articles"}
              </span>
            )}
          </div>

          {posts && posts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {posts.map((post) => (
                <div key={post._id} className="h-full">
                  <PostCard {...post} />
                </div>
              ))}
            </div>
          ) : (
            <div className="w-full max-w-md mx-auto text-center py-16 px-6 bg-white border border-neutral-100 rounded-2xl shadow-sm mt-8">
              <p className="text-base font-medium text-neutral-900">
                Your reading feed is empty
              </p>
              <p className="text-sm text-neutral-500 mt-1">
                No blogs are online yet. Be the first to publish one.
              </p>
            </div>
          )}
        </Container>
      </section>
    </main>
  );
}

export default Home;
