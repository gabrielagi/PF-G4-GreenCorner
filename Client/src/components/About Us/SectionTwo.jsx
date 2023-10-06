
import img1 from "../../img/SectionTwoImg1About.jpg";
import img2 from "../../img/SectionTwoImg2About.jpg";
import img3 from "../../img/SectionTwoImg3About.jpg";
const SectionTwo = () => {
    return(
        <div className=" p-4 sm:p-8 md:p-12 lg:p-16 xl:p-20 "
        data-aos="fade-right"
        data-aos-duration="1000"
        >
            <h1 className="relative text-[27px] text-center top-[-30px]">Our commitment plant by plant</h1>
                <div className="flex relative ta-center top-[10px] left-[24rem] gap-[10px]">
            <section>
                <img src={img1} className="h-[370px] w-[370px]" />
                <h3 className="text-[24px]">🌱 Amazing and happy plants for you</h3>
                <p className="w-[480px] ">We help you find a plant that suits you, and we send it to your home quickly and with the greatest of care, using ecological materials in our packaging.</p>
            </section>

            <section>
                <img src={img2} className="h-[370px] w-[370px]" />
                <h3 className="text-[24px] ">✨ The best in design and care</h3>
                <p className="w-[430px] ">We offer a unique selection of pots, design and care accessories, along with personalized advice to help you care for your plant and keep it with you for a long time.</p>
            </section>

            <section>
                <img src={img3} className="h-[370px] w-[370px] " />
                <h3 className="text-[24px]">🌍 Help us plant trees</h3>
                <p className="w-[410px] ">We believe that together we can make a difference. That's why with every order we make a donation to the Eden Reforestation Project, to plant 10,000 trees around the world each year.</p>
            </section>
            </div>

        </div>
    )
}
export default SectionTwo
