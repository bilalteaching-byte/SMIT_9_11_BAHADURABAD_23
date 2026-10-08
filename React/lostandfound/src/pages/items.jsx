import { addDoc, doc, getDocs, updateDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import Navbar from "../components/navbar";
import { auth, itemsRef } from "../utils/firebase";
import { useNavigate } from "react-router";

function Items() {
  const navigate = useNavigate();
  const [items, setAllItems] = useState([]);

  const handleAddItem = async (event) => {
    event.preventDefault();

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
      };

      await addDoc(itemsRef, item);
      event.target.reset();
      getAllItems();
    } catch (error) {
      console.error("Failed to add item:", error);
    }
  };

  const getAllItems = async () => {
    try {
      const snapshot = await getDocs(itemsRef);

      const allItems = snapshot.docs.map((document) => ({
        ...document.data(),
        id: document.id,
      }));

      setAllItems(allItems);
    } catch (error) {
      console.error("Failed to get items:", error);
    }
  };

  useEffect(() => {
    getAllItems();
  }, []);

  const handleMarkFound = async (id) => {
    try {
      if (!auth.currentUser) return navigate("/auth");
      const itemRef = doc(itemsRef, id);

      await updateDoc(itemRef, {
        isFound: true,
        foundBy: auth.currentUser?.email,
      });

      setAllItems((previousItems) =>
        previousItems.map((item) =>
          item.id === id
            ? { ...item, isFound: true, foundBy: auth.currentUser?.email }
            : item,
        ),
      );
    } catch (error) {
      console.error("Failed to mark item as found:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Add Item */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Report Lost Item
          </h2>

          {auth?.currentUser ? (
            <form
              onSubmit={handleAddItem}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
            >
              <input
                placeholder="Item Name"
                name="item_name"
                className="border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                required
              />

              <input
                placeholder="Item Description"
                name="item_desc"
                className="border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                required
              />

              <input
                placeholder="Place"
                name="item_place"
                className="border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                required
              />

              <input
                type="date"
                name="item_date"
                className="border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                required
              />

              <input
                type="time"
                name="item_time"
                className="border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                required
              />

              <input
                type="number"
                placeholder="Price"
                name="item_price"
                className="border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                required
              />

              <button
                type="submit"
                className="md:col-span-2 lg:col-span-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl py-3 transition"
              >
                Add Lost Item
              </button>
            </form>
          ) : (
            <button
              onClick={() => navigate("/auth")}
              className="p-2 px-4 border border-gray-300"
            >
              Signin to Add item
            </button>
          )}
        </div>

        {/* Items */}
        <div className="mt-10">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Lost Items</h2>

              <p className="text-gray-500 mt-1">
                Find and manage reported lost items
              </p>
            </div>

            <span className="bg-gray-100 text-gray-700 px-4 py-2 rounded-full text-sm font-medium">
              {items.length} Items
            </span>
          </div>

          {items.length === 0 ? (
            <div className="bg-white border border-gray-200 rounded-2xl p-10 text-center">
              <p className="text-gray-500">No lost items found.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm hover:shadow-md transition"
                >
                  {/* Header */}
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">
                        {item.itemName}
                      </h3>

                      <p className="text-sm text-gray-500 mt-1">
                        {item.itemDesc}
                      </p>
                    </div>

                    {item.isFound ? (
                      <span className="shrink-0 bg-green-100 text-green-700 text-xs font-semibold px-3 py-1 rounded-full">
                        Found
                      </span>
                    ) : (
                      <span className="shrink-0 bg-red-100 text-red-700 text-xs font-semibold px-3 py-1 rounded-full">
                        Lost
                      </span>
                    )}
                  </div>

                  {/* Details */}
                  <div className="mt-5 space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">📍 Lost By</span>

                      <span className="font-medium text-gray-800">
                        {item.userEmail}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">📍 Place</span>

                      <span className="font-medium text-gray-800">
                        {item.lostPlace}
                      </span>
                    </div>

                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">📅 Date</span>

                      <span className="font-medium text-gray-800">
                        {item.lostDate}
                      </span>
                    </div>

                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">🕐 Time</span>

                      <span className="font-medium text-gray-800">
                        {item.lostTime}
                      </span>
                    </div>

                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">💰 Price</span>

                      <span className="font-semibold text-gray-900">
                        Rs. {item.itemPrice}
                      </span>
                    </div>
                  </div>

                  {/* Button */}
                  <div className="mt-6">
                    {item.isFound ? (
                      <button
                        disabled
                        className="w-full bg-gray-100 text-gray-500 font-semibold py-3 rounded-xl cursor-not-allowed"
                      >
                        ✓ Item Found By {item?.foundBy}
                      </button>
                    ) : (
                      <button
                        onClick={() => handleMarkFound(item.id)}
                        className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-xl transition"
                      >
                        Mark as Found
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Items;
