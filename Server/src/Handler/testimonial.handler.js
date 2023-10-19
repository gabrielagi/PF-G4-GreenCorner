const { getAllTestimonials, createTestimonial, getTestimonialbyId, updateTestimonial, deleteTestimonial} = require ("../Controller/testimonial.controller")

const getTestimonialHandler = async (req, res) => {
    try {
        const testimonials = await getAllTestimonials()
        if(testimonials.length > 0){
            return res.status(200).json(testimonials)
        } else{
            return res.status(404).send("There's no testimonials")
        }

    } catch (error) {
        console.log(error);
        return res.status(500).send(error.message)
    }
}

const byIdHandler = async (req, res) => {
    const id  = req.params.id
    try {
        const testimonial = await getTestimonialbyId(id)
        if(!testimonial){
            return res.status(404).send("Testimonial not found")
        }
        return res.status(200).json(testimonial)
    } catch (error) {
        console.log(error);
        return res.status(500).send(error.message)
    }
}
const createTestimonialHandler = async (req, res) => {
    try {

        const {message, date, rating, userId} = req.body
        console.log(req.body);
        if (!date) {
            res.status(500).send("date")
        }else if(!message){
            res.status(500).send("message")
        }else if(!rating) {
            res.status(500).send("rating")
        }else{
        const newTestimonial = await createTestimonial(message, date, rating, userId)
        return res.status(201).json(newTestimonial)
    }

    } catch (error) {
        console.log(error);
        return res.status(500).send(error.message)
    }
}

const updateHandler = async (req, res) => {
    const id  = req.params.id;
    console.log(id);
    const data  = req.body;
    
    try {
        const updater = await updateTestimonial(id, data)
        return res.status(200).json(updater)
    } catch (error) {
        console.log(error.message);
        return res.status(500).send(error.message)
    }
}

const deleteHandler = async (req, res) => {
    const id  = req.params.id
    try {
        const deleter = await deleteTestimonial(id)
        return res.status(200).json(deleter)
    } catch (error) {
        console.log(error);
        return res.status(500).send(error.send)
    }
}

module.exports = {
    getTestimonialHandler,
    createTestimonialHandler,
    byIdHandler,
    updateHandler,
    deleteHandler
}