import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";

interface CategoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (categoryName: string) => void;
  categoryName: string;
  setCategoryName: (name: string) => void;
  isLoading: boolean;
  isUpdateModal?: boolean;
}

const CategoryModal: React.FC<CategoryModalProps> = ({
  isOpen,
  onClose,
  onSave,
  categoryName,
  setCategoryName,
  isLoading,
  isUpdateModal = false,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-lg shadow-lg w-1/3">
        <h3 className="text-2xl mb-4 text-black">
          {isUpdateModal ? "Update " : "Create new "} category
        </h3>
        <Input
          type="text"
          value={categoryName}
          onChange={(e) => setCategoryName(e.target.value)}
          placeholder="Category Name"
          className="w-full p-2 mb-4 border border-gray-300 rounded text-black"
        />
        <div className="flex justify-end gap-4">
          <Button
            onClick={() => {
              setCategoryName("");
              onClose();
            }}
            className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-black rounded"
          >
            Cancel
          </Button>
          <Button
            onClick={() => onSave(categoryName)}
            disabled={isLoading || !categoryName.trim()}
            className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-black rounded disabled:bg-blue-300"
          >
            {isLoading ? "Saving..." : "Save"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CategoryModal;
