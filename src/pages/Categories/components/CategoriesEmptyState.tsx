const CategoriesEmptyState = () => {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <p className="text-red-600 text-2xl font-semibold">
        Error loading categories. Please try again later.
      </p>
    </div>
  );
};

export default CategoriesEmptyState;
