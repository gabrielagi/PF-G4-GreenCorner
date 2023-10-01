import plantgif from "../../assets/plantgif.gif";
import Categorie from "./Categorie";
const Categories = ({allCategories}) => {
    return (
        <div className=" flex-wrap ml-4 rounded-none">
            <h1 className="font-semibold text-4xl italic" >All Categories</h1>
          {allCategories ? (
            allCategories.map((p, i) => {             
             return (
                  <Categorie key={i} name={p.name}/>
              );
            })
          ) : (
            <div className="flex justify-center items-center">
              <img src={plantgif} alt="loading" />
            </div>
          )}
        </div>
      );
}
export default Categories;