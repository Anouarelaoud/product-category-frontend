import { Button } from "../../../components/ui/button";
import { Card } from "../../../components/ui/card";
import { Category } from "../../../types";
import { Trash2, Edit2, ArrowRight } from "lucide-react"; // Import Edit icon
import { useDeleteCategory } from "../../../hooks/mutations/categories/use-delete-category";
import { useState } from "react";
import CategoryModal from "./category-modal";
import { useUpdateCategory } from "../../../hooks/mutations/categories/use-update-category";

interface CategoryCardProps {
  category: Category;
}

export const CategoryCard = ({ category }: CategoryCardProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [categoryToUpdate, setCategoryToUpdate] = useState<Category | null>(
    null
  );

  const { mutate: deleteCategoryMutation, isPending: isDeleting } =
    useDeleteCategory(category.id);
  const { mutate: updateCategory, isPending: isUpdating } = useUpdateCategory();

  const renderSubcategories = (subcategories: Category[]) => {
    return (
      <ul className="list-disc pl-5">
        {subcategories.map((subCategory) => (
          <li key={subCategory.id} className="text-gray-600">
            {subCategory.name}
            {subCategory.subcategories &&
              subCategory.subcategories.length > 0 && (
                <div className="ml-4">
                  {renderSubcategories(subCategory.subcategories)}
                </div>
              )}
          </li>
        ))}
      </ul>
    );
  };

  return (
    <>
      <Card className="relative p-6 bg-white rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 ease-in-out group">
        <div className="flex flex-col justify-between h-full">
          <h2
            className="text-2xl font-bold text-gray-800 mb-4 transition-colors duration-200 truncate"
            title={category.name}
          >
            {category.name}
          </h2>
          {category.subcategories && category.subcategories.length > 0 ? (
            <div>
              <h4 className="text-lg font-medium text-gray-700">
                Subcategories:
              </h4>
              {renderSubcategories(category.subcategories)}
            </div>
          ) : (
            <p className="text-red-600">No subcategories available</p>
          )}
        </div>

        <div className="flex justify-between items-center mt-4  gap-4">
          <Button
            className="text-black bg-slate-100 hover:bg-slate-200"
            onClick={() => {
              window.location.href = `/products?category=${category.id}&categoryName=${category.name}`;
            }}
          >
            Preview <ArrowRight size={16} color="black" />
          </Button>
          <div className="flex justify-end items-center gap-2">
            <Button
              className="text-white bg-slate-100 hover:bg-slate-200"
              onClick={() => {
                setCategoryToUpdate(category);
                setIsModalOpen(true);
              }}
              title="Update"
            >
              <Edit2 size={16} color="black" />
            </Button>

            <Button
              className="text-white bg-slate-100 hover:bg-slate-200"
              onClick={() => deleteCategoryMutation()}
              disabled={isDeleting}
              title="Delete"
            >
              <Trash2 size={16} color="black" />
            </Button>
          </div>
        </div>
      </Card>

      {isModalOpen && categoryToUpdate && (
        <CategoryModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSave={(updatedCategoryName: string) => {
            updateCategory({
              id: categoryToUpdate.id,
              name: updatedCategoryName,
            });
            setIsModalOpen(false);
          }}
          categoryName={categoryToUpdate.name}
          setCategoryName={(name: string) => {
            setCategoryToUpdate((prev) => (prev ? { ...prev, name } : null));
          }}
          isLoading={isUpdating}
          isUpdateModal
        />
      )}
    </>
  );
};
