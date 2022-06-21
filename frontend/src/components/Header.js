import { Auth } from "./Auth";
import { Link } from "react-router-dom";

export const Header = () => {
  return (
    <header>
      <h1>
        <Link to={"/home"}>tuEnlace</Link>
      </h1>
      <nav>
        <Auth />
      </nav>
    </header>
  );
};
