import { useQuery } from "@tanstack/react-query";
import { CategoryCard } from "./components/category-card";
import CategoriesEmptyState from "./components/categories-empty-state";
import CategoriesLoadingState from "./components/categories-loading-state";
import CategoriesErrorState from "./components/categories-error-state";
import { getCategories } from "../../hooks/queries/categories/use-get-categories";

const CategoriesList = () => {
  const {
    data: categories,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  });

  return (
    <div>
      <h2 className="text-2xl font-semibold text-center sticky top-0 bg-blue-500 py-4  z-10">
        Browse Categories
      </h2>
      {isLoading && <CategoriesLoadingState />}
      {error && <CategoriesErrorState />}
      {(!categories || categories.length === 0) && <CategoriesEmptyState />}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 py-10">
        {categories?.map((category) => (
          <CategoryCard key={category.id} category={category} />
        ))}
      </div>
    </div>
  );
};

export default CategoriesList;
