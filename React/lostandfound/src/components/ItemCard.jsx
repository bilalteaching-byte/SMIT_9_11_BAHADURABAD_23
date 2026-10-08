import { Link } from "react-router";

function ItemCard({ item }) {
  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm hover:shadow-md transition flex flex-col">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="text-xl font-bold text-gray-900">{item.itemName}</h3>
          <p className="text-sm text-gray-500 mt-1 line-clamp-2">{item.itemDesc}</p>
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

      <div className="mt-5 space-y-2 flex-grow">
        <div className="flex justify-between text-sm">
          <span className="text-gray-500">Place</span>
          <span className="font-medium text-gray-800">{item.lostPlace}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-500">Date</span>
          <span className="font-medium text-gray-800">{item.lostDate}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-500">Price</span>
          <span className="font-semibold text-gray-900">Rs. {item.itemPrice}</span>
        </div>
      </div>

      <Link
        to={`/items/${item.id}`}
        className="mt-6 w-full text-center bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl transition block"
      >
        View Details
      </Link>
    </div>
  );
}

export default ItemCard;
