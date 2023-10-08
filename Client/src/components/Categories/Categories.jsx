import plantgif from "../../assets/plantgif.gif";
import Category from "./Categorie";
const Categories = ({ allCategories }) => {
 
  return (
    <div className="flex flex-col items-center">
      <h1 className="text-4xl font-semibold italic mt-4 mb-2">
        All Categories
      </h1>
      <br />
      <div className="">
        {allCategories ? (
          allCategories.map((p, i) => <Category key={i} name={p.name} id={p.id} />)
        ) : (
          <div >
            <img src={plantgif} alt="loading" />
          </div>
        )}
      </div>
    </div>
  );
};
export default Categories;