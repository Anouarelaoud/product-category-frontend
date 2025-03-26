import Footer from "./components/footer";
import Router from "./routes/router";

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Router />
      <Footer />
    </div>
  );
}

export default App;
