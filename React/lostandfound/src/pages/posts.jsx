import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import Loader from "../components/Loader";
import useFetch from "../hooks/fetchHook";

function Post({ user }) {

    const {data : posts , loading , error , refetch} = useFetch("posts")
//   const [loading, setLoading] = useState(true);
//   const [posts, setPosts] = useState([]);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     getPosts();
//   }, []);

//   const getPosts = async () => {
//     setLoading(true);
//     setError(null);

//     try {
//       const res = await fetch("https://jsonplaceholder.typicode.com/posts");

//       if (!res.ok) {
//         throw new Error("Failed to load posts");
//       }

//       const data = await res.json();
//       setPosts(data);
//     } catch (err) {
//       setError(err.message || "Something went wrong while loading posts.");
//       setPosts([]);
//     } finally {
//       setLoading(false);
//     }
//   };

  return (
    <Layout user={user}>
      <div className="flex flex-col gap-8">
        <section className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-blue-600">
              Community Updates
            </p>
            <h1 className="mt-2 text-3xl font-bold text-gray-900">Posts</h1>
            <p className="mt-2 max-w-2xl text-gray-500">
              Browse posts from JSONPlaceholder with each object displayed as a readable card.
            </p>
          </div>

          <span className="w-fit rounded-full bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700">
            {loading ? "Loading..." : `${posts.length} Posts`}
          </span>
        </section>

        {loading ? (
          <Loader label="Loading posts..." />
        ) : error ? (
          <div className="rounded-2xl border border-red-200 bg-white p-8 text-center shadow-sm">
            <h2 className="text-xl font-bold text-gray-900">Posts could not load</h2>
            <p className="mt-2 text-gray-500">{error}</p>
            <button
              type="button"
              onClick={refetch}
              className="mt-5 rounded-xl bg-blue-600 px-5 py-2.5 font-semibold text-white transition hover:bg-blue-700"
            >
              Try Again
            </button>
          </div>
        ) : posts.length === 0 ? (
          <div className="rounded-2xl border border-gray-200 bg-white p-10 text-center shadow-sm">
            <p className="text-gray-500">No posts found.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <article
                key={post.id}
                className="flex min-h-72 flex-col rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
              >
                <div className="mb-4 flex items-center justify-between gap-3">
                  <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
                    Post #{post.id}
                  </span>
                  <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700">
                    User {post.userId}
                  </span>
                </div>

                <h2 className="text-lg font-bold capitalize leading-snug text-gray-900">
                  {post.title}
                </h2>
                <p className="mt-4 flex-1 whitespace-pre-line text-sm leading-6 text-gray-500">
                  {post.body}
                </p>
              </article>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
}

export default Post;
