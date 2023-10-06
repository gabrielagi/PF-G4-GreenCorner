import plantsAbout from "../../img/plantsAbout.jpg";
const SectionOne = () => {
  return (
    <div className="relative">
      <section className="sm:bg-green-200 bg-green-200 sm:h-[400px] h-[300px]"
        //h-[400px] sm:p-8 md:p-12 lg:p-16 xl:p-20
        
        //data-aos="fade-left"
        //data-aos-duration="1000"
      >
        <div className="">
          <img
            src={plantsAbout}
            alt=""
            className="p-4 hidden sm:block sm:max-w-[900px] md:w-[900px] sm:ml-[-70px] sm:flex sm:h-[420px]  transform sm:scale-[0.4] md:scale-[0.6] lg:scale-[0.8] xl:scale-[1.0]"
          />
        </div>
        <div>
          <strong className="relative sm:flex sm:p-4 sm:l-[650px] sm:text-[24px] sm:ml-[820px] sm:text-green-700 sm:-top-[360px] text-green-700  text-[24px] ">
            We believe that a world full of plants is a better world.
          </strong>
        </div>

        <div>
        <p className="relative sm:l-[650px] sm:ml-[830px] sm:-top-[350px] sm:text-[20px]">
            We want to become your favorite place for everything related to the
            world of plants: from different types of plants, designer pots and
            accessories, to advice and personalized care programs.
          </p>
        </div>

        <div>
          
        <strong className="relative sm:l-[650px] sm:ml-[830px] sm:text-[15.4px] sm:-top-[320px] sm:flex">
            Our mission is to help you find your perfect plant to transform your
            environments into stylish spaces, full of life and warmth.💚
          </strong>
        </div>
        
      </section>
    </div>
  );
};
export default SectionOne;
