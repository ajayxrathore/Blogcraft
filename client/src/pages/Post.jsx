import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../api/axios";
import { Button, Container } from "../components";
import { useSelector } from "react-redux";

export default function Post() {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  const { blogId } = useParams();
  const navigate = useNavigate();

  const userData = useSelector((state) => state.auth.userData);

  const isAuthor = React.useMemo(() => {
    if (!post || !userData) return false;

    const loggedInUserId = String(userData.user?._id || userData._id || "");

    const postAuthorId = String(post.author?._id || post.author || "");

    return (
      loggedInUserId !== "" &&
      postAuthorId !== "" &&
      loggedInUserId === postAuthorId
    );
  }, [post, userData]);

  useEffect(() => {
    if (blogId) {
      api
        .get(`/blogs/${blogId}`)
        .then((response) => {
          if (response.data?.blog) {
            setPost(response.data.blog);
          } else {
            navigate("/");
          }
        })
        .catch((error) => {
          console.error(
            "Error fetching individual blog details:",
            error.message,
          );
          navigate("/");
        })
        .finally(() => setLoading(false));
    } else {
      navigate("/");
    }
  }, [blogId, navigate]);

  const deletePost = async () => {
    if (window.confirm("Are you sure you want to delete this blog post?")) {
      try {
        await api.delete(`/blogs/${blogId}`);
        navigate("/");
      } catch (error) {
        console.error(
          "Failed to delete the post:",
          error.response?.data?.message || error.message,
        );
        alert("Could not delete the post. Check authorization permissions.");
      }
    }
  };

  if (loading) {
    return (
      <div className="w-full min-h-[50vh] flex flex-col items-center justify-center text-neutral-400 animate-pulse">
        <Container>
          <p className="text-sm font-medium tracking-wide uppercase">
            Gathering articles ...
          </p>
        </Container>
      </div>
    );
  }

  return post ? (
    <article className="w-full bg-white pb-24 transition-colors duration-200">
      <div className="w-full bg-neutral-50 border-b border-neutral-100 mb-10 md:mb-14">
        <Container>
          <div className="relative max-w-5xl mx-auto pt-6 pb-2">
            <div className="w-full aspect-21/9 overflow-hidden rounded-2xl bg-neutral-100 shadow-sm border border-neutral-200/60">
              <img
                src={post.image}
                alt={post.title}
                className="object-cover w-full h-full object-center"
              />
            </div>

            {isAuthor && (
              <div className="absolute right-6 top-12 md:top-10">
                <Button
                  bgColor="bg-red-600 hover:bg-red-700 shadow-md ring-2 ring-white/20"
                  onClick={deletePost}
                  className="px-4 py-2 text-xs uppercase tracking-wider font-bold"
                >
                  Delete
                </Button>
              </div>
            )}
          </div>
        </Container>
      </div>

      <Container>
        <div className="max-w-3xl mx-auto px-2">
          <header className="mb-10 pb-6 border-b border-neutral-100">
            <h1 className="text-3xl font-black tracking-tight text-neutral-900 sm:text-4xl md:text-5xl leading-tight mb-4">
              {post.title}
            </h1>

            {post.author && (
              <div className="flex items-center gap-3">
                <div className="h-8 w-8 rounded-full bg-neutral-900 flex items-center justify-center text-white text-xs font-bold uppercase tracking-wider">
                  {(post.author.name || "A").charAt(0)}
                </div>
                <div className="text-xs">
                  <p className="font-semibold text-neutral-900">
                    {post.author.name || "Anonymous User"}
                  </p>
                  <p className="text-neutral-400">Contributor</p>
                </div>
              </div>
            )}
          </header>

          <div className="w-full text-neutral-800 text-base md:text-lg leading-relaxed whitespace-pre-wrap tracking-normal font-normal selection:bg-neutral-900 selection:text-white">
            {post.content}
          </div>
        </div>
      </Container>
    </article>
  ) : null;
}
