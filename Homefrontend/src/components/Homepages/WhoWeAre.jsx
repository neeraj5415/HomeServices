import img5 from '../../assets/images/img5.jpg'
export default function WhoWeAre() {
  return (
    <section className="bg-blue-100 px-6 py-12 flex flex-col-reverse md:flex-row items-center justify-between gap-8 rounded-xl py-32">
        <div>
            <h2 className="text-xl font-bold mb-2">WHO ARE WE?</h2>
            <h5 className="text-center text-gray-700">We are a trusted platform connecting customers with skilled service providers...</h5>
            <p className="text-2xl md:text-3xl font-extrabold mb-2 text-blue-900">We're a team of passionate individuals committed to delivering exceptional home services. Our network of vetted, background-checked professionals ensures that you receive top-notch workmanship and unparalleled customer service.</p>
            <h3 className="text-2xl md:text-3xl font-extrabold mb-2 mt-5 text-blue-900">Our patners</h3>
            <p className="text-lg hover:shadow-xl hover:scale-101 transform transition duration-500">Google</p>
            <p className="text-lg hover:shadow-xl hover:scale-101 transform transition duration-500">Dell</p>
            <p className="text-lg hover:shadow-xl hover:scale-101 transform transition duration-500">TCS</p>
        </div>
            <img src={img5} alt="Service Man" className="w-[180px] md:w-[220px]" />
    </section>
  );
}