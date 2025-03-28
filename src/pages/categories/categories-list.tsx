import React, { useState } from "react";
import { CategoryCard } from "./components/category-card";
import CategoriesEmptyState from "./components/categories-empty-state";
import CategoriesLoadingState from "./components/categories-loading-state";
import CategoriesErrorState from "./components/categories-error-state";
import { useGetCategories } from "../../hooks/queries/categories/use-get-categories";
import { Button } from "../../components/ui/button";
import CategoryModal from "./components/category-modal";
import { useCreateCategory } from "../../hooks/mutations/categories/use-create-category";
import { Category } from "../../types";

const CategoriesList: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [categoryName, setCategoryName] = useState<string>("");

  const { data: categories, isLoading, error } = useGetCategories();
  const { mutate: createCategoryMutation, isPending: isCreating } =
    useCreateCategory();

  const handleSaveCategory = (categoryName: string) => {
    createCategoryMutation(categoryName);
    setIsModalOpen(false);
  };

  return (
    <div>
      <div className="flex justify-between items-center py-4 z-10 sticky top-0 bg-white">
        <h2 className="text-2xl text-gray-800 font-semibold text-center">
          Categories list
        </h2>
        <Button
          onClick={() => {
            setIsModalOpen(true);
          }}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-300"
        >
          Create Category
        </Button>
      </div>

      {isLoading && <CategoriesLoadingState />}
      {error && <CategoriesErrorState />}
      {(!categories || categories.length === 0) && <CategoriesEmptyState />}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 py-10">
        {categories?.map((category: Category) => (
          <CategoryCard key={category.id} category={category} />
        ))}
      </div>

      <CategoryModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
        }}
        onSave={handleSaveCategory}
        categoryName={categoryName}
        setCategoryName={setCategoryName}
        isLoading={isCreating}
      />
    </div>
  );
};

export default CategoriesList;
