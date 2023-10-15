const { Testimonial } = require ("../db")

const getAllTestimonials = async () => {
    const testimonials = await Testimonial.findAll()
    return testimonials
}

const createTestimonial = async (message, date, rating, user_id) => {
    const newTestimonial = await Testimonial.create(message, date, rating, user_id)
    return newTestimonial

}


module.exports = { getAllTestimonials, createTestimonial}