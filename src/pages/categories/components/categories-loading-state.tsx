const CategoriesLoadingState = () => {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="text-center">
        <div className="text-gray-600 text-2xl mb-4">Loading categories...</div>
        <div className="animate-spin w-12 h-12 border-4 border-t-4 border-blue-500 rounded-full mx-auto"></div>
      </div>
    </div>
  );
};

export default CategoriesLoadingState;
