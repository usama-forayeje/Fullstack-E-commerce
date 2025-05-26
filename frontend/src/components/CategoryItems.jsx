import { Link } from "react-router";

function CategoryItems({ item }) {
  return (
    <div className="relative group rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 bg-gray-900">
      <Link to={`/category/${item.category}`}>
        <div className="w-full h-80 sm:h-96 relative">
          {/* Product Image */}
          <img
            src={item?.image || "https://via.placeholder.com/300"}
            alt={item?.name || "Product Image"}
            className="object-cover w-full h-full transition-transform duration-500 ease-in-out transform group-hover:scale-110"
            loading="lazy"
          />

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent z-10" />

          {/* Info Block */}
          <div className="absolute bottom-4 left-4 z-20 text-white space-y-1">
            <h2 className="text-2xl sm:text-3xl font-bold leading-tight">{item?.category}</h2>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default CategoryItems;
