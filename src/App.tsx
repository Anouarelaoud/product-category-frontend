import Footer from "./components/footer";
import Router from "./routes/router";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Router />
      <Footer />
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        pauseOnHover={true}
        theme="colored"
      />
    </div>
  );
}

export default App;
