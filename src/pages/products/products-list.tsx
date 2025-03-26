import { Card } from "../../components/ui/card";
import { useGetProducts } from "../../hooks/queries/products/use-get-products";
import ProductsErrorState from "./components/products-error-state";
import ProductsLoadingState from "./components/products-loading-state";

const ProductsList = () => {
  const { data: products, isLoading, error } = useGetProducts(1); //TODO: use selected category

  return (
    <div>
      <h2 className="text-2xl font-semibold text-center sticky top-0 bg-blue-500 py-4  z-10">
        Browse Products
      </h2>
      {isLoading && <ProductsLoadingState />}
      {error && <ProductsErrorState />}
      {products?.map((product) => (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <Card key={product.id} className="p-4">
            <h2 className="text-lg font-semibold">{product.name}</h2>
            <p className="text-gray-600">{product.description}</p>
            <p className="mt-2 font-bold">
              {product.price} {product.currency}
            </p>
          </Card>
        </div>
      ))}
    </div>
  );
};

export default ProductsList;
