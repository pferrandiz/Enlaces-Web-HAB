import { Auth } from "./Auth";
import { Link } from "react-router-dom";
import "./Header.css";

export const Header = () => {
  return (
    <header>
      <h1 className="link">
        <Link to={"/home"}>tuEnlace</Link>
      </h1>

      <nav>
        <Auth />
      </nav>
    </header>
  );
};
