const CategoriesEmptyState = () => {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <p className="text-red-600 text-2xl font-semibold">
        No categories available now. Please try again later.
      </p>
    </div>
  );
};

export default CategoriesEmptyState;
