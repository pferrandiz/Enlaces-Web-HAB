import { Routes, Route } from "react-router-dom";
import "./App.css";

import Header from "./components/Header";
import Footer from "./components/Footer";

import HomePage from "./Paginas/HomePage";
import RegisterPage from "./Paginas/RegisterPage";
import LoginPage from "./Paginas/LoginPage";
import EnlacePage from "./Paginas/EnlacePage";
import NotFoundPage from "./Paginas/NotFoundPage";

function App() {
  return (
    <div className="App">
      <main>
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/enlace/:id" element={<EnlacePage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
        <Footer />
      </main>
    </div>
  );
}

export default App;
