import plantsAbout from "../../img/plantsAbout.jpg";
const SectionOne = () => {
  return (
    
      <div className="pb-10 my-20 font-poppins mx-auto grid md:grid-cols-2 md:max-h-[450px] sm:bg-green-200 bg-green-200 gap-x-20 md:pb-0 "
        //h-[400px] sm:p-8 md:p-12 lg:p-16 xl:p-20 
        
        //data-aos="fade-left"
        //data-aos-duration="1000"
      >
        <div className=" "> 
          <img
            src={plantsAbout}
            alt=""
            className=" w-full h-[200px] object-center md:h-[400px] object-cover"
          />
      
        </div>
          

        <div className="mx-20 ">
          <div className="text-center font-bold drop-shadow-lg text-5xl my-20 ">
            We believe that a world full of plants is a better world.
          </div>
        

        <div>
        <p className="font-bold text-center text-gray-600">
            We want to become your favorite place for everything related to the
            world of plants: from different types of plants, designer pots and
            accessories, to advice and personalized care programs.
          </p>
        </div>

        <div>
          
        <div className="font-bold mt-20 text-center drop-shadow-sm text-gray-600">
            Our mission is to help you find your perfect plant to transform your
            environments into stylish spaces, full of life and warmth.💚
          </div>
        </div>

        </div>
      </div>
    
  );
};
export default SectionOne;
