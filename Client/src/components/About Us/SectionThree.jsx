import img1 from "../../img/SectionThreeImg1About.jpg";
const SectionThree = () => {
  return (
    <div className="mb-20">
      <section
        className="relative  bg-green-200 p-4 h-[400px] sm:p-8 md:p-12 lg:p-16 xl:p-20"
        data-aos="fade-right"
        data-aos-duration="1000"
      >
        <img
          src={img1}
          className="relative h-[400px] -top-[50px] w-[1000px] ml-[-70px]"
        />
        <strong className="relative -top-[430px] ml-[1000px] text-[18px]">
          The moment is now
        </strong>

        <div>
          <strong className="relative -top-[430px] ml-[1000px] text-[12px]">
            The impact of CO2 is real:
          </strong>
          <p className="relative -top-[430px] ml-[1000px]">
            This gas is a product of industrial activity and car emissions.
            Excess CO2 increases heat retention in the atmosphere, increasing
            levels of global warming.
          </p>
          <br />
          <p className="relative -top-[430px] ml-[1000px] ">
            Together we can make a difference and help reduce CO2 levels in our
            cities, helping to avoid climate change that can destroy our planet.
            How can you contribute? Whether your home has just one plant or a
            jungle: more greenery will help in the fight to reduce the amounts
            of toxic gases.
          </p>
          <br />
          <p className="relative -top-[430px] ml-[1000px]">
            Green Corner collaborates with Eden Reforestation Project to plant
            10,000 trees a year around the world. With every order delivered, we
            help make the world a greener place.
          </p>
        </div>
      </section>
      <br />

      <div
        className="flex relative ml-[450px] space-x-[350px]"
        data-aos="fade-up"
        data-aos-duration="1000"
      >
        <div>
          <strong className="text-[28px] mb-4">
            Plants have many benefits!
          </strong>
          <p className="mb-2">💪They help us be healthier</p>
          <p className="mb-2">🙆 They improve our well-being</p>
          <p className="mb-2">😍 They make us happier and more productive</p>
          <p className="mb-2">💚 And they are also very rewarding!</p>
        </div>

        <div>
          <strong className="text-[28px] mb-4">Green Corner Commitment</strong>
          <p className="mb-2">🕊 Shipping in 24 hours for your plants</p>
          <p className="mb-2">
            📦 Special packaging that will protect your plant
          </p>
          <p className="mb-2">📝 Care guide included</p>
          <p className="mb-2">✅ 30 day guarantee</p>
        </div>
      </div>
      <br />
    </div>
  );
};
export default SectionThree;
