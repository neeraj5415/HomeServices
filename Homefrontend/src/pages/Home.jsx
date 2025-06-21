import vg from '../assets/images/homeservice.jpg'
import bi from '../assets/images/img6.jpg'
import img1 from '../assets/images/plumber.jpg'
import img2 from '../assets/images/img2.jpg'
import img3 from '../assets/images/img3.jpg'
import img4 from '../assets/images/img4.jpg'
import HomeFooter from '../components/Homepages/HomeFooter.jsx'
import WhoWeAre from "../components/Homepages/WhoWeAre.jsx";
import { useEffect, useState } from "react";

export default function Home(){

    const [showScrollTop, setShowScrollTop] = useState(false);
        useEffect(() => {
            const handleScroll = () => {
            const scrollPosition = window.scrollY + window.innerHeight;
            const threshold = document.body.scrollHeight - 200;
            setShowScrollTop(scrollPosition >= threshold);
            };

            window.addEventListener("scroll", handleScroll);
            return () => window.removeEventListener("scroll", handleScroll);
        }, []);

        const scrollToTop = () => {
            window.scrollTo({ top: 0, behavior: "smooth" });
        };


    return(
        <div className="bg-white pt-30">
            <section  className="bg-cover bg-center bg-no-repeat h-[450px] flex flex-col justify-center items-center text-center text-white px-4 mt-10 rounded-xl"
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

            <section className="mt-5 px-6 py-10 bg-gray-200 rounded-xl">
                <h2 className="text-2xl font-bold mb-8">POPULAR SERVICES</h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mt-5">
                    <div className="bg-blue-100 p-4 rounded-lg shadow-md text-center hover:shadow-xl hover:scale-112 transform transition duration-300">
                    <img src={img1} alt="Plumber" className="w-20 h-20 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-1">Plumber</h3>
                    <p className="text-sm text-gray-700">Reliable plumbers for any plumbing issues</p>
                    </div>

                    <div className="bg-pink-100 p-4 rounded-lg shadow-md text-center hover:shadow-xl hover:scale-112 transform transition duration-300">
                    <img src={img2} alt="Beautician" className="w-20 h-20 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-1">Beautician</h3>
                    <p className="text-sm text-gray-700">Get salon like experience with professional beauticians</p>
                    </div>

                    <div className="bg-green-100 p-4 rounded-lg shadow-md text-center hover:shadow-xl hover:scale-112 transform transition duration-300">
                    <img src={img3} alt="Pest Control" className="w-20 h-20 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-1">Pest Control</h3>
                    <p className="text-sm text-gray-700">Effective pest control solution for healthy homes</p>
                    </div>

                    <div className="bg-blue-200 p-4 rounded-lg shadow-md text-center hover:shadow-xl hover:scale-112 transform transition duration-300">
                    <img src={img4} alt="Electrician" className="w-20 h-20 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-1">Electrician</h3>
                    <p className="text-sm text-gray-700">Certified electricians for all your electrical needs</p>
                    </div>
                </div>
            </section>
            <div className="mb-5 mt-5 min-h-80 flex flex-row items-center justify-center text-2xl font-semibold hover:shadow-xl hover:scale-112 transform transition duration-300">
                <div className='text-shadow-lg mr-20 '>Hyperlocal Service Booking Plateform <br/>Where any service is provided at your home</div>
                <img className="h-60 w-116 object-scale-down drop-shadow-2xl mr-3 animate-pulse rounded-xl hover:shadow-xl hover:scale-112 transform transition duration-300" src={vg}/>
            </div>
            <WhoWeAre/>
            <HomeFooter/>
            {showScrollTop && (
                <button
                onClick={scrollToTop}
                className="fixed bottom-1 left-1/2 bg-green-300 text-black px-2 py-1 rounded-full shadow-lg hover:shadow-xl hover:scale-112 transform transition duration-300"
                >
                ↑
                </button>
            )}
      </div>
    )
}