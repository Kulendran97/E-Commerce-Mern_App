import logo from "./logo.svg";
import "./App.css";
import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      {" "}
      <Header />
      <main>
        <ToastContainer position="top-center" />
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

export default App;
