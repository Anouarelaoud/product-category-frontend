import Footer from "./components/Footer";
import Router from "./routes/Router";

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Router />
      <Footer />
    </div>
  );
}

export default App;
