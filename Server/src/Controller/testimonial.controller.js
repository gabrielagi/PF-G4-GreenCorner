const { Testimonial } = require ("../db")

const getAllTestimonials = async () => {
    const testimonials = await Testimonial.findAll()
    return testimonials
}

const createTestimonial = async (message, date, rating) => {
    const newTestimonial = await Testimonial.create(message, date, rating)
    return newTestimonial

}


module.exports = { getAllTestimonials, createTestimonial}