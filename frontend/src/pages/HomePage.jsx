import { products } from "../../products";
import CategoryItems from "../components/CategoryItems";

function HomePage() {
  return (
    <div className="relative min-h-screen text-white overflow-hidden">
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-center text-5xl sm:text-6xl font-bold text-emerald-400 mb-4">
          Explore Our Categories
        </h1>
        <p className="text-center text-lg mb-12 sm:text-xl text-gray-300">
          Discover a world of products and services.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2  lg:grid-cols-3 gap-4">
          {products.map((category) => (
            <CategoryItems key={category.id} category={category} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default HomePage;
