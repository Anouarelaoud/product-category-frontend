import { useQuery } from "@tanstack/react-query";
import { getProducts } from "../../api/product";
import { Card } from "../../components/ui/card";

const ProductsList = () => {
  const {
    data: products,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
  });

  if (isLoading) return <div>Loading products...</div>;
  if (error) return <div>Error loading products</div>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {products?.map((product) => (
        <Card key={product.id} className="p-4">
          <h2 className="text-lg font-semibold">{product.name}</h2>
          <p className="text-gray-600">{product.description}</p>
          <p className="mt-2 font-bold">
            {product.price} {product.currency}
          </p>
        </Card>
      ))}
    </div>
  );
};

export default ProductsList;
