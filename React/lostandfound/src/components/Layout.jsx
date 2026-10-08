import Navbar from "./navbar";

function Layout({ user, children }) {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar user={user} />
      <main className="max-w-6xl mx-auto px-4 py-8">{children}</main>
    </div>
  );
}

export default Layout;
