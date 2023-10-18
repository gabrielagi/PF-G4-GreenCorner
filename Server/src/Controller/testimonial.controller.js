const { Testimonial } = require("../db")

const getAllTestimonials = async () => {
    const testimonials = await Testimonial.findAll()
    return testimonials
}

const createTestimonial = async (message, date, rating, userId) => {
    const newTestimonial = await Testimonial.create({ message, date, rating, userId })
    return newTestimonial

}

const getTestimonialbyId = async (id) => {
    const testimonial = await Testimonial.findAll({
        where: {
            id: id
        }
    })
    return testimonial
}

const deleteTestimonial = async (id) => {
    const testimonial = id;
    try {
        const deleter = Testimonial.destroy({
            where: {
                id: testimonial
            }
        });
        if(deleter) {
            return testimonial
        } else {
            return "Thist testimonial doesn't exist"
        }
    } catch (error) {
        console.log(error.message);
        return error
    }
}
const updateTestimonial = async (id, data) => {
    const [updatedCount, updatedTestimonial] = await Testimonial.update(data, {
        where: { id: id },
        returning: true,
    })
    if (updatedCount === 0) {
        throw new Error("User not found or no changes made.");
    }

    return updatedTestimonial[0];

}
module.exports = { getAllTestimonials, createTestimonial, getTestimonialbyId, updateTestimonial, deleteTestimonial}