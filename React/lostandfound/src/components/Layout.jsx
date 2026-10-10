import Navbar from "./navbar";

function Layout({ user, children }) {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 transition-colors duration-200">
      <Navbar user={user} />
      <main className="max-w-6xl mx-auto px-4 py-8">{children}</main>
    </div>
  );
}

export default Layout;
