import { Link } from "react-router";

function CategoryItems({ category }) {
  return (
    <div className="relative overflow-hidden h-96 w-full rounded-lg group">
      <Link to={`/category/${category?.image_url}`}>
        <div className="w-full h-full cursor-pointer relative">
          <img
            src={category?.image_url}
            alt={category?.title}
            className="object-cover w-full h-full transition-transform duration-500 ease-in-out transform group-hover:scale-110"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-gray-900 opacity-50 z-10" />
          <div className="absolute bottom-4 left-4 z-20">
            <h2 className="text-white text-xl font-semibold">{category?.title}</h2>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default CategoryItems;
