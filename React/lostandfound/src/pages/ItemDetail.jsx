import { doc, getDoc, updateDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import CommentsSection from "../components/CommentsSection";
import Layout from "../components/Layout";
import Loader from "../components/Loader";
import { auth, itemsRef } from "../utils/firebase";

function ItemDetail({ user }) {
  const { id, } = useParams();
  const navigate = useNavigate();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [marking, setMarking] = useState(false);

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const snapshot = await getDoc(doc(itemsRef, id));
        if (snapshot.exists()) {
          setItem({ ...snapshot.data(), id: snapshot.id });
        }
      } catch (error) {
        console.error("Failed to fetch item:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchItem();
  }, [id]);

  const handleMarkFound = async () => {
    if (!user) return navigate("/auth");

    setMarking(true);
    try {
      const itemRef = doc(itemsRef, id);
      await updateDoc(itemRef, {
        isFound: true,
        foundBy: auth.currentUser?.email,
      });

      setItem((prev) => ({
        ...prev,
        isFound: true,
        foundBy: auth.currentUser?.email,
      }));
    } catch (error) {
      console.error("Failed to mark item as found:", error);
    } finally {
      setMarking(false);
    }
  };

  if (loading) {
    return (
      <Layout user={user}>
        <Loader label="Loading item..." />
      </Layout>
    );
  }

  if (!item) {
    return (
      <Layout user={user}>
        <div className="bg-white border border-gray-200 rounded-2xl p-10 text-center">
          <p className="text-gray-500 mb-4">Item not found.</p>
          <Link to="/" className="text-blue-600 hover:text-blue-700 font-medium">
            Back to Home
          </Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout user={user}>
      <Link
        to="/"
        className="inline-flex items-center text-gray-500 hover:text-gray-700 text-sm font-medium mb-6"
      >
        ← Back to Lost Items
      </Link>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mb-6">
        <div className="flex items-start justify-between gap-4 mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{item.itemName}</h1>
            <p className="text-gray-500 mt-2">{item.itemDesc}</p>
          </div>

          {item.isFound ? (
            <span className="shrink-0 bg-green-100 text-green-700 text-sm font-semibold px-4 py-1.5 rounded-full">
              Found
            </span>
          ) : (
            <span className="shrink-0 bg-red-100 text-red-700 text-sm font-semibold px-4 py-1.5 rounded-full">
              Lost
            </span>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <DetailRow label="Reported By" value={item.userEmail} />
          <DetailRow label="Place" value={item.lostPlace} />
          <DetailRow label="Date" value={item.lostDate} />
          <DetailRow label="Time" value={item.lostTime} />
          <DetailRow label="Price" value={`Rs. ${item.itemPrice}`} />
          {item.isFound && <DetailRow label="Found By" value={item.foundBy} />}
        </div>

        <div className="mt-6">
          {item.isFound ? (
            <button
              disabled
              className="w-full bg-gray-100 text-gray-500 font-semibold py-3 rounded-xl cursor-not-allowed"
            >
              Item Found By {item.foundBy}
            </button>
          ) : (
            <button
              onClick={handleMarkFound}
              disabled={marking}
              className="w-full bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white font-semibold py-3 rounded-xl transition flex items-center justify-center gap-2"
            >
              {marking ? (
                <>
                  <Loader size="sm" inline />
                  Marking...
                </>
              ) : (
                "Mark as Found"
              )}
            </button>
          )}
        </div>
      </div>

      <CommentsSection itemId={id} user={user} />
    </Layout>
  );
}

function DetailRow({ label, value }) {
  return (
    <div className="flex justify-between text-sm bg-gray-50 rounded-xl px-4 py-3">
      <span className="text-gray-500">{label}</span>
      <span className="font-medium text-gray-800">{value}</span>
    </div>
  );
}

export default ItemDetail;
