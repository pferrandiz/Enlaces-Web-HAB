import { Routes, Route, Navigate } from "react-router-dom";
import "./App.css";

import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import Home from "./Paginas/Home";
import { HomePage } from "./Paginas/HomePage";
import { RegisterPage } from "./Paginas/RegisterPage";
import { LoginPage } from "./Paginas/LoginPage";
import { EnlacePage } from "./Paginas/EnlacePage";
import { NotFoundPage } from "./Paginas/NotFoundPage";
import { UserPage } from "./Paginas/UserPage";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";

const PrivatePage = ({ children }) => {
  const { token } = useContext(AuthContext);

  if (!token) return <Navigate to="/login" />;

  return children;
};

function App() {
  return (
    <div className="App">
      <main>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/home"
            element={
              <PrivatePage>
                <HomePage />
              </PrivatePage>
            }
          />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/enlace/:id"
            element={
              <PrivatePage>
                <EnlacePage />
              </PrivatePage>
            }
          />
          <Route path="/user/:id" element={<UserPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
        <Footer />
      </main>
    </div>
  );
}

export default App;
