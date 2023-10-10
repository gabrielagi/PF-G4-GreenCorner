import chip from '../../img/chip.png'
import './PaymentMethods.styles.css'
const PaymentMethods = () => {
  return (
    <div className='container'>
      <div className="card">
        <div className="card-inner">
            <div className="front">
              <img src='https://o.remove.bg/downloads/1c234685-fd36-49b9-9983-198140c78662/png-transparent-map-of-asia-globe-world-map-flat-earth-world-map-miscellaneous-world-earth-removebg-preview.png' className='map-img'></img>
              <div className='row -mt-[18px] '>
                <img  className='-ml-[20px] w-[40px]'src={chip} alt="" />
                <img src='https://o.remove.bg/downloads/e7a48dfa-e05e-4dce-a842-de62e304c1f6/png-transparent-logo-brand-white-font-design-white-text-logo-removebg-preview.png' alt="" className='w-[80px]'/>
              </div>
             <div className='row  mt-[40px] mb-5 card-no'>
                <p>5244</p>
                <p>2140</p>
                <p>8252</p>
                <p>6420</p>
             </div>
             <div className="row  -mt-[2px] card-holder">
              <p>CARD HOLDER</p>
              <p>VALID TILL</p>
             </div>
             <div className="row mt-7 ">
              <p className='text-[22px] '>JOE ALISON</p>
              <p className='text-[22px] ' >10/30</p>
             </div>
            </div>

            <div className="back">
            <img src='https://o.remove.bg/downloads/1c234685-fd36-49b9-9983-198140c78662/png-transparent-map-of-asia-globe-world-map-flat-earth-world-map-miscellaneous-world-earth-removebg-preview.png' className='map-img'></img>
            <div className="bar"/>
            <div className="row card-cvv ">
              <div className=' mt-5'>
                <img  className='  h-[60px]'src='https://i.postimg.cc/QM7ycYWP/pattern.png'></img>
              </div>
              <p className='h-[50px] mt-[10px] px-[20px] text-[22px]'>824</p>
            </div>
            <div className="row card-text">
              <p>This is a virtual card built for Facundo, the most capo between the capos</p>
              <img src='https://o.remove.bg/downloads/e7a48dfa-e05e-4dce-a842-de62e304c1f6/png-transparent-logo-brand-white-font-design-white-text-logo-removebg-preview.png' alt="" className=' -mb-12 w-[80px]'/>
            </div>

            </div>
        </div>

      </div>
      
      </div>


  )
}

export default PaymentMethods