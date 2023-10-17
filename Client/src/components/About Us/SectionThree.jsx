import img1 from "../../img/plantsAbout.jpg";
const SectionThree = () => {
  return (
    <div className="font-poppins">
      <div
        className=" grid md:grid-cols-2 md:gap-20   "
        data-aos="fade-right"
        data-aos-duration="1000"
      >
        <div className="p-10">
        <img
          src={img1}
          className=" md:mt-20 h-[350px] object-cover  md:object-center mx-auto w-full "
        /></div>
        <div className="">
        

        <div className="  py-20 mx-10 ">
        <div>
          <p className=" ml-10 font-bold  text-[22px] mb-7 ">
            Plants have many benefits!
          </p>
          <div className="ml-10 text-[18px] font-medium text-gray-500">
            <p className="mb-2">💪They help us be healthier</p>
          <p className="mb-2">🙆 They improve our well-being</p>
          <p className="mb-2">😍 They make us happier and more productive</p>
          <p className="mb-2">💚 And they are also very rewarding!</p>
          </div>
          
        </div>

        <div>
          <div> <p className=" mt-10 ml-10 font-bold  text-[22px] mb-7">Green Corner Commitment</p></div>
         <div className="ml-10 text-[18px] font-medium text-gray-500">
           <p className="mb-2">🕊 Shipping in 24 hours for your plants</p>
          <p className="mb-2">
            📦 Special packaging that will protect your plant
          </p>
          <p className="mb-2">📝 Care guide included</p>
          <p className="mb-2">✅ 30 day guarantee</p>
         </div>
         
        </div>
        </div>
        </div>
       
      </div>
      <br />

      <div
        className=""
        data-aos="fade-up"
        data-aos-duration="1000"
      >
       
      </div>
      <br />
    </div>
  );
};
export default SectionThree;
