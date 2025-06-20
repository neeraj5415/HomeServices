import HomeHeader from "../components/Homepages/HomeHeader.jsx";
import vg from '../assets/images/homeservice.jpg'
import bi from '../assets/images/img6.jpg'
import img1 from '../assets/images/plumber.jpg'
import img2 from '../assets/images/img2.jpg'
import img3 from '../assets/images/img3.jpg'
import img4 from '../assets/images/img4.jpg'
import img5 from '../assets/images/img5.jpg'
import HomeFooter from '../components/Homepages/HomeFooter.jsx'

export default function Home(){
    return(
        <div className="bg-white">
            <HomeHeader />
            <section  className="bg-cover bg-center bg-no-repeat h-[450px] flex flex-col justify-center items-center text-center text-white px-4 mt-10"
            style={{ backgroundImage: `url(${bi})`}}>
                <h1 className="text-4xl font-bold mb-4 text-shadow-lg">Book Services At Your Doorstep</h1>
                <p className="text-shadow-lg text-lg">Plumbers, Electricians, Beauticians & more</p>
                <div className="w-full max-w-full mt-10">
                    <input
                    type="text"
                    placeholder="Search for a service..."
                    className="bg-white w-full px-4 py-3 rounded-lg text-black focus:outline-black focus:ring-2 focus:ring-black-400"
                    />
                </div>
            </section>

            <section className="px-6 py-10">
                <h2 className="text-2xl font-bold mb-8">POPULAR SERVICES</h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                    <div className="bg-blue-100 p-4 rounded-lg shadow-md text-center">
                    <img src={img1} alt="Plumber" className="w-20 h-20 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-1">Plumber</h3>
                    <p className="text-sm text-gray-700">Reliable plumbers for any plumbing issues</p>
                    </div>

                    <div className="bg-pink-100 p-4 rounded-lg shadow-md text-center">
                    <img src={img2} alt="Beautician" className="w-20 h-20 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-1">Beautician</h3>
                    <p className="text-sm text-gray-700">Get salon like experience with professional beauticians</p>
                    </div>

                    <div className="bg-green-100 p-4 rounded-lg shadow-md text-center">
                    <img src={img3} alt="Pest Control" className="w-20 h-20 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-1">Pest Control</h3>
                    <p className="text-sm text-gray-700">Effective pest control solution for healthy homes</p>
                    </div>

                    <div className="bg-blue-200 p-4 rounded-lg shadow-md text-center">
                    <img src={img4} alt="Electrician" className="w-20 h-20 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-1">Electrician</h3>
                    <p className="text-sm text-gray-700">Certified electricians for all your electrical needs</p>
                    </div>
                </div>
            </section>
            <div className="min-h-80 flex flex-row items-center justify-center text-2xl font-semibold">
                <div className='text-shadow-lg mr-20 '>Hyperlocal Service Booking Plateform <br/>Where any service is provided at your home</div>
                <img className="h-60 w-116 object-scale-down fill-white drop-shadow-xl/200 mr-3 size-5 size-1 animate-bounce" src={vg}/>
            </div>

            <section className="bg-blue-100 mt-16 px-6 py-12 flex flex-col-reverse md:flex-row items-center justify-between gap-8">
                <div>
                    <h2 className="text-xl font-bold mb-2">WHO ARE WE?</h2>
                    <h5 className="text-2xl md:text-3xl font-extrabold mb-2 text-blue-900">We're a team of passionate individuals committed to delivering exceptional home services. Our network of vetted, background-checked professionals ensures that you receive top-notch workmanship and unparalleled customer service.</h5>
                    <h3 className="text-2xl md:text-3xl font-extrabold mb-2 text-blue-900">Our patners</h3>
                    <p className="text-gray-700 text-lg">Google</p>
                    <p className="text-gray-700 text-lg">Dell</p>
                    <p className="text-gray-700 text-lg">TCS</p>
                </div>
                <img src={img5} alt="Service Man" className="w-[180px] md:w-[220px]" />
            </section>
            <HomeFooter />
      </div>
    )
}