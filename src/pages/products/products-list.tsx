import { useNavigate, useSearchParams } from "react-router-dom";
import { useGetProducts } from "../../hooks/queries/products/use-get-products";
import ProductsErrorState from "./components/products-error-state";
import ProductsLoadingState from "./components/products-loading-state";
import { Button } from "../../components/ui/button";
import ProductModal from "./components/product-modal";
import { useState } from "react";
import {
  ProductPayload,
  useCreateProduct,
} from "../../hooks/mutations/products/use-create-product";
import { ArrowLeft } from "lucide-react";
import { ProductCard } from "./components/product-card";
import { Category } from "../../types";

const ProductsList = () => {
  const [searchParams] = useSearchParams();
  const categoryId = searchParams.get("category") ?? "";
  const categoryName = searchParams.get("categoryName") ?? "Unknown Category";

  const {
    data: products,
    isLoading,
    error,
  } = useGetProducts(categoryId ? parseInt(categoryId) : 0);

  const navigate = useNavigate();

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const { mutate: createProductMutation, isPending: isCreating } =
    useCreateProduct();

  const handleSaveProduct = (productData: {
    name: string;
    description: string;
    price: number;
    currency: string;
    category: Category;
  }) => {
    if (!categoryId) return;

    const newProduct: ProductPayload = {
      ...productData,
      category: { id: parseInt(categoryId), name: categoryName },
    };

    createProductMutation(newProduct, {
      onSuccess: () => setIsModalOpen(false),
    });
  };

  return (
    <div>
      <div className="px-4 flex justify-between items-center py-4 z-10 sticky top-0 bg-[#242424]">
        <Button
          onClick={() => navigate("/categories")}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700 duration-300"
        >
          <ArrowLeft size={20} />
          Back to categories
        </Button>
        <h2 className="text-2xl font-semibold text-center">
          You have {products?.length} products in: {categoryName}
        </h2>
        <Button
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700 duration-300"
        >
          Create new product
        </Button>
      </div>

      {isLoading && <ProductsLoadingState />}
      {error && <ProductsErrorState />}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 py-10 px-4">
        {products?.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      <ProductModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSaveProduct={handleSaveProduct}
        categories={[{ id: parseInt(categoryId), name: categoryName }]}
        isSaving={isCreating}
      />
    </div>
  );
};

export default ProductsList;
