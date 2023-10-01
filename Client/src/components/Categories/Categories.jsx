import plantgif from "../../assets/plantgif.gif";
import Category from "./Categorie";
import Card from "../Cards/Card/Card";
const Categories = ({ allCategories }) => {
  return (
    <div className=" ml-4 rounded-none  ml-[70px] border border-solid w-[200px] mt-[-200px] rounded-[20px] bg-gradient-to-br from-gray-600 via-transparent to-gray-300">
      <h1 className=" font-semibold text-4xl italic text-center">
        All Categories
      </h1>
      <br />
      <div>
        {allCategories ? (
          allCategories.map((p, i) => <Category key={i} name={p.name} id={p.id} />)
        ) : (
          <div className="flex justify-center items-center">
            <img src={plantgif} alt="loading" />
          </div>
        )}
      </div>
    </div>
  );
};
export default Categories;
