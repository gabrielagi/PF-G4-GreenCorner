// const { getAllTestimonials, createTestimonial} = require ("../Controller/testimonial.controller")

// const getTestimonialHandler = async (req, res) => {
//     try {
//         const testimonials = await getAllTestimonials()
//         if(testimonials){
//             return res.status(200).json(testimonials)
//         } else{
//             return res.status(404).send("There's no testimonials")
//         }

//     } catch (error) {
//         console.log(error);
//         return res.status(500).send(error.message)
//     }
// }


// const createTestimonialHandler = async (req, res) => {
//     try {

//         const {date, message, rating} = req.body

//         const newTestimonial = await createTestimonial(date, message, rating)
        
//         return res.status(200).json(newTestimonial)

//     } catch (error) {
//         console.log(error);
//         return res.status(500).send(error.message)
//     }
// }



// module.exports = {
//     getTestimonialHandler,
//     createTestimonialHandler
// }