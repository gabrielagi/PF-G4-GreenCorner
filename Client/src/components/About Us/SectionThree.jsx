import img1 from "../../img/SectionThreeImg1About.jpg";
const SectionThree = () => {
  return (
    <div className="font-poppins">
      <div
        className=" grid md:grid-cols-2 bg-green-200 gap-20   "
        data-aos="fade-right"
        data-aos-duration="1000"
      >
        <div>
        <img
          src={img1}
          className="h-[350px] object-cover object-bottom md:object-center mx-auto w-full"
        /></div>
        <div className="">
           <div className=" text-4xl font-bold mx-10 my-6">
          The moment is <strong className="font-extrabold text-4xl">now</strong> 
        </div>

        <div className="mx-10">
          <strong className="">
            The impact of CO2 is real:
          </strong>
          <h3 className="font-medium">
            This gas is a product of industrial activity and car emissions.
            Excess CO2 increases heat retention in the atmosphere, increasing
            levels of global warming.
          </h3>
          <br />
          <h3 className="font-medium ">
            Together we can make a difference and help reduce CO2 levels in our
            cities, helping to avoid climate change that can destroy our planet.
            How can you contribute? Whether your home has just one plant or a
            jungle: more greenery will help in the fight to reduce the amounts
            of toxic gases.
          </h3>
          <br />
          <h3 className="font-medium pb-20 md:pb-0">
            Green Corner collaborates with Eden Reforestation Project to plant
            10,000 trees a year around the world. With every order delivered, we
            help make the world a greener place.
          </h3>
        </div>
        </div>
       
      </div>
      <br />

      <div
        className=""
        data-aos="fade-up"
        data-aos-duration="1000"
      >
        <div>
          <strong className="text-[28px] ">
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
