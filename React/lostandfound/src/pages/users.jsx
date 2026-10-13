import { useCallback, useEffect, useState } from "react";
import Layout from "../components/Layout";
import Loader from "../components/Loader";
import useFetch from "../hooks/fetchHook";

function Users({ user }) {
    const {data : users , loading , error , refetch} = useFetch("users")

  // const [loading, setLoading] = useState(true);
  // const [users, setUsers] = useState([]);
  // const [error, setError] = useState(null);

  // const getUsers = useCallback(async () => {
  //   setLoading(true);
  //   setError(null);

  //   try {
  //     const res = await fetch("https://jsonplaceholder.typicode.com/users");

  //     if (!res.ok) {
  //       throw new Error("Failed to load users");
  //     }

  //     const data = await res.json();
  //     setUsers(data);
  //   } catch (err) {
  //     setError(err.message || "Something went wrong while loading users.");
  //     setUsers([]);
  //   } finally {
  //     setLoading(false);
  //   }
  // }, []);

  // useEffect(() => {
  //   const timeoutId = window.setTimeout(() => {
  //     getUsers();
  //   }, 0);

  //   return () => window.clearTimeout(timeoutId);
  // }, [getUsers]);

  return (
    <Layout user={user}>
      <div className="flex flex-col gap-8">
        <section className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-blue-600">
              User Directory
            </p>
            <h1 className="mt-2 text-3xl font-bold text-gray-900">Users</h1>
            <p className="mt-2 max-w-2xl text-gray-500">
              Browse user profiles from JSONPlaceholder with contact, address, and company details.
            </p>
          </div>

          <span className="w-fit rounded-full bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700">
            {loading ? "Loading..." : `${users.length} Users`}
          </span>
        </section>

        {loading ? (
          <Loader label="Loading users..." />
        ) : error ? (
          <div className="rounded-2xl border border-red-200 bg-white p-8 text-center shadow-sm">
            <h2 className="text-xl font-bold text-gray-900">Users could not load</h2>
            <p className="mt-2 text-gray-500">{error}</p>
            <button
              type="button"
              onClick={refetch}
              className="mt-5 rounded-xl bg-blue-600 px-5 py-2.5 font-semibold text-white transition hover:bg-blue-700"
            >
              Try Again
            </button>
          </div>
        ) : users.length === 0 ? (
          <div className="rounded-2xl border border-gray-200 bg-white p-10 text-center shadow-sm">
            <p className="text-gray-500">No users found.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
            {users.map((person) => (
              <article
                key={person.id}
                className="flex min-h-96 flex-col rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
              >
                <div className="mb-4 flex items-center justify-between gap-3">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-blue-50 text-lg font-bold text-blue-700">
                    {getInitials(person.name)}
                  </div>
                  <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700">
                    User #{person.id}
                  </span>
                </div>

                <h2 className="text-xl font-bold leading-snug text-gray-900">{person.name}</h2>
                <p className="mt-1 text-sm font-medium text-blue-600">@{person.username}</p>

                <div className="mt-5 space-y-3 text-sm">
                  <InfoRow label="Email" value={person.email} href={`mailto:${person.email}`} />
                  <InfoRow label="Phone" value={person.phone} href={`tel:${person.phone}`} />
                  <InfoRow
                    label="Website"
                    value={person.website}
                    href={getWebsiteUrl(person.website)}
                  />
                </div>

                <div className="mt-5 border-t border-gray-200 pt-5">
                  <h3 className="text-sm font-bold uppercase tracking-wide text-gray-900">
                    Address
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-gray-500">
                    {person.address.street}, {person.address.suite}
                    <br />
                    {person.address.city}, {person.address.zipcode}
                    <br />
                    Lat {person.address.geo.lat}, Lng {person.address.geo.lng}
                  </p>
                </div>

                <div className="mt-5 flex-1 border-t border-gray-200 pt-5">
                  <h3 className="text-sm font-bold uppercase tracking-wide text-gray-900">
                    Company
                  </h3>
                  <p className="mt-2 font-semibold text-gray-900">{person.company.name}</p>
                  <p className="mt-1 text-sm leading-6 text-gray-500">
                    {person.company.catchPhrase}
                    <br />
                    {person.company.bs}
                  </p>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
}

function InfoRow({ label, value, href }) {
  return (
    <div className="flex flex-col gap-1 border-t border-gray-100 pt-3 first:border-t-0 first:pt-0">
      <span className="text-xs font-semibold uppercase tracking-wide text-gray-500">{label}</span>
      {href ? (
        <a
          href={href}
          target={href.startsWith("http") ? "_blank" : undefined}
          rel={href.startsWith("http") ? "noreferrer" : undefined}
          className="break-words font-medium text-gray-900 hover:text-blue-600"
        >
          {value}
        </a>
      ) : (
        <span className="break-words font-medium text-gray-900">{value}</span>
      )}
    </div>
  );
}

function getInitials(name = "") {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

function getWebsiteUrl(website = "") {
  if (!website) return "";
  return website.startsWith("http") ? website : `https://${website}`;
}

export default Users;
