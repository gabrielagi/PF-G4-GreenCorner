const axios= require('axios')
const {
    getAllTrendings,
    deleteTrendingsByID,
    searchTrendingsByID,
    addNewTrendingByID,
}= require('../Controller/trending.controller')
//SECCIÓN PENDIENTE


const deleteTrendingHandler=async(req,res)=>{
    const {id}=req.params
    try {
        const trendingDelete= await deleteTrendingsByID(id)
        return res.status(204).json(trendingDelete)
    } catch (error) {
        console.log('Error en el servidor-trending', error)
        res.status(500).json({error:error.message})
    }
}

//PENDIENTE  const searchTrendingsByName=async(req,res)=>{
//     const {name}=req.query;
//     try {
//         const trendingFound=await searchTrendingsByID(name)

//         trendingFound.length=await searchTrendingsByName()

//     } catch (error) {
        
//     }
// }
