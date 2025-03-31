import { useState } from "react";
import { Button } from "../../../components/ui/button";
import { Card } from "../../../components/ui/card";
import { useDeleteProduct } from "../../../hooks/mutations/products/use-delete-product";
import { Product } from "../../../types";
import { Trash2, Edit2 } from "lucide-react";
import ProductModal from "./product-modal";
import { useUpdateProduct } from "../../../hooks/mutations/products/use-update-product";

interface ProductCardProps {
  product: Product;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [productToUpdate, setProductToUpdate] = useState<Product | null>(null);

  const { mutate: deleteProductMutation, isPending: isDeleting } =
    useDeleteProduct(product.id, product.category.id);

  const { mutate: updateProduct, isPending: isUpdating } = useUpdateProduct();

  return (
    <>
      <Card
        key={product.id}
        className="relative p-6 text-gray-800 bg-white rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 ease-in-out group"
      >
        <h2 className="text-lg font-semibold truncate" title={product.name}>
          {product.name}
        </h2>
        <p className="text-gray-600 truncate" title={product.description}>
          Description : {product.description}
        </p>
        <p className="mt-2 font-bold">
          {product.price} {product.currency}
        </p>
        <div className="flex justify-end items-center gap-2">
          <Button
            className="text-white bg-slate-100 hover:bg-slate-200"
            onClick={() => {
              setProductToUpdate(product);
              setIsModalOpen(true);
            }}
            title="Update"
          >
            <Edit2 size={16} color="black" />
          </Button>

          <Button
            className="text-white bg-slate-100 hover:bg-slate-200"
            onClick={() => deleteProductMutation()}
            disabled={isDeleting}
            title="Delete"
          >
            <Trash2 size={16} color="black" />
          </Button>
        </div>
      </Card>

      {isModalOpen && productToUpdate && (
        <ProductModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          product={productToUpdate}
          onSaveProduct={(productData) => {
            updateProduct({
              ...productData,
              id: productToUpdate.id,
            });
            setIsModalOpen(false);
          }}
          categories={[
            { id: product.category.id, name: product.category.name },
          ]}
          isSaving={isUpdating}
        />
      )}
    </>
  );
};
