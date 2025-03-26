import { Card } from "../../../components/ui/card";
import { Category } from "../../../types";

export const CategoryCard = ({ category }: { category: Category }) => {
  return (
    <Card
      key={category.id}
      className="relative p-6 bg-white rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 ease-in-out group cursor-pointer"
      onClick={() => console.log("Category clicked:", category)}
    >
      <h2 className="text-2xl font-bold text-gray-800 mb-4 group-hover:text-blue-600 transition-colors duration-200 focus:outline-none">
        {category.name}
      </h2>
      {category.subcategories && category.subcategories.length > 0 ? (
        <ul className="ml-4 space-y-2">
          {category.subcategories.map((sub: Category) => (
            <li
              key={sub.id}
              className="flex items-center text-gray-600 group-hover:text-gray-800 transition-colors duration-200"
            >
              <span className="font-medium">{sub.name}</span>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500 mt-2">No subcategories available</p>
      )}
    </Card>
  );
};
