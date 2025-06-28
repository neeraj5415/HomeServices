import vg from '../assets/images/homeservice.jpg'
import bi from '../assets/images/img6.jpg'
import HomeFooter from '../components/Homepages/HomeFooter.jsx'
import WhoWeAre from "../components/Homepages/WhoWeAre.jsx";
import { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";

const bgColors = [
  "bg-blue-100",
  "bg-pink-100",
  "bg-green-100",
  "bg-blue-200",
];

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

        const [services, setServices] = useState([]);
        const [searchTerm, setSearchTerm] = useState("");

        const fetchServices = async () => {
            try {
            const res = await axios.get(
                `http://localhost:5000/api/services?q=${searchTerm}`
            );
            setServices(res.data);
            } catch (error) {
            console.error("Failed to fetch services", error);
            }
        };

        useEffect(() => {
            fetchServices();
        }, [searchTerm]);

        const [start, setStart] = useState(0);

        const chunkArray = (arr, size) => {
        const chunked = [];
        for (let i = 0; i < arr.length; i += size) {
            chunked.push(arr.slice(i, i + size));
        }
        return chunked;
        };

        const chunks = chunkArray(services, 4);

        const location = useLocation();

        useEffect(() => {
        if (location.hash) {
            const target = document.querySelector(location.hash);
            if (target) {
            // Ensure DOM is ready
            setTimeout(() => {
                target.scrollIntoView({ behavior: "smooth" });
            }, 100);
            }
        }
        }, [location]);

    return(
        <div className="bg-white pt-60">
            <section  className="bg-cover bg-center bg-no-repeat h-[450px] flex flex-col justify-center items-center text-center text-white px-4 mt-10 rounded-xl"
            style={{ backgroundImage: `url(${bi})`}}>
                <h1 className="text-4xl font-bold mb-4 text-shadow-lg">Book Services At Your Doorstep</h1>
                <p className="text-shadow-lg text-lg">Plumbers, Electricians, Beauticians & more</p>
                <div className="w-full max-w-full mt-10">
                    <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search for a service..."
                    className="bg-white w-full px-4 py-3 rounded-lg text-black focus:outline-black focus:ring-2 focus:ring-black-400"
                    />
                </div>
            </section>

           <section className="mt-5 px-6 py-10 bg-gray-200 rounded-xl">
                <h2 className="text-2xl font-bold mb-8">POPULAR SERVICES</h2>

                <div className="relative">
                    <button
                    onClick={() => setStart((prev) => Math.max(prev - 1, 0))}
                    className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-gray-300 hover:bg-gray-400 px-3 py-1 rounded-full shadow"
                    >
                    &#8592;
                    </button>

                    <div className="overflow-hidden">
                    <div
                        className="flex transition-transform duration-500"
                        style={{ transform: `translateX(-${start * 100}%)` }}
                    >
                        {chunks.map((chunk, i) => (
                        <div
                            key={i}
                            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 min-w-full"
                        >
                            {chunk.map((service, index) => (
                            <div
                                key={service._id}
                                className={`${bgColors[index % bgColors.length]} p-14 rounded-lg shadow-md text-center hover:shadow-xl hover:scale-112 transform transition duration-300`}
                            >
                                <img
                                src={service.image}
                                alt={service.name}
                                className="w-20 h-20 mx-auto mb-4 object-cover"
                                />
                                <h3 className="text-lg font-semibold mb-1">{service.name}</h3>
                                <p className="text-sm text-gray-700">
                                {service.description}
                                </p>
                            </div>
                            ))}
                        </div>
                        ))}
                    </div>
                    </div>

                    <button
                    onClick={() =>
                        setStart((prev) => Math.min(prev + 1, chunks.length - 1))
                    }
                    className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-gray-300 hover:bg-gray-400 px-3 py-1 rounded-full shadow"
                    >
                    &#8594;
                    </button>
                </div>
            </section>


            <div className="mb-5 mt-5 min-h-80 flex flex-row items-center justify-center text-2xl font-semibold hover:shadow-xl hover:scale-112 transform transition duration-300">
                <div className='text-shadow-lg mr-20 '>Hyperlocal Service Booking Plateform <br/>Where any service is provided at your home</div>
                <img className="h-60 w-116 object-scale-down drop-shadow-2xl mr-3 animate-pulse rounded-xl hover:shadow-xl hover:scale-112 transform transition duration-300" src={vg}/>
            </div>
            <WhoWeAre/>
            <div>
                <section id="contact" className="bg-gray-100 py-12 px-4 md:px-10">
                    <div className="max-w-5xl mx-auto">
                        {/* Section Heading */}
                        <h2 className="text-3xl font-bold text-center mb-10">
                        Contact
                        </h2>

                        <div className="flex flex-col md:flex-row gap-10">
                        {/* Contact Form */}
                        <div className="flex-1 bg-white p-6 rounded-lg shadow-md">
                            <h3 className="text-xl font-semibold mb-4">Send a Message</h3>
                            <form>
                            <input
                                type="text"
                                placeholder="Your Name"
                                className="w-full mb-4 p-2 border border-gray-300 rounded"
                                />
                            <input
                                type="email"
                                placeholder="Your Email"
                                className="w-full mb-4 p-2 border border-gray-300 rounded"
                                />
                            <textarea
                                rows="4"
                                placeholder="Your Message"
                                className="w-full mb-4 p-2 border border-gray-300 rounded"
                                />
                            <button
                                type="submit"
                                className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded"
                                >
                                Send Message
                            </button>
                            </form>
                        </div>

                        {/* Contact Info */}
                        <div className="flex-1 bg-white p-6 rounded-lg shadow-md">
                            <h3 className="text-xl font-semibold mb-4">Get In Touch</h3>
                            <p className="text-gray-700 mb-6">
                            We are available for any query or any questions. Connect with us via phone or email.
                            </p>

                            <div className="flex items-center gap-3 mb-4">
                            
                            <span>India</span>
                            </div>
                            <div className="flex items-center gap-3 mb-4">
                            
                            <span>+91 99999 99999</span>
                            </div>
                            <div className="flex items-center gap-3 mb-4">
                            
                            <span>your@email.com</span>
                            </div>
                        </div>
                        </div>
                    </div>
                    </section>
            </div>
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