import { useCallback, useEffect, useState } from "react";
import Layout from "../components/Layout";
import Loader from "../components/Loader";
import useFetch from "../hooks/fetchHook";

function Photos({ user }) {
  const { data: photos, loading, error, refetch } = useFetch("photos");

  // const [loading, setLoading] = useState(true);
  // const [photos, setPhotos] = useState([]);
  // const [error, setError] = useState(null);

  // const getPhotos = useCallback(async () => {
  //   setLoading(true);
  //   setError(null);

  //   try {
  //     const res = await fetch("https://jsonplaceholder.typicode.com/photos");

  //     if (!res.ok) {
  //       throw new Error("Failed to load photos");
  //     }

  //     const data = await res.json();
  //     setPhotos(data);
  //   } catch (err) {
  //     setError(err.message || "Something went wrong while loading photos.");
  //     setPhotos([]);
  //   } finally {
  //     setLoading(false);
  //   }
  // }, []);

  // useEffect(() => {
  //   const timeoutId = window.setTimeout(() => {
  //     getPhotos();
  //   }, 0);

  //   return () => window.clearTimeout(timeoutId);
  // }, [getPhotos]);

  return (
    <Layout user={user}>
      <div className="flex flex-col gap-8">
        <section className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-blue-600">
              Photo Gallery
            </p>
            <h1 className="mt-2 text-3xl font-bold text-gray-900">Photos</h1>
            <p className="mt-2 max-w-2xl text-gray-500">
              Browse photos from JSONPlaceholder with each object displayed as
              an image card.
            </p>
          </div>

          <span className="w-fit rounded-full bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700">
            {loading ? "Loading..." : `${photos.length} Photos`}

            <button onClick={refetch} className="mx-2 cursor-pointer">Refresh</button>
          </span>
        </section>

        {loading ? (
          <Loader label="Loading photos..." />
        ) : error ? (
          <div className="rounded-2xl border border-red-200 bg-white p-8 text-center shadow-sm">
            <h2 className="text-xl font-bold text-gray-900">
              Photos could not load
            </h2>
            <p className="mt-2 text-gray-500">{error}</p>
            <button
              type="button"
              onClick={refetch}
              className="mt-5 rounded-xl bg-blue-600 px-5 py-2.5 font-semibold text-white transition hover:bg-blue-700"
            >
              Try Again
            </button>
          </div>
        ) : photos.length === 0 ? (
          <div className="rounded-2xl border border-gray-200 bg-white p-10 text-center shadow-sm">
            <p className="text-gray-500">No photos found.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
            {photos.map((photo) => (
              <article
                key={photo.id}
                className="flex overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md"
              >
                <div className="flex w-full flex-col">
                  <img
                    src={photo.thumbnailUrl || photo.url}
                    alt={photo.title}
                    loading="lazy"
                    className="aspect-square w-full bg-gray-100 object-cover"
                  />

                  <div className="flex flex-1 flex-col p-5">
                    <div className="mb-4 flex items-center justify-between gap-3">
                      <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
                        Photo #{photo.id}
                      </span>
                      <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700">
                        Album {photo.albumId}
                      </span>
                    </div>

                    <h2 className="text-lg font-bold capitalize leading-snug text-gray-900">
                      {photo.title}
                    </h2>

                    <a
                      href={photo.url}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-5 block rounded-xl bg-blue-600 px-4 py-2.5 text-center text-sm font-semibold text-white transition hover:bg-blue-700"
                    >
                      View Full Photo
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
}

export default Photos;
