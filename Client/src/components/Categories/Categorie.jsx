import { Link } from "react-router-dom";

const Categorie = ({ name }) => {
  return (
    <div className="flex flex-wrap ml-4">
      <Link>
        <h1>{name}</h1>
      </Link>
    </div>
  );
};
export default Categorie;
