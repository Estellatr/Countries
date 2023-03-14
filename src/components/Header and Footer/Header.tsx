import { Link } from "react-router-dom";

export const Header = () => {
  return (
    <div>
      <nav>
        <ul>
            <li><Link to="/favourites">Favourites</Link></li>
            <li><Link to="/countryInfo">Country Info</Link></li>
        </ul>
      </nav>
    </div>
  );
};
