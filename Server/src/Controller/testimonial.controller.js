const { Testimonial } = require("../db")
const { getUserById } = require("../Controller/user.controller")
const getAllTestimonials = async () => {
    const testimonials = await Testimonial.findAll()
    return testimonials
}

const createTestimonial = async (message, date, rating, userId) => {
    try {
        const testimonial = await Testimonial.create({ message, date, rating });
        const user = await getUserById(userId);

        if (!user) {
            throw new Error("User not found");
        }

        await testimonial.setUser(user);
        console.log("Testimonio creado");
    } catch (error) {
        console.log("Error al crear testimonio");
        console.error(error);
    }
};

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
        if (deleter) {
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
module.exports = { getAllTestimonials, createTestimonial, getTestimonialbyId, updateTestimonial, deleteTestimonial }