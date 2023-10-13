
import img1 from "../../img/SectionTwoImg1About.jpg";
import img2 from "../../img/SectionTwoImg2About.jpg";
import img3 from "../../img/SectionTwoImg3About.jpg";
const SectionTwo = () => {
    return(
        <div className="font-poppins bg-white p-4 sm:p-8 md:p-12 lg:p-16 xl:p-20 "
        data-aos="fade-right"
        data-aos-duration="1000"
        >
            <h1 className="text-[25px] md:text-[30px] text-center top-[-30px] font-bold pb-16">Our commitment plant by plant</h1>
                <div className="grid  mx-auto gap-[10px] md:grid-cols-3">
            <div className="grid grid-cols-1 ">
                <img src={img1} className="rounded-3xl h-[300px] object-cover justify-center items-center mx-auto" />
                <div>
                    <h3 className=" text-center text-[20px] font-semibold">🌱 Amazing and happy plants for you</h3>
                <h2 className="text-center text-[15px] p-5 md:px-20 ">We help you find a plant that suits you, and we send it to your home quickly and with the greatest of care, using ecological materials in our packaging.</h2>
                  </div>
            </div>

            <section>
                <img src={img2} className="rounded-3xl h-[300px] object-fill justify-center items-center mx-auto"/>
                <h3 className=" text-center text-[20px] font-semibold">✨ The best in design and care</h3>
                <h2 className="text-center text-[15px] p-5 md:px-20">We offer a unique selection of pots, design and care accessories, along with personalized advice to help you care for your plant and keep it with you for a long time.</h2>
            </section>

            <section>
            <img src={img3} className="  h-[300px] rounded-3xl object-fill justify-center items-center mx-auto" />
                <h3 className=" text-center text-[20px] font-semibold">🌍 Help us plant trees</h3>
                <h2 className="text-center text-[15px] p-5 md:px-20">We believe that together we can make a difference. That's why with every order we make a donation to the Eden Reforestation Project, to plant 10,000 trees around the world each year.</h2>
            </section>
            </div>

        </div>
    )
}
export default SectionTwo
