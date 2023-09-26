const { Product } = require("../models/Product");

//Agrega un producto encontrado por su ID a la lista de trending seteando su atributo en true(se ejecuta mediante el click de un botón)
const addNewTrendingByID=async(id)=>{
    try {
        const productUpdate =Product.update({isTrending:true},{where:{product_id:id}})

        return productUpdate
    } catch (error) {
        throw new Error ('Error seteando en True a isTrending en el server')
    }
}


//Busca todos los productos con el atributo isTrending con valor true (mostrar productos trending)
const getAllTrendings= async()=>{
    try {
        const productFound= Product.findAll({where:{isTrending:true},})
        return productFound
    } catch (error) {
        return new Error ('Error al buscar todos los productos Trending')
    }


}
//Busca el producto seleccionado por ID y setea su atributo isTrending en false (quitar un producto de la lista Trending, se debe ejecutar solamente en aquellos que ya estén renderizados como trending, mediante un click)
const deleteTrendingsByID= async(id)=>{
    try {
         const productUpdate =Product.update({isTrending:false},{where:{product_id:id}})
       if(productUpdate.length){
            return (productUpdate + 'Actualizacion exitosa')
        }
       else{return {error:'No se encontró el id'}}
    } catch (error) {
        return {error:error.message}
    }
    
}
//Trae aquellos productos que sean Trending buscandolos por ID(los busca mediante el click a su renderizado)
const searchTrendingsByName=async(name)=>{
    try{
        const productFound=Product.findAll({where:{name:name,isTrending:true}})
       
            return productFound
        
       
    }catch(error){
        throw new Error('Error en el servidor al obtener el producto Trending por ID')
    }
}




module.exports = {
    getAllTrendings,
    deleteTrendingsByID,
    searchTrendingsByName,
    addNewTrendingByID,
}