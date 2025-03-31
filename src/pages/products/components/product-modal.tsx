import { useState, useEffect } from "react";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import { Category } from "../../../types";
import { Textarea } from "../../../components/ui/textarea";

interface ProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSaveProduct: (productData: {
    id?: number;
    name: string;
    description: string;
    price: number;
    currency: string;
    category: Category;
  }) => void;
  categories: Category[];
  isSaving: boolean;
  product?: {
    id: number;
    name: string;
    description: string;
    price: number;
    currency: string;
    category: Category;
  };
}

const ProductModal: React.FC<ProductModalProps> = ({
  isOpen,
  onClose,
  onSaveProduct,
  categories,
  isSaving,
  product,
}) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [currency, setCurrency] = useState("USD");
  const [category, setCategory] = useState<Category | null>(null);

  useEffect(() => {
    if (product) {
      setName(product.name);
      setDescription(product.description);
      setPrice(String(product.price));
      setCurrency(product.currency);
      setCategory(product.category);
    }
  }, [product]);

  const handleSave = () => {
    if (!name.trim() || !description.trim() || !price.trim()) return;

    onSaveProduct({
      id: product?.id,
      name,
      description,
      price: parseFloat(price),
      currency,
      category: category ?? categories[0],
    });

    setName("");
    setDescription("");
    setPrice("");
    setCurrency("USD");
    setCategory(null);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
        <h3 className="text-2xl mb-4 text-black">
          {product ? "Update Product" : "Create New Product"}
        </h3>

        <Input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Product Name"
          className="w-full p-2 mb-2 border border-gray-300 rounded text-black"
        />
        <Textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Product Description"
          className="w-full p-2 mb-2 border border-gray-300 rounded text-black"
        />
        <Input
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          placeholder="Price"
          className="w-full p-2 mb-2 border border-gray-300 rounded text-black"
          min={0}
        />
        <select
          value={category?.id || ""}
          onChange={(e) =>
            setCategory(
              categories.find((cat) => cat.id === parseInt(e.target.value)) ||
                null
            )
          }
          className="w-full p-2 mb-4 border border-gray-300 rounded text-black"
          disabled
        >
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>

        <div className="flex justify-end gap-4">
          <Button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-black rounded"
          >
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            disabled={
              isSaving || !name.trim() || !description.trim() || !price.trim()
            }
            className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded disabled:bg-blue-300"
          >
            {isSaving ? "Saving..." : "Save"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;
