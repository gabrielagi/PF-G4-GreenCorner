import plantgif from "../../assets/plantgif.gif";
import Category from "./Categorie";
const Categories = ({ allCategories }) => {
 
  return (
    <div >
      <h1 >
        All Categories
      </h1>
      <br />
      <div >
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