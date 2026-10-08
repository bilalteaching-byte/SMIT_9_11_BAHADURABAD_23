import { addDoc, getDocs, serverTimestamp } from "firebase/firestore";
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router";
import ItemCard from "../components/ItemCard";
import ItemFilters from "../components/ItemFilters";
import Layout from "../components/Layout";
import Loader from "../components/Loader";
import { auth, itemsRef } from "../utils/firebase";

function Items({ user }) {
  const navigate = useNavigate();
  const [allItems, setAllItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortBy, setSortBy] = useState("newest");
  const [search, setSearch] = useState("");

  const handleAddItem = async (event) => {
    event.preventDefault();
    setSubmitting(true);

    try {
      const item = {
        userEmail: auth.currentUser?.email,
        userUid: auth.currentUser?.uid,
        itemName: event.target[0].value,
        itemDesc: event.target[1].value,
        lostPlace: event.target[2].value,
        lostDate: event.target[3].value,
        lostTime: event.target[4].value,
        itemPrice: event.target[5].value,
        isFound: false,
        createdAt: serverTimestamp(),
      };

      await addDoc(itemsRef, item);
      event.target.reset();
      await getAllItems();
    } catch (error) {
      console.error("Failed to add item:", error);
    } finally {
      setSubmitting(false);
    }
  };

  const getAllItems = async () => {
    try {
      const snapshot = await getDocs(itemsRef);

      const items = snapshot.docs.map((document) => ({
        ...document.data(),
        id: document.id,
      }));

      setAllItems(items);
    } catch (error) {
      console.error("Failed to get items:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllItems();
  }, []);

  const getPostedDate = (item) => {
    if (item.createdAt?.toDate) return item.createdAt.toDate();
    if (item.createdAt) return new Date(item.createdAt);
    return item.lostDate ? new Date(item.lostDate) : new Date(0);
  };

  const getLostDateTime = (item) => {
    const date = item.lostDate || "";
    const time = item.lostTime || "00:00";
    return new Date(`${date}T${time}`);
  };

  const filteredItems = useMemo(() => {
    let result = [...allItems];

    if (statusFilter === "lost") {
      result = result.filter((item) => !item.isFound);
    } else if (statusFilter === "found") {
      result = result.filter((item) => item.isFound);
    }

    if (search.trim()) {
      const query = search.toLowerCase();
      result = result.filter(
        (item) =>
          item.itemName?.toLowerCase().includes(query) ||
          item.lostPlace?.toLowerCase().includes(query),
      );
    }

    result.sort((a, b) => {
      switch (sortBy) {
        case "oldest":
          return getPostedDate(a) - getPostedDate(b);
        case "lost-newest":
          return getLostDateTime(b) - getLostDateTime(a);
        case "lost-oldest":
          return getLostDateTime(a) - getLostDateTime(b);
        case "newest":
        default:
          return getPostedDate(b) - getPostedDate(a);
      }
    });

    return result;
  }, [allItems, statusFilter, sortBy, search]);

  return (
    <Layout user={user}>
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Report Lost Item</h2>

        {user ? (
          <form
            onSubmit={handleAddItem}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
          >
            <input
              placeholder="Item Name"
              name="item_name"
              className="border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
              required
              disabled={submitting}
            />
            <input
              placeholder="Item Description"
              name="item_desc"
              className="border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
              required
              disabled={submitting}
            />
            <input
              placeholder="Place"
              name="item_place"
              className="border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
              required
              disabled={submitting}
            />
            <input
              type="date"
              name="item_date"
              className="border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
              required
              disabled={submitting}
            />
            <input
              type="time"
              name="item_time"
              className="border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
              required
              disabled={submitting}
            />
            <input
              type="number"
              placeholder="Price"
              name="item_price"
              className="border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
              required
              disabled={submitting}
            />
            <button
              type="submit"
              disabled={submitting}
              className="md:col-span-2 lg:col-span-3 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold rounded-xl py-3 transition flex items-center justify-center gap-2"
            >
              {submitting ? (
                <>
                  <Loader size="sm" inline />
                  Adding...
                </>
              ) : (
                "Add Lost Item"
              )}
            </button>
          </form>
        ) : (
          <button
            onClick={() => navigate("/auth")}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-xl transition"
          >
            Sign in to Add Item
          </button>
        )}
      </div>

      <div className="mt-10">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Lost Items</h2>
            <p className="text-gray-500 mt-1">Find and manage reported lost items</p>
          </div>
          <span className="bg-gray-100 text-gray-700 px-4 py-2 rounded-full text-sm font-medium">
            {loading ? "..." : `${filteredItems.length} Items`}
          </span>
        </div>

        <ItemFilters
          statusFilter={statusFilter}
          sortBy={sortBy}
          search={search}
          onStatusChange={setStatusFilter}
          onSortChange={setSortBy}
          onSearchChange={setSearch}
        />

        {loading ? (
          <Loader label="Loading items..." />
        ) : filteredItems.length === 0 ? (
          <div className="bg-white border border-gray-200 rounded-2xl p-10 text-center">
            <p className="text-gray-500">No lost items found.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredItems.map((item) => (
              <ItemCard key={item.id} item={item} />
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
}

export default Items;
