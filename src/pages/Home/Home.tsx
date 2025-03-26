import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow flex flex-col items-center justify-center">
        <h1 className="text-3xl font-bold">Categories and Products</h1>
        <p className="mt-2">Click below to discover the categories list</p>
        <Link to="/categories" className="mt-4 text-blue-500 ">
          Go to Categories List
        </Link>
      </main>
    </div>
  );
};

export default Home;
