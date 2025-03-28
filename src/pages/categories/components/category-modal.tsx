import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";

interface CategoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (categoryName: string) => void;
  categoryName: string;
  setCategoryName: (name: string) => void;
  isLoading: boolean;
}

const CategoryModal: React.FC<CategoryModalProps> = ({
  isOpen,
  onClose,
  onSave,
  categoryName,
  setCategoryName,
  isLoading,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-gray-500 p-8 rounded-lg shadow-lg w-1/3">
        <h3 className="text-2xl mb-4">Create New Category</h3>
        <Input
          type="text"
          value={categoryName}
          onChange={(e) => setCategoryName(e.target.value)}
          placeholder="Category Name"
          className="w-full p-2 mb-4 border border-gray-300 rounded"
        />
        <div className="flex justify-between">
          <Button onClick={onClose} className="px-4 py-2 bg-gray-300 rounded">
            Cancel
          </Button>
          <Button
            onClick={() => onSave(categoryName)}
            disabled={isLoading || !categoryName.trim()}
            className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-blue-300"
          >
            {isLoading ? "Saving..." : "Save"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CategoryModal;
