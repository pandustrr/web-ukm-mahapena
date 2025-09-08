// File: src/App.jsx
import { useState } from "react";
import Navbar from "./components/Navbar";
import Beranda from "./pages/Beranda";
import Profil from "./pages/Profil";
import Proker from "./pages/Proker";
import Blog from "./pages/Blog";
import Store from "./pages/Store";
import Footer from "./components/Footer";

function App() {
  const [currentPage, setCurrentPage] = useState("Beranda");

  const renderPage = () => {
    switch (currentPage) {
      case "Beranda":
        return <Beranda setCurrentPage={setCurrentPage} />; 
      case "Profil":
        return <Profil />;
      case "Proker":
        return <Proker />;
      case "Blog":
        return <Blog />;
      case "Store":
        return <Store />;
      default:
        return <Beranda setCurrentPage={setCurrentPage} />;
    }
  };

  return (
    <div className="App min-h-screen flex flex-col">
      <Navbar currentPage={currentPage} setCurrentPage={setCurrentPage} />
      <main className="flex-grow">
        {renderPage()}
      </main>
      <Footer />
    </div>
  );
}

export default App;