import { Button } from "../../../components/ui/button";
import { Card } from "../../../components/ui/card";
import { Category } from "../../../types";
import { Trash2, Edit2, Eye } from "lucide-react"; // Import Edit icon
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

  return (
    <>
      <Card className="relative p-6 bg-white rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 ease-in-out group">
        <h2
          className="text-2xl font-bold text-gray-800 mb-4 group-hover:text-blue-600 transition-colors duration-200 truncate"
          title={category.name}
        >
          {category.name}
        </h2>

        <div className="flex justify-between items-center mt-4">
          <Button
            className="text-white bg-blue-600 hover:bg-blue-700 transition"
            onClick={() => {
              window.location.href = "products";
            }}
            title="Preview"
          >
            <Eye size={16} />
          </Button>

          <div className="flex justify-end items-center gap-2">
            <Button
              className="text-white bg-green-600 hover:bg-green-700 transition"
              onClick={() => {
                setCategoryToUpdate(category);
                setIsModalOpen(true);
              }}
              title="Update"
            >
              <Edit2 size={16} />
            </Button>

            <Button
              variant="destructive"
              onClick={() => deleteCategoryMutation()}
              disabled={isDeleting}
              className="flex items-center gap-2"
              title="Delete"
            >
              <Trash2 size={16} />
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
        />
      )}
    </>
  );
};
