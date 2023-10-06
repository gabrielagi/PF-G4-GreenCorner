import plantgif from "../../assets/plantgif.gif";
import Category from "./Categorie";
const Categories = ({ allCategories }) => {
 
  return (
    <div className=" sm:ml-4 sm:rounded-none sm:relative sm:ml-[60px] sm:border sm:border-solid sm:w-[200px] sm:mt-[-200px] sm:rounded-[40px] sm:bg-gradient-to-br from-gray-600 via-transparent to-gray-300   mt-[-100px]">
      <h1 className=" sm:font-semibold sm:text-4xl sm:iralic sm:text-center font-semibold text-4xl italic text-center">
        All Categories
      </h1>
      <br />
      <div className="flex justify-center items-center">
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