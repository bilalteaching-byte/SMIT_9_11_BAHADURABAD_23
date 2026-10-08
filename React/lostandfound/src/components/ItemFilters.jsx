function ItemFilters({ statusFilter, sortBy, search, onStatusChange, onSortChange, onSearchChange }) {
  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-4 mb-6 flex flex-col md:flex-row gap-4">
      <input
        type="text"
        placeholder="Search by name or place..."
        value={search}
        onChange={(event) => onSearchChange(event.target.value)}
        className="flex-1 border border-gray-300 rounded-xl px-4 py-2.5 outline-none focus:ring-2 focus:ring-blue-500"
      />

      <select
        value={statusFilter}
        onChange={(event) => onStatusChange(event.target.value)}
        className="border border-gray-300 rounded-xl px-4 py-2.5 outline-none focus:ring-2 focus:ring-blue-500 bg-white"
      >
        <option value="all">All Items</option>
        <option value="lost">Lost Only</option>
        <option value="found">Found Only</option>
      </select>

      <select
        value={sortBy}
        onChange={(event) => onSortChange(event.target.value)}
        className="border border-gray-300 rounded-xl px-4 py-2.5 outline-none focus:ring-2 focus:ring-blue-500 bg-white"
      >
        <option value="newest">Newest Posted</option>
        <option value="oldest">Oldest Posted</option>
        <option value="lost-newest">Lost Date (Newest)</option>
        <option value="lost-oldest">Lost Date (Oldest)</option>
      </select>
    </div>
  );
}

export default ItemFilters;
