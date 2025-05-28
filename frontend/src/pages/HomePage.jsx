import { useEffect } from "react";
import CategoryItems from "../components/CategoryItems";
import { useProductStore } from "../store/useProductStore";
import FeaturedProducts from "../components/FeaturedProducts";

// Helper function to get unique category items
function getOneProductPerCategory(products) {
  const seenCategories = new Set();
  return products.filter((product) => {
    if (!seenCategories.has(product.category)) {
      seenCategories.add(product.category);
      return true;
    }
    return false;
  });
}

function HomePage() {
  const {
    getAllProducts,
    fetchFeaturedProducts,
    products,
    featuredProducts,
    loading,
  } = useProductStore();

  useEffect(() => {
    getAllProducts();
    fetchFeaturedProducts();
  }, [getAllProducts, fetchFeaturedProducts]);

  // Get one product per unique category
  const categoryItems = getOneProductPerCategory(products);

  return (
    <div className="relative min-h-screen text-white overflow-hidden">
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Heading */}
        <h1 className="text-center text-5xl sm:text-6xl font-bold text-emerald-400 mb-4">
          Explore Our Categories
        </h1>
        <p className="text-center text-lg mb-12 sm:text-xl text-gray-300">
          Discover a world of products and services.
        </p>

        {/* One product per category */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categoryItems.map((item) => (
            <CategoryItems key={item._id} item={item} />
          ))}
        </div>

        {/* Featured Products */}
        {!loading && featuredProducts.length > 0 && (
          <div className="mt-20">
            <FeaturedProducts featuredProducts={featuredProducts} />
          </div>
        )}
      </div>
    </div>
  );
}

export default HomePage;
